import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import init_db, get_connection


def seed_data():
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM booths")
    count = cursor.fetchone()[0]
    if count > 0:
        print("Database already seeded.")
        conn.close()
        return

    booths = [
        ("A区-智能硬件", -4.5, 0.075, -3.5, 2.5, 0.15, 2.5),
        ("A区-AI机器人", -4.5, 0.075, 0.0, 2.5, 0.15, 2.5),
        ("A区-智能家居", -4.5, 0.075, 3.5, 2.5, 0.15, 2.5),

        ("B区-数字文创", 0.0, 0.075, -3.5, 2.5, 0.15, 2.5),
        ("B区-元宇宙体验", 0.0, 0.075, 0.0, 2.5, 0.15, 2.5),
        ("B区-游戏互动", 0.0, 0.075, 3.5, 2.5, 0.15, 2.5),

        ("C区-新能源汽车", 4.5, 0.075, -3.5, 2.5, 0.15, 2.5),
        ("C区-智慧出行", 4.5, 0.075, 0.0, 2.5, 0.15, 2.5),
        ("C区-自动驾驶", 4.5, 0.075, 3.5, 2.5, 0.15, 2.5),

        ("D区-生物医药", -1.5, 0.075, -6.0, 2.5, 0.15, 2.5),
        ("D区-健康科技", 1.5, 0.075, -6.0, 2.5, 0.15, 2.5),
        ("D区-医疗设备", 0.0, 0.075, 6.0, 2.5, 0.15, 2.5),
    ]

    for booth in booths:
        cursor.execute(
            "INSERT INTO booths (name, pos_x, pos_y, pos_z, width, height, depth) VALUES (?, ?, ?, ?, ?, ?, ?)",
            booth
        )

    booth_ids = list(range(1, 13))
    import random
    random.seed(42)

    for booth_id in booth_ids:
        count = random.randint(30, 200)
        if count >= 150:
            level = "high"
        elif count >= 80:
            level = "medium"
        else:
            level = "low"
        cursor.execute(
            "INSERT INTO traffic (booth_id, count, level) VALUES (?, ?, ?)",
            (booth_id, count, level)
        )

    conn.commit()
    conn.close()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed_data()
