import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "exhibition.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS booths (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            pos_x REAL NOT NULL,
            pos_y REAL NOT NULL,
            pos_z REAL NOT NULL,
            width REAL NOT NULL DEFAULT 2.5,
            height REAL NOT NULL DEFAULT 0.15,
            depth REAL NOT NULL DEFAULT 2.5
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS traffic (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER NOT NULL REFERENCES booths(id),
            count INTEGER NOT NULL DEFAULT 0,
            level TEXT NOT NULL DEFAULT 'low',
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    """)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_traffic_booth_id ON traffic(booth_id)
    """)
    conn.commit()
    conn.close()
