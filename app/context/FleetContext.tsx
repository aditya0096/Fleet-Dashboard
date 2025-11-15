"use client";

import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    ReactNode,
    Dispatch,
} from "react";
import type { Vehicle, Statistics, FilterStatus } from "@/app/types";

/* --- State & Action Types --- */
type FleetState = {
    vehicles: Vehicle[];
    statistics: Statistics | null;
    selectedVehicle: Vehicle | null;
    activeFilter: FilterStatus;
    isLoading: boolean;
    error: string | null;
    lastUpdate: string | null;
    nextUpdateCountdown: number;
    isWebSocketConnected: boolean;
};

type Action =
    | { type: "SET_VEHICLES"; payload: Vehicle[] }
    | { type: "UPDATE_VEHICLE"; payload: Vehicle }
    | { type: "SET_STATISTICS"; payload: Statistics }
    | { type: "SET_SELECTED_VEHICLE"; payload: Vehicle | null }
    | { type: "SET_ACTIVE_FILTER"; payload: FilterStatus }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "SET_LAST_UPDATE"; payload: string }
    | { type: "SET_NEXT_UPDATE_COUNTDOWN"; payload: number }
    | { type: "SET_WEBSOCKET_CONNECTED"; payload: boolean }
    | { type: "CLEAR_VEHICLES", payload: null };

type FleetContextType = {
    state: FleetState;
    actions: {
        setVehicles: (v: Vehicle[]) => void;
        updateVehicle: (v: Vehicle) => void;
        setStatistics: (s: Statistics) => void;
        setSelectedVehicle: (v: Vehicle | null) => void;
        setActiveFilter: (f: FilterStatus) => void;
        setLoading: (b: boolean) => void;
        setError: (e: string | null) => void;
        setLastUpdate: (t: string) => void;
        setNextUpdateCountdown: (s: number) => void;
        setWebSocketConnected: (b: boolean) => void;
        getFilteredVehicles: () => Vehicle[];
        setClearVehicles: () => void;
    };
};

const initialState: FleetState = {
    vehicles: [],
    statistics: null,
    selectedVehicle: null,
    activeFilter: "all",
    isLoading: false,
    error: null,
    lastUpdate: null,
    nextUpdateCountdown: 180,
    isWebSocketConnected: false,
};

/* --- Reducer --- */
function reducer(state: FleetState, action: Action): FleetState {
    switch (action.type) {
        case "SET_VEHICLES":
            return { ...state, vehicles: action.payload };
        case "UPDATE_VEHICLE": {
            const updated = state.vehicles.map((v) =>
                v.id === action.payload.id ? action.payload : v
            );
            const selected =
                state.selectedVehicle?.id === action.payload.id
                    ? action.payload
                    : state.selectedVehicle;
            return { ...state, vehicles: updated, selectedVehicle: selected };
        }
        case "SET_STATISTICS":
            return { ...state, statistics: action.payload };
        case "SET_SELECTED_VEHICLE":
            return { ...state, selectedVehicle: action.payload };
        case "SET_ACTIVE_FILTER":
            return { ...state, activeFilter: action.payload };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LAST_UPDATE":
            return { ...state, lastUpdate: action.payload };
        case "SET_NEXT_UPDATE_COUNTDOWN":
            return { ...state, nextUpdateCountdown: action.payload };
        case "SET_WEBSOCKET_CONNECTED":
            return { ...state, isWebSocketConnected: action.payload };
        case "CLEAR_VEHICLES":
            return { ...state, vehicles: [] }
        default:
            return state;
    }
}

/* --- Context & Provider --- */
const FleetContext = createContext<FleetContextType | undefined>(undefined);

export function FleetProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // action helpers (thin wrappers, memoized)
    const actions = useMemo(() => {
        const d = (action: Action) => dispatch(action);
        return {
            setVehicles: (v: Vehicle[]) => d({ type: "SET_VEHICLES", payload: v }),
            updateVehicle: (v: Vehicle) => d({ type: "UPDATE_VEHICLE", payload: v }),
            setStatistics: (s: Statistics) => d({ type: "SET_STATISTICS", payload: s }),
            setSelectedVehicle: (v: Vehicle | null) =>
                d({ type: "SET_SELECTED_VEHICLE", payload: v }),
            setActiveFilter: (f: FilterStatus) =>
                d({ type: "SET_ACTIVE_FILTER", payload: f }),
            setLoading: (b: boolean) => d({ type: "SET_LOADING", payload: b }),
            setError: (e: string | null) => d({ type: "SET_ERROR", payload: e }),
            setLastUpdate: (t: string) => d({ type: "SET_LAST_UPDATE", payload: t }),
            setNextUpdateCountdown: (s: number) =>
                d({ type: "SET_NEXT_UPDATE_COUNTDOWN", payload: s }),
            setWebSocketConnected: (b: boolean) =>
                d({ type: "SET_WEBSOCKET_CONNECTED", payload: b }),
            getFilteredVehicles: () =>
                state.activeFilter === "all"
                    ? state.vehicles
                    : state.vehicles.filter((veh) => veh.status === state.activeFilter),
            setClearVehicles: () => d({ type: "CLEAR_VEHICLES", payload: null })
        };

    }, [state, dispatch]);

    const value = useMemo(() => ({ state, actions }), [state, actions]);

    return (
        <FleetContext.Provider value={value}>{children}</FleetContext.Provider>
    );
}

export function useFleet() {
    const ctx = useContext(FleetContext);
    if (!ctx) throw new Error("useFleet must be used inside FleetProvider");
    return ctx;
}
