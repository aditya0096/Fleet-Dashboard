import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/app/utils/constants";
import type {
  Vehicle,
  Statistics,
  VehiclesResponse,
  VehicleResponse,
  StatisticsResponse,
  VehicleStatus,
  ErrorResponse,
} from "@/app/types";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    if (axiosError.response) {
      
      const errorData = axiosError.response.data;
      const errorMessage =
        errorData?.message || `Error: ${axiosError.response.status}`;
      console.error("API Error:", errorData || axiosError.response.statusText);
      throw new Error(errorMessage);
    } else if (axiosError.request) {
      
      console.error("Network Error: No response received");
      throw new Error("Network error. Please check your connection.");
    }
  }
  
  console.error("Unexpected Error:", error);
  throw new Error(
    error instanceof Error ? error.message : "An unexpected error occurred."
  );
};

/**
 * Fetch all vehicles
 * GET /api/vehicles
 */
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<VehiclesResponse>("/api/vehicles");
    
    if (!response.data.success) {
      throw new Error("Failed to fetch vehicles");
    }
    
    // Handle both array and single object in data
    const vehicles = Array.isArray(response.data.data)
      ? response.data.data
      : [response.data.data];
    
    return vehicles;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Fetch single vehicle by ID
 * GET /api/vehicles/{id}
 */
export const getVehicleById = async (id: string): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<VehicleResponse>(`/api/vehicles/${id}`);
    
    if (!response.data.success) {
      throw new Error("Failed to fetch vehicle");
    }
    
    const vehicle = Array.isArray(response.data.data)
      ? response.data.data[0]
      : response.data.data;
    
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    
    return vehicle;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Fetch vehicles filtered by status
 * GET /api/vehicles/status/{status}
 */
export const getVehiclesByStatus = async (
  status: VehicleStatus
): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<VehiclesResponse>(
      `/api/vehicles/status/${status}`
    );
    
    if (!response.data.success) {
      throw new Error("Failed to fetch vehicles by status");
    }
    
    const vehicles = Array.isArray(response.data.data)
      ? response.data.data
      : [response.data.data];
    
    return vehicles;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Fetch fleet statistics
 * GET /api/statistics
 */
export const getStatistics = async (): Promise<Statistics> => {
  try {
    const response = await apiClient.get<StatisticsResponse>("/api/statistics");
    
    if (!response.data.success) {
      throw new Error("Failed to fetch statistics");
    }
    
    const statistics = Array.isArray(response.data.data)
      ? response.data.data[0]
      : response.data.data;
    
    if (!statistics) {
      throw new Error("Statistics not found");
    }
    
    return statistics;
  } catch (error) {
    return handleApiError(error);
  }
};


export default apiClient;