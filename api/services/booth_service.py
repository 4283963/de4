import sys
import os
from typing import List, Optional

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_connection
from models import Booth, Position, Size, TrafficItem


def get_all_booths() -> List[Booth]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM booths ORDER BY id")
    rows = cursor.fetchall()
    conn.close()

    booths = []
    for row in rows:
        booths.append(
            Booth(
                id=row["id"],
                name=row["name"],
                position=Position(x=row["pos_x"], y=row["pos_y"], z=row["pos_z"]),
                size=Size(width=row["width"], height=row["height"], depth=row["depth"]),
            )
        )
    return booths


def get_booth_by_id(booth_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM booths WHERE id = ?", (booth_id,))
    row = cursor.fetchone()
    conn.close()
    return row
