import sys
import os
from datetime import datetime
from typing import Optional, List, Tuple

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_connection
from models import TrafficItem, BoothTrafficResponse


def _determine_level(count: int) -> str:
    if count >= 150:
        return "high"
    elif count >= 80:
        return "medium"
    else:
        return "low"


def get_all_traffic() -> Tuple[List[TrafficItem], int, str]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.booth_id, b.name, t.count, t.level, t.updated_at
        FROM traffic t
        JOIN booths b ON t.booth_id = b.id
        ORDER BY t.booth_id
    """)
    rows = cursor.fetchall()
    conn.close()

    traffic_list = []
    total = 0
    latest_time = ""

    for row in rows:
        traffic_list.append(
            TrafficItem(
                booth_id=row["booth_id"],
                name=row["name"],
                count=row["count"],
                level=row["level"],
            )
        )
        total += row["count"]
        if not latest_time or row["updated_at"] > latest_time:
            latest_time = row["updated_at"]

    return traffic_list, total, latest_time


def get_booth_traffic(booth_id: int) -> Optional[BoothTrafficResponse]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.booth_id, b.name, t.count, t.level, t.updated_at
        FROM traffic t
        JOIN booths b ON t.booth_id = b.id
        WHERE t.booth_id = ?
    """, (booth_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return BoothTrafficResponse(
        booth_id=row["booth_id"],
        name=row["name"],
        count=row["count"],
        level=row["level"],
        updated_at=row["updated_at"],
    )


def update_traffic_random():
    import random
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT booth_id FROM traffic")
    rows = cursor.fetchall()

    for row in rows:
        new_count = random.randint(30, 200)
        new_level = _determine_level(new_count)
        cursor.execute(
            "UPDATE traffic SET count = ?, level = ?, updated_at = datetime('now') WHERE booth_id = ?",
            (new_count, new_level, row["booth_id"])
        )

    conn.commit()
    conn.close()
