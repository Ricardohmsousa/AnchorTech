import sqlite3
from datetime import datetime

def create_purchases_table():
    """Create the purchases table if it doesn't exist"""
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            service_type TEXT NOT NULL,
            package_name TEXT,
            package_id TEXT,
            amount INTEGER NOT NULL,
            currency TEXT DEFAULT 'EUR',
            payment_intent_id TEXT UNIQUE NOT NULL,
            stripe_payment_method_id TEXT,
            payment_status TEXT NOT NULL,
            customer_name TEXT,
            customer_email TEXT,
            billing_address TEXT,
            service_details TEXT,
            metadata TEXT,
            purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create indexes for better performance
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_purchases_payment_intent ON purchases(payment_intent_id)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(payment_status)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_purchases_service_type ON purchases(service_type)
    ''')
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_purchases_table()
    print("Purchases table created successfully!")