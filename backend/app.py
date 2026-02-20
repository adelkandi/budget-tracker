# app.py
from flask import Flask , request, jsonify
from db import get_conn,check_user,create_user,table_data,get_budget_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

'''
    This part to test connection with the database
'''
@app.get("/")
def home():
    return "Hello budget tracker works!!"

@app.get("/health")
def health():
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT NOW()")
        t = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {"status":"ok","db_time":str(t)}, 200
    except Exception as e:
        return {"status":"error","detail":str(e)}, 500

@app.get("/test")
def test():
    try:
        conn = get_conn()
        cur = conn.cursor()
        update = cur.execute("INSERT INTO transactions(user_id, txn_date, type, category, amount, payment_method, notes) VALUES(1, '2025-08-27', 'Income', 'Tips', 260, 'Cash', 'Tips received from HR');")
        data = cur.execute("SELECT * FROM transactions;")
        conn.commit()
        cur.close()
        conn.close()
    
        return "Updated!"
    except Exception as e: 
        return {'status': 'error','detail': str(e)}, 500


'''
    This part to post data for the frontend code
'''

@app.post("/login")
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    # check on database
    if check_user(username, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 500

@app.post("/register")
def register():
    data = request.get_json()
    name = data.get("name")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    success = create_user(name,username,email,password) 

    if success:
        return jsonify({f"message":"user %s have been created successfully"},username),201
    else: 
        return jsonify({"error":"Registration failed"}),400

@app.route("/transactions", methods=["GET","POST"])
def transactions():
    data= table_data()
    return jsonify(data)

@app.get("/budget")
def budget():
    """
    Get budget data aggregated by category.
    Returns budgeted amount and spent amount for each category.
    """
    try:
        user_id = request.args.get("user_id", 1)  # Default to user 1 for now
        data = get_budget_data(user_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)