import { create } from 'zustand';
import { Booth, TrafficItem } from '@/types';

interface ExhibitionState {
  booths: Booth[];
  traffic: TrafficItem[];
  totalCount: number;
  updatedAt: string;
  selectedBoothId: number | null;
  isLoading: boolean;
  error: string | null;

  setBooths: (booths: Booth[]) => void;
  setTraffic: (traffic: TrafficItem[], total: number, updatedAt: string) => void;
  setSelectedBoothId: (id: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  getTrafficByBoothId: (boothId: number) => TrafficItem | undefined;
  getMinMaxCount: () => { min: number; max: number };
}

export const useExhibitionStore = create<ExhibitionState>((set, get) => ({
  booths: [],
  traffic: [],
  totalCount: 0,
  updatedAt: '',
  selectedBoothId: null,
  isLoading: false,
  error: null,

  setBooths: (booths) => set({ booths }),
  setTraffic: (traffic, totalCount, updatedAt) => set({ traffic, totalCount, updatedAt }),
  setSelectedBoothId: (selectedBoothId) => set({ selectedBoothId }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  getTrafficByBoothId: (boothId) => {
    return get().traffic.find((t) => t.booth_id === boothId);
  },

  getMinMaxCount: () => {
    const { traffic } = get();
    if (traffic.length === 0) return { min: 0, max: 100 };
    const counts = traffic.map((t) => t.count);
    return { min: Math.min(...counts), max: Math.max(...counts) };
  },
}));
