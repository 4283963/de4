import * as THREE from 'three';
import { TrafficLevel } from '@/types';

const HEAT_COLORS: Record<TrafficLevel, string> = {
  low: '#00ff88',
  medium: '#ffdd00',
  high: '#ff3d71',
};

export const getHeatColor = (level: TrafficLevel): string => {
  return HEAT_COLORS[level];
};

export const getHeatColorThree = (level: TrafficLevel): THREE.Color => {
  return new THREE.Color(getHeatColor(level));
};

export const getHeatIntensity = (level: TrafficLevel): number => {
  switch (level) {
    case 'low':
      return 0.6;
    case 'medium':
      return 0.8;
    case 'high':
      return 1.2;
  }
};

export const getSphereScale = (count: number, minCount: number, maxCount: number): number => {
  if (maxCount === minCount) return 1;
  const normalized = (count - minCount) / (maxCount - minCount);
  return 0.7 + normalized * 1.3;
};

export const formatCount = (count: number): string => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

export const formatTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return isoString;
  }
};
