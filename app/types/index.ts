
export type VehicleStatus = "idle" | "en_route" | "delivered";


export interface Location {
  lat: number;
  lng: number;
}


export interface Vehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone?: string;
  status: VehicleStatus;
  destination: string;
  currentLocation: Location;
  speed: number;
  lastUpdated: string;
  estimatedArrival?: string | null;
  batteryLevel?: number;
  fuelLevel?: number;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  timestamp: string;
}


export type VehicleResponse = ApiResponse<Vehicle>;


export type VehiclesResponse = ApiResponse<Vehicle[]>;


export interface Statistics {
  total: number;
  idle: number;
  en_route: number;
  delivered: number;
  average_speed: number;
  timestamp: string;
}


export type StatisticsResponse = ApiResponse<Statistics>;


export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}


export type FilterStatus = "all" | "idle" | "en_route" | "delivered";