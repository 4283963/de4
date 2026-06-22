export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Size {
  width: number;
  height: number;
  depth: number;
}

export interface Booth {
  id: number;
  name: string;
  position: Position;
  size: Size;
}

export interface TrafficItem {
  booth_id: number;
  name: string;
  count: number;
  level: 'low' | 'medium' | 'high';
}

export interface TrafficResponse {
  traffic: TrafficItem[];
  total: number;
  updated_at: string;
}

export interface BoothResponse {
  booths: Booth[];
}

export type TrafficLevel = 'low' | 'medium' | 'high';
