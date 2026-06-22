from fastapi import APIRouter, HTTPException
from models import BoothResponse, BoothTrafficResponse
from services.booth_service import get_all_booths, get_booth_by_id
from services.traffic_service import get_booth_traffic

router = APIRouter()


@router.get("", response_model=BoothResponse)
def list_booths():
    booths = get_all_booths()
    return {"booths": booths}


@router.get("/{booth_id}/traffic", response_model=BoothTrafficResponse)
def booth_traffic(booth_id: int):
    booth = get_booth_by_id(booth_id)
    if not booth:
        raise HTTPException(status_code=404, detail="Booth not found")

    traffic = get_booth_traffic(booth_id)
    if not traffic:
        raise HTTPException(status_code=404, detail="Traffic data not found")

    return traffic
