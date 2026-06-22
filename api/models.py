from pydantic import BaseModel
from typing import Optional, List


class Position(BaseModel):
    x: float
    y: float
    z: float


class Size(BaseModel):
    width: float
    height: float
    depth: float


class Booth(BaseModel):
    id: int
    name: str
    position: Position
    size: Size


class BoothResponse(BaseModel):
    booths: List[Booth]


class TrafficItem(BaseModel):
    booth_id: int
    name: str
    count: int
    level: str


class TrafficResponse(BaseModel):
    traffic: List[TrafficItem]
    total: int
    updated_at: str


class BoothTrafficResponse(BaseModel):
    booth_id: int
    name: str
    count: int
    level: str
    updated_at: str
