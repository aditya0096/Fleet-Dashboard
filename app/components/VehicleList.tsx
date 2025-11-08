"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
import type { Vehicle } from "@/app/types";
import { STATUS_COLORS } from "@/app/utils/constants";
import { formatSpeed, formatDateTime, formatLocation } from "@/app/utils/formats";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  hideHeader?: boolean;
}

export default function VehicleTable({ vehicles, onVehicleClick, hideHeader }: VehicleTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return STATUS_COLORS.DELIVERED;
      case "idle":
        return STATUS_COLORS.IDLE;
      case "en_route":
        return STATUS_COLORS.EN_ROUTE;
      default:
        return "#757575";
    }
  };

  return (
    <Box sx={{
      height: '100%',
      maxHeight: '100%'
      , overflowY: 'auto'
    }}>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onVehicleClick(vehicle)}
              >
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.driverName}</TableCell>
                <TableCell>
                  <Chip
                    label={vehicle.status.toUpperCase()}
                    sx={{
                      backgroundColor: getStatusColor(vehicle.status),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell>{formatSpeed(vehicle.speed)}</TableCell>
                <TableCell>{vehicle.destination}</TableCell>
                <TableCell>{vehicle.estimatedArrival ? formatDateTime(vehicle.estimatedArrival) : "-"}</TableCell>
                <TableCell>{formatDateTime(vehicle.lastUpdated)}</TableCell>
                <TableCell>
                  {formatLocation(vehicle.currentLocation.lat, vehicle.currentLocation.lng)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}