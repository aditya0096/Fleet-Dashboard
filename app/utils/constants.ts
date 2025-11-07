// API Configuration
export const API_BASE_URL = "https://case-study-26cf.onrender.com";
export const WS_URL = "wss://case-study-26cf.onrender.com";

// Vehicle Status Types
export const VEHICLE_STATUS = {
  ALL: "all",
  IDLE: "idle",
  EN_ROUTE: "en_route",
  DELIVERED: "delivered",
} as const;

// Status Colors
export const STATUS_COLORS = {
  DELIVERED: "#4CAF50", // Green
  IDLE: "#9E9E9E", // Grey
  EN_ROUTE: "#2196F3", // Blue
} as const;

// WebSocket Update Interval (in milliseconds)
export const WS_UPDATE_INTERVAL = 3 * 60 * 1000; // 3 minutes