import { useEffect, useCallback } from 'react';
import { useExhibitionStore } from '@/stores/useStore';
import { BoothResponse, TrafficResponse } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

export function useTrafficData(refreshInterval = 30000) {
  const { setBooths, setTraffic, setLoading, setError } = useExhibitionStore();

  const fetchBooths = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/booths`);
      if (!response.ok) throw new Error('Failed to fetch booths');
      const data: BoothResponse = await response.json();
      setBooths(data.booths);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [setBooths, setError]);

  const fetchTraffic = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/traffic`);
      if (!response.ok) throw new Error('Failed to fetch traffic');
      const data: TrafficResponse = await response.json();
      setTraffic(data.traffic, data.total, data.updated_at);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [setTraffic, setLoading, setError]);

  const refreshTraffic = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/traffic/refresh`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to refresh traffic');
      const data: TrafficResponse & { message: string } = await response.json();
      setTraffic(data.traffic, data.total, data.updated_at);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [setTraffic, setLoading, setError]);

  useEffect(() => {
    fetchBooths();
    fetchTraffic();

    const interval = setInterval(() => {
      fetchTraffic();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchBooths, fetchTraffic, refreshInterval]);

  return { fetchBooths, fetchTraffic, refreshTraffic };
}
