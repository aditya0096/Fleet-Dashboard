"use client";

import { useEffect, useRef } from "react";
import { useFleet } from "@/app/context/FleetContext";
import { getVehicles, getVehiclesByStatus } from "@/app/services/api";

export function useVehicles() {
  const { state, actions } = useFleet();
  const lastFetchedFilter = useRef<string | null>(null);
  const isFetchingRef = useRef(false);

  // Fetch vehicles when filter changes
  useEffect(() => {
   
    if (isFetchingRef.current || lastFetchedFilter.current === state.activeFilter) {
      return;
    }

    const fetchData = async () => {
      isFetchingRef.current = true;
      
      try {
        actions.setLoading(true);
        actions.setError(null);
        
        let vehicles;
        if (state.activeFilter === "all") {
          vehicles = await getVehicles();
        } else {
          vehicles = await getVehiclesByStatus(state.activeFilter);
        }
        
        actions.setVehicles(vehicles);
        lastFetchedFilter.current = state.activeFilter;
        
        if (vehicles.length > 0) {
          actions.setLastUpdate(new Date().toISOString());
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch vehicles";
        actions.setError(errorMessage);
        console.error("Error fetching vehicles:", error);
        // Reset on error so we can retry
        lastFetchedFilter.current = null;
      } finally {
        actions.setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchData();
    
  }, [state.activeFilter]);

 
  const filteredVehicles = actions.getFilteredVehicles();

  
  const fetchVehicles = async () => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    try {
      actions.setLoading(true);
      actions.setError(null);
      const vehicles = await getVehicles();
      actions.setVehicles(vehicles);
      lastFetchedFilter.current = "all";
      if (vehicles.length > 0) {
        actions.setLastUpdate(new Date().toISOString());
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch vehicles";
      actions.setError(errorMessage);
      lastFetchedFilter.current = null;
    } finally {
      actions.setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const fetchVehiclesByStatus = async (status: string) => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    try {
      actions.setLoading(true);
      actions.setError(null);
      const vehicles = await getVehiclesByStatus(status as any);
      actions.setVehicles(vehicles);
      lastFetchedFilter.current = status;
      if (vehicles.length > 0) {
        actions.setLastUpdate(new Date().toISOString());
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch vehicles by status";
      actions.setError(errorMessage);
      lastFetchedFilter.current = null;
    } finally {
      actions.setLoading(false);
      isFetchingRef.current = false;
    }
  };

  return {
    vehicles: state.vehicles,
    filteredVehicles,
    isLoading: state.isLoading,
    error: state.error,
    fetchVehicles,
    fetchVehiclesByStatus,
  };
}