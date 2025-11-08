"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import type { Vehicle, Statistics, FilterStatus } from "@/app/types";

// Context State Interface
interface FleetState {
    vehicles: Vehicle[];
    statistics: Statistics | null;
    selectedVehicle: Vehicle | null;
    activeFilter: FilterStatus;
    isLoading: boolean;
    error: string | null;
    lastUpdate: string | null;
    nextUpdateCountdown: number; // seconds until next update
    isWebSocketConnected: boolean;
}

interface FleetActions {
    setVehicles: (vehicles: Vehicle[]) => void;
    updateVehicle: (vehicle: Vehicle) => void;
    setStatistics: (statistics: Statistics) => void;
    setSelectedVehicle: (vehicle: Vehicle | null) => void;
    setActiveFilter: (filter: FilterStatus) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLastUpdate: (timestamp: string) => void;
    setNextUpdateCountdown: (seconds: number) => void;
    setWebSocketConnected: (connected: boolean) => void;
    // Helper actions
    getFilteredVehicles: () => Vehicle[];
}


interface FleetContextType {
    state: FleetState;
    actions: FleetActions;
}

// Create Context
const FleetContext = createContext<FleetContextType | undefined>(undefined);

// Initial State
const initialState: FleetState = {
    vehicles: [],
    statistics: null,
    selectedVehicle: null,
    activeFilter: "all",
    isLoading: false,
    error: null,
    lastUpdate: null,
    nextUpdateCountdown: 180, // 3 minutes in seconds
    isWebSocketConnected: false,
};

// Context Provider Component
export function FleetProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<FleetState>(initialState);

    // Action creators (keep these as they are)
    const setVehicles = useCallback((vehicles: Vehicle[]) => {
        setState((prev) => ({ ...prev, vehicles }));
    }, []);

    const updateVehicle = useCallback((vehicle: Vehicle) => {
        setState((prev) => ({
            ...prev,
            vehicles: prev.vehicles.map((v) =>
                v.id === vehicle.id ? vehicle : v
            ),
            selectedVehicle:
                prev.selectedVehicle?.id === vehicle.id ? vehicle : prev.selectedVehicle,
        }));
    }, []);

    const setStatistics = useCallback((statistics: Statistics) => {
        setState((prev) => ({ ...prev, statistics }));
    }, []);

    const setSelectedVehicle = useCallback((vehicle: Vehicle | null) => {
        setState((prev) => ({ ...prev, selectedVehicle: vehicle }));
    }, []);

    const setActiveFilter = useCallback((filter: FilterStatus) => {
        setState((prev) => ({ ...prev, activeFilter: filter }));
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        setState((prev) => ({ ...prev, isLoading: loading }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setState((prev) => ({ ...prev, error }));
    }, []);

    const setLastUpdate = useCallback((timestamp: string) => {
        setState((prev) => ({ ...prev, lastUpdate: timestamp }));
    }, []);

    const setNextUpdateCountdown = useCallback((seconds: number) => {
        setState((prev) => ({ ...prev, nextUpdateCountdown: seconds }));
    }, []);

    const setWebSocketConnected = useCallback((connected: boolean) => {
        setState((prev) => ({ ...prev, isWebSocketConnected: connected }));
    }, []);

    // Helper: Get filtered vehicles - use useMemo instead of useCallback
    const getFilteredVehicles = useCallback((): Vehicle[] => {
        if (state.activeFilter === "all") {
            return state.vehicles;
        }
        return state.vehicles.filter(
            (vehicle) => vehicle.status === state.activeFilter
        );
    }, [state.activeFilter, state.vehicles]);

    // Memoize actions object
    const actions: FleetActions = useMemo(
        () => ({
            setVehicles,
            updateVehicle,
            setStatistics,
            setSelectedVehicle,
            setActiveFilter,
            setLoading,
            setError,
            setLastUpdate,
            setNextUpdateCountdown,
            setWebSocketConnected,
            getFilteredVehicles,
        }),
        [
            setVehicles,
            updateVehicle,
            setStatistics,
            setSelectedVehicle,
            setActiveFilter,
            setLoading,
            setError,
            setLastUpdate,
            setNextUpdateCountdown,
            setWebSocketConnected,
            getFilteredVehicles,
        ]
    );

    // Memoize context value
    const value: FleetContextType = useMemo(
        () => ({
            state,
            actions,
        }),
        [state, actions]
    );

    return (
        <FleetContext.Provider value={value}>{children}</FleetContext.Provider>
    );
}
// Custom hook to use FleetContext
export function useFleet() {
    const context = useContext(FleetContext);
    if (context === undefined) {
        throw new Error("useFleet must be used within a FleetProvider");
    }
    return context;
}