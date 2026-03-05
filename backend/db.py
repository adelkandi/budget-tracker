import os
from dotenv import load_dotenv
from argon2 import PasswordHasher as ph
from supabase import create_client, Client

load_dotenv()

# Supabase client configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Password hasher configuration
password_hash = ph(
    time_cost=3,
    memory_cost=65536,
    parallelism=2,
    hash_len=32
)


def _normalize_user(row):
    """Map DB user shape (user_id) to API shape (id)."""
    if not row:
        return None
    return {
        "id": row.get("user_id"),
        "name": row.get("name"),
        "username": row.get("username"),
        "email": row.get("email"),
        "created_at": row.get("created_at"),
    }

def check_user(username, password):
    """Check if user exists and password is correct"""
    try:
        response = supabase.table("users").select("password_hash").eq("username", username).execute()
        
        print(f"DEBUG: Looking for user: {username}")
        print(f"DEBUG: Response data: {response.data}")
        
        if not response.data or len(response.data) == 0:
            print(f"DEBUG: User {username} not found")
            return False
        
        stored_passwordhash = response.data[0]["password_hash"]
        print(f"DEBUG: Found user, stored hash length: {len(stored_passwordhash)}")
        
        try:
            password_hash.verify(stored_passwordhash, password)
            print(f"DEBUG: Password verified successfully")
            return True
        except Exception as e:
            print(f"Error verifying password: {e}") 
            return False
    except Exception as e:
        print(f"Error checking user: {e}")
        return False

def get_user_by_username(username):
    """Get user data by username (excluding password)"""
    try:
        response = supabase.table("users").select(
            "user_id, name, username, email, created_at"
        ).eq("username", username).execute()
        
        if response.data and len(response.data) > 0:
            return _normalize_user(response.data[0])
        return None
    except Exception as e:
        print("Error fetching user:", e)
        return None

def get_user_by_id(user_id):
    """Get user data by ID (excluding password)"""
    try:
        response = supabase.table("users").select(
            "user_id, name, username, email, created_at"
        ).eq("user_id", user_id).execute()
        
        if response.data and len(response.data) > 0:
            return _normalize_user(response.data[0])
        return None
    except Exception as e:
        print("Error fetching user:", e)
        return None                                                                                                                                                                                     
    

def create_user(name, username, email, password):
    """Create a new user"""
    try:
        password_hashed = password_hash.hash(password)
        
        print(f"\nDEBUG: Attempting to create user: {username}")
        
        response = supabase.table("users").insert({
            "name": name,
            "username": username,
            "email": email,
            "password_hash": password_hashed
        }).execute()
        
        print(f"DEBUG: Response: {response}")
        print(f"DEBUG: Response data: {response.data}")
        
        if response.data and len(response.data) > 0:
            user_id = response.data[0].get("user_id")
            if user_id is None:
                # Some PostgREST settings can return minimal data on insert.
                created_user = get_user_by_username(username)
                return created_user["id"] if created_user else False
            print(f"✓ User created successfully with ID {user_id}")
            return user_id
        
        print(f"✗ No data returned from insert")
        created_user = get_user_by_username(username)
        return created_user["id"] if created_user else False
    except Exception as e:
        print(f"✗ Error creating user: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return False
        
def table_data(user_id=None):
    """Get all transactions, optionally filtered by user_id"""
    try:
        query = supabase.table("transactions").select(
            "id, user_id, txn_date, type, category, amount, payment_method, notes"
        )
        
        if user_id:
            query = query.eq("user_id", user_id)
        
        response = query.order("txn_date", desc=True).execute()
        
        return response.data if response.data else []
    except Exception as e:
        print("Error fetching transactions:", e)
        return []

def get_budget_data(user_id=1):
    """
    Get budget data aggregated by category.
    Returns budgeted amount and spent amount for each category.
    """
    try:
        # Get all expense transactions for the user
        response = supabase.table("transactions").select(
            "category, amount, type"
        ).eq("user_id", user_id).execute()
        
        # Default budget amounts per category
        default_budgets = {
            "Groceries": 500,
            "Transportation": 200,
            "Entertainment": 150,
            "Utilities": 300,
            "Dining Out": 200,
            "Shopping": 250,
            "Tips": 100,
            "Other": 200
        }
        
        # Aggregate spending by category
        spending_by_category = {}
        for row in response.data:
            if row["type"] == "Expense":
                category = row["category"]
                amount = float(row["amount"]) if row["amount"] else 0.0
                spending_by_category[category] = spending_by_category.get(category, 0) + amount
        
        # Build result
        result = []
        for category, spent in spending_by_category.items():
            budgeted = default_budgets.get(category, 200)
            result.append({
                "category": category,
                "budgeted": budgeted,
                "spent": spent
            })
        
        return result
    except Exception as e:
        print("Error fetching budget data:", e)
        return []
