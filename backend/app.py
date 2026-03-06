# app.py
from flask import Flask, request, jsonify, make_response
from db import check_user, create_user, table_data, get_budget_data, supabase, get_user_by_username, get_user_by_id
from flask_cors import CORS
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)

APP_ENV = os.getenv("APP_ENV", "development").lower()
IS_PROD = APP_ENV == "production"

origins_env = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://localhost:5174,https://budget-tracker-ecru-psi.vercel.app",
)
FRONTEND_ORIGINS = [origin.strip() for origin in origins_env.split(",") if origin.strip()]

CORS(app, supports_credentials=True, origins=FRONTEND_ORIGINS)

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET_KEY is required")

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24 * 7  # 7 days
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "true" if IS_PROD else "false").lower() == "true"
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "None" if COOKIE_SECURE else "Lax")


def set_auth_cookie(response, token):
    response.set_cookie(
        "auth_token",
        token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=60 * 60 * 24 * 7,
    )


def clear_auth_cookie(response):
    response.set_cookie(
        "auth_token",
        "",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=0,
    )

def create_token(user_data):
    """Create a JWT token"""
    payload = {
        "user_id": user_data["id"],
        "username": user_data["username"],
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(token):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("auth_token")
        
        if not token:
            return jsonify({"error": "Authentication required"}), 401
        
        payload = verify_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        # Add user info to request context
        request.user_id = payload["user_id"]
        request.username = payload["username"]
        
        return f(*args, **kwargs)
    return decorated

'''
    This part to test connection with the database
'''
@app.get("/")
def home():
    return "Hello budget tracker works!!"

@app.get("/health")
def health():
    try:
        # Test Supabase connection
        return {
            "status": "ok", 
            "database": "Supabase (REST API)",
            "connection": "successful"
        }, 200
    except Exception as e:
        return {"status": "error", "detail": str(e)}, 500

@app.get("/test")
def test():
    if os.getenv("ENABLE_TEST_ENDPOINT", "false").lower() != "true":
        return jsonify({"error": "Not found"}), 404

    try:
        # Insert test transaction
        response = supabase.table("transactions").insert({
            "user_id": 1,
            "txn_date": "2025-08-27",
            "type": "Income",
            "category": "Tips",
            "amount": 260,
            "payment_method": "Cash",
            "notes": "Tips received from HR"
        }).execute()
        
        # Get count of transactions
        count_response = supabase.table("transactions").select("id", count="exact").execute()
        
        return jsonify({
            "status": "success",
            "message": "Test transaction inserted",
            "new_id": response.data[0]["id"] if response.data else None,
            "total_transactions": count_response.count
        }), 200
    except Exception as e: 
        return jsonify({"status": "error", "detail": str(e)}), 500


'''
    This part to post data for the frontend code
'''

@app.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Check credentials
    if check_user(username, password):
        # Get user data
        user_data = get_user_by_username(username)
        
        if user_data:
            # Create JWT token
            token = create_token(user_data)
            
            # Create response
            response = make_response(jsonify({
                "message": "Login successful",
                "user": {
                    "id": user_data["id"],
                    "name": user_data["name"],
                    "username": user_data["username"],
                    "email": user_data["email"]
                }
            }), 200)
            set_auth_cookie(response, token)
            return response

    return jsonify({"error": "Invalid credentials"}), 401

@app.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    name = data.get("name")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Validate input
    if not all([name, username, email, password]):
        return jsonify({"error": "All fields are required"}), 400
    
    user_id = create_user(name, username, email, password)

    if user_id:
        # Get user data
        user_data = get_user_by_id(user_id)
        
        if user_data:
            # Create JWT token
            token = create_token(user_data)
            
            # Create response
            response = make_response(jsonify({
                "message": f"User {username} has been created successfully",
                "user": {
                    "id": user_data["id"],
                    "name": user_data["name"],
                    "username": user_data["username"],
                    "email": user_data["email"]
                }
            }), 201)
            set_auth_cookie(response, token)
            return response

        return jsonify({
            "message": f"User {username} has been created successfully",
            "user_id": user_id
        }), 201
    else:
        return jsonify({"error": "Registration failed. Username or email may already exist."}), 400

@app.get("/auth/me")
@token_required
def get_current_user():
    """Get current authenticated user's profile"""
    try:
        user_data = get_user_by_id(request.user_id)
        
        if user_data:
            return jsonify({
                "user": {
                    "id": user_data["id"],
                    "name": user_data["name"],
                    "username": user_data["username"],
                    "email": user_data["email"],
                    "created_at": user_data["created_at"]
                }
            }), 200
        
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/profile")
@token_required
def profile():
    """Get user profile (alias for /auth/me)"""
    return get_current_user()

@app.post("/logout")
def logout():
    """Logout user by clearing the auth cookie"""
    response = make_response(jsonify({"message": "Logged out successfully"}), 200)
    clear_auth_cookie(response)
    return response

@app.route("/transactions", methods=["GET", "POST"])
def transactions():
    """Get or create transactions"""
    # Check if user is authenticated (optional for now)
    token = request.cookies.get("auth_token")
    user_id = None
    
    if token:
        payload = verify_token(token)
        if payload:
            user_id = payload["user_id"]
    
    if request.method == "GET":
        # Get transactions (filter by user if authenticated)
        data = table_data(user_id=user_id)
        return jsonify(data)
    
    # POST method would go here for creating transactions
    return jsonify({"error": "Method not implemented"}), 501

@app.get("/budget")
def budget():
    """
    Get budget data aggregated by category.
    Returns budgeted amount and spent amount for each category.
    """
    try:
        # Check if user is authenticated
        token = request.cookies.get("auth_token")
        user_id = request.args.get("user_id", 1)  # Default to user 1 for backward compatibility
        
        if token:
            payload = verify_token(token)
            if payload:
                user_id = payload["user_id"]  # Use authenticated user's ID
        
        data = get_budget_data(user_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5001")),
        debug=os.getenv("DEBUG", "false").lower() == "true",
    )