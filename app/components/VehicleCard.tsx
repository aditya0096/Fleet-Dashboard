"use client";

import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Box,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BatteryIcon from "@mui/icons-material/Battery5Bar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import type { Vehicle } from "@/app/types";
import { STATUS_COLORS } from "@/app/utils/constants";
import { formatSpeed, formatDateTime, formatLocation } from "@/app/utils/formats";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  if (!vehicle) return null;

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

  const details = [
    {
      label: "STATUS",
      value: vehicle.status.toUpperCase(),
      icon: <CheckCircleIcon sx={{ fontSize: 18 }} />,
      color: getStatusColor(vehicle.status),
      isChip: true,
    },
    {
      label: "CURRENT SPEED",
      value: formatSpeed(vehicle.speed),
      icon: <SpeedIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "DRIVER",
      value: vehicle.driverName,
      icon: <PersonIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "PHONE",
      value: vehicle.driverPhone || "N/A",
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "DESTINATION",
      value: vehicle.destination,
      icon: <PlaceIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "LOCATION",
      value: formatLocation(vehicle.currentLocation.lat, vehicle.currentLocation.lng),
      icon: <LocationOnIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: "BATTERY LEVEL",
      value: vehicle.batteryLevel ? `${vehicle.batteryLevel}%` : "N/A",
      icon: <BatteryIcon sx={{ fontSize: 18 }} />,
      isProgress: true,
      progressValue: vehicle.batteryLevel || 0,
      progressColor: vehicle.batteryLevel && vehicle.batteryLevel < 30 ? "error" : "primary",
    },
    {
      label: "FUEL LEVEL",
      value: vehicle.fuelLevel ? `${vehicle.fuelLevel}%` : "N/A",
      icon: <LocalGasStationIcon sx={{ fontSize: 18 }} />,
      isProgress: true,
      progressValue: vehicle.fuelLevel || 0,
      progressColor: vehicle.fuelLevel && vehicle.fuelLevel < 30 ? "error" : "primary",
    },
    {
      label: "LAST UPDATED",
      value: formatDateTime(vehicle.lastUpdated),
      icon: <AccessTimeIcon sx={{ fontSize: 18 }} />,
    },
  ];

  return (
    <Dialog
      open={!!vehicle}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogContent sx={{ padding: 3 }}>
  
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
              <DirectionsCarIcon sx={{ fontSize: 24 }} />
              <Typography variant="h6" fontWeight="bold">
                {vehicle.vehicleNumber}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {vehicle.driverName} • {vehicle.status.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ marginTop: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Details Grid */}
        <Grid container spacing={2}>
          {details.map((detail, index) => (
            <Grid item xs={2} key={index}>
              <Box
                sx={{
                  padding: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  backgroundColor: "#fafafa",
                  height: "100%",
                  width: '200px'
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                  {detail.icon}
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ fontSize: "11px" }}>
                    {detail.label}
                  </Typography>
                </Box>
                {detail.isChip ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label={detail.value}
                    sx={{
                      backgroundColor: detail.color,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <Typography variant="body1" fontWeight="medium">
                    {detail.value}
                  </Typography>
                )}
                {detail.isProgress && (
                  <LinearProgress
                    variant="determinate"
                    value={detail.progressValue}
                    color={detail.progressColor as any}
                    sx={{ marginTop: 1.5, height: 8, borderRadius: 1 }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}