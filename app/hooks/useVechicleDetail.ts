"use client";

import { useCallback } from "react";
import { useFleet } from "@/app/context/FleetContext";
import { getVehicleById } from "@/app/services/api";

export function useVehicleDetail() {
  const { state, actions } = useFleet();

  // Fetch and set selected vehicle
  const fetchVehicleDetail = useCallback(
    async (vehicleId: string) => {
      try {
        actions.setLoading(true);
        actions.setError(null);
        const vehicle = await getVehicleById(vehicleId);
        actions.setSelectedVehicle(vehicle);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch vehicle details";
        actions.setError(errorMessage);
        console.error("Error fetching vehicle detail:", error);
        actions.setSelectedVehicle(null);
      } finally {
        actions.setLoading(false);
      }
    },
    [actions]
  );

  const openVehicleModal = useCallback(
    (vehicleId: string) => {
      // Check if vehicle is already in the list
      const existingVehicle = state.vehicles.find((v) => v.id === vehicleId);
      
      if (existingVehicle) {
        actions.setSelectedVehicle(existingVehicle);
        // Still fetch detailed info for modal (might have additional fields)
        fetchVehicleDetail(vehicleId);
      } else {
        // Vehicle not in list, fetch it
        fetchVehicleDetail(vehicleId);
      }
    },
    [state.vehicles, actions, fetchVehicleDetail]
  );

  
  const closeVehicleModal = useCallback(() => {
    actions.setSelectedVehicle(null);
  }, [actions]);

  return {
    selectedVehicle: state.selectedVehicle,
    isLoading: state.isLoading,
    error: state.error,
    openVehicleModal,
    closeVehicleModal,
    fetchVehicleDetail,
  };
}