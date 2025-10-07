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

def check_user(username, password):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s AND password_hash=%s", (username,password))
    user = cursor.fetchone()
    conn.close()
    return user is not None

# Function to create users:

def create_user(name,username,email,password):
    conn = get_conn()
    cursor = conn.cursor()
    password_hashed = password_hash.hash(password)
    try: 
        cursor.execute("INSERT TO (name, username, email, password_hash) VALUES(%s,%s,%s,%s)",(name, username, email, password_hashed))
        conn.commit()
        return True 
    except Exception as e:
        print("Error craeting user: ", e)
        conn.rollback()
        return False
    finally:
        cursor.close()
        conn.close()
        
    
