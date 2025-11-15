"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
import { useVehicles } from "./hooks/useVehicles";
import { useStatistics } from "./hooks/useStatistics";
import { useVehicleDetail } from "./hooks/useVechicleDetail";
import { useFleet } from "./context/FleetContext";
import { useWebSocket } from "./hooks/useWebSocket";
import LiveStatusBanner from "./components/LiveStatusBanner";
import Statistics from "./components/Statistics";
import UpdateStatus from "./components/UpdateStatus";
import StatusFilters from "./components/StatusFilters";
import VehicleTable from "./components/VehicleList";
import VehicleModal from "./components/VehicleCard";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { filteredVehicles, isLoading } = useVehicles();
  const { statistics } = useStatistics();
  const { state, actions } = useFleet();
  const { openVehicleModal, closeVehicleModal } = useVehicleDetail();

  useWebSocket();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ padding: 16 }}>Initializing...</div>;
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl" sx={{ padding: 3 }}>
        {/* Header */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 0.5 }}>
            Fleet Tracking Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time vehicle monitoring • LogiNext Case Study
          </Typography>
        </Box>

        {/* Two Column Layout */}
        <Grid container spacing={3} sx={{
          height: '100vh', flexDirection: 'row',
          flexWrap: 'nowrap'
        }}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: "#fafafa",
                padding: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                height: "100%", // Let sidebar stretch
              }}
            >
              <LiveStatusBanner isConnected={state.isWebSocketConnected} />

              <StatusFilters
                activeFilter={state.activeFilter}
                onFilterChange={actions.setActiveFilter}
                statistics={statistics}
              />

              <Statistics statistics={statistics} />

              <UpdateStatus lastUpdate={state.lastUpdate} />
            </Box>
          </Grid>

          {/* Right Main Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              height: "100%",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Vehicles Header - remove duplicate header from VehicleTable */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Vehicles ({filteredVehicles.length})
                </Typography>
                {state.isWebSocketConnected && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Live
                  </Typography>
                )}
              </Box>
              {isLoading ? (
                <Box>Loading vehicles...</Box>
              ) : (

                <VehicleTable
                  vehicles={filteredVehicles}
                  onVehicleClick={(vehicle) => openVehicleModal(vehicle.id)}

                />
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Vehicle Modal */}
        <VehicleModal vehicle={state.selectedVehicle} onClose={closeVehicleModal} />
      </Container>
    </Box >
  );
}