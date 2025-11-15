"use client";

import { useEffect, useRef } from "react";
import { useFleet } from "@/app/context/FleetContext";
import { webSocketService } from "@/app/services/websocket";
import type { Vehicle, Statistics } from "@/app/types";


export function useWebSocket() {
  const { actions } = useFleet();
  const actionsRef = useRef(actions);

  actionsRef.current = actions;

  useEffect(() => {
    const handleMessage = (data: any) => {
      const actions = actionsRef.current;

      if (Array.isArray(data)) {
        actions.setVehicles(data);

        actions.setLastUpdate(new Date().toISOString());
      } else if (data.vehicles && Array.isArray(data.vehicles)) {
        actions.setVehicles(data.vehicles);
        actions.setLastUpdate(new Date().toISOString());
      } else if (data.vehicleNumber || data.id) {
        actions.updateVehicle(data as Vehicle);
        actions.setLastUpdate(new Date().toISOString());
      } else if (data.total !== undefined) {
        actions.setStatistics(data as Statistics);
        actions.setLastUpdate(data.timestamp || new Date().toISOString());
      }
    };

    const handleStatus = (connected: boolean) => {
      actions.setWebSocketConnected(connected);
    };

    webSocketService.connect(handleMessage, handleStatus);

    return () => {
      webSocketService.disconnect();
    };

  }, []);

  return null;
}
