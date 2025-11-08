"use client";

import { useEffect, useRef } from "react";
import { useFleet } from "@/app/context/FleetContext";
import { getStatistics } from "@/app/services/api";

export function useStatistics() {
  const { state, actions } = useFleet();
  const hasFetchedRef = useRef(false);

  // Fetch statistics only once on mount
  useEffect(() => {
    if (hasFetchedRef.current) return;

    const fetchData = async () => {
      try {
        actions.setError(null);
        const statistics = await getStatistics();
        actions.setStatistics(statistics);
        actions.setLastUpdate(statistics.timestamp);
        hasFetchedRef.current = true;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch statistics";
        actions.setError(errorMessage);
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
    
  }, []);

  const fetchStatistics = async () => {
    try {
      actions.setError(null);
      const statistics = await getStatistics();
      actions.setStatistics(statistics);
      actions.setLastUpdate(statistics.timestamp);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch statistics";
      actions.setError(errorMessage);
    }
  };

  return {
    statistics: state.statistics,
    error: state.error,
    fetchStatistics,
  };
}