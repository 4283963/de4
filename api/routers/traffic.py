from fastapi import APIRouter
from models import TrafficResponse
from services.traffic_service import get_all_traffic, update_traffic_random

router = APIRouter()


@router.get("", response_model=TrafficResponse)
def list_traffic():
    traffic_list, total, updated_at = get_all_traffic()
    return {
        "traffic": traffic_list,
        "total": total,
        "updated_at": updated_at,
    }


@router.post("/refresh")
def refresh_traffic():
    update_traffic_random()
    traffic_list, total, updated_at = get_all_traffic()
    return {
        "traffic": traffic_list,
        "total": total,
        "updated_at": updated_at,
        "message": "Traffic data refreshed",
    }
