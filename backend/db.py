import os, mariadb
from dotenv import load_dotenv

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
def check_user(username, password):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE usernam={username} AND password={password}")
    user = cursor.fetchone()
    conn.close()
    return user is not None

