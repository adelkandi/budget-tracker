import os, mariadb
from dotenv import load_dotenv
from argon2 import PasswordHasher as ph

load_dotenv()  

CFG = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_Password"),
    "database": os.getenv("DB_NAME"),
    "autocommit": True,
}

def get_conn():
    return mariadb.connect(**CFG)

# Function to retreive username and password data to check for user: 

password_hash = ph(
    time_cost = 3,
    memory_cost=65536,
    parallelism=2,
    hash_len=32
)

# fix hash error later
def check_user(username, password):
    conn = get_conn()
    cursor = conn.cursor()
    
    cursor.execute("SELECT password_hash from users where username=%s", (username,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return False
    stored_passwordhash = row[0]

    try:
        password_hash.verify(stored_passwordhash,password)
        return True
    except Exception as e :
        print("error verifying password",e) 
        return False                                                                                                                                                                                     
    

# Function to create users:

def create_user(name,username,email,password):
    conn = get_conn()
    cursor = conn.cursor()
    password_hashed = password_hash.hash(password)
    try: 
        cursor.execute("INSERT INTO users (name, username, email, password_hash) VALUES(%s,%s,%s,%s)",(name, username, email, password_hashed))
        conn.commit()
        return True 
    except Exception as e:
        print("Error craeting user: ", e)
        conn.rollback()
        return False
    finally:
        cursor.close()
        conn.close()
        
def table_data():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions ORDER BY txn_date DESC")
    data = cursor.fetchall()
    conn.close()

    result = [
        {
        "txn_date":row[2],
        "type": row[3],
        "category": row[4],
        "amount": row[5],
        "payment_method": row[6],
        "notes": row[7]}
        for row in data
    ]
    
    return result

def get_budget_data(user_id=1):
    """
    Get budget data aggregated by category.
    Returns budgeted amount and spent amount for each category.
    """
    conn = get_conn()
    cursor = conn.cursor()
    
    # Get spending by category (only Expense type)
    query = """
        SELECT 
            category,
            SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) as spent
        FROM transactions
        WHERE user_id = %s
        GROUP BY category
        ORDER BY category
    """
    
    cursor.execute(query, (user_id,))
    data = cursor.fetchall()
    conn.close()
    
    # Default budget amounts per category (can be customized or moved to a budgets table)
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
    
    result = []
    for row in data:
        category = row[0]
        spent = float(row[1]) if row[1] else 0.0
        budgeted = default_budgets.get(category, 200)  # Default to 200 if category not in list
        
        result.append({
            "category": category,
            "budgeted": budgeted,
            "spent": spent
        })
    
    return result
