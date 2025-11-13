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
