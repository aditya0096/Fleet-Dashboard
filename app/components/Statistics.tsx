"use client";

import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { kmhToMph } from "@/app/utils/formats";

interface StatisticsProps {
  statistics: {
    total: number;
    average_speed: number;
    en_route: number;
    timestamp: string;
  } | null;
}

export default function Statistics({ statistics }: StatisticsProps) {
  if (!statistics) {
    return <Box>Loading statistics...</Box>;
  }

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return timestamp;
    }
  };

  const stats = [
    {
      label: "TOTAL FLEET",
      value: statistics.total.toString(),
      icon: <DirectionsCarIcon sx={{ fontSize: 20 }} />,
    },
    {
      label: "AVG SPEED",
      value: `${kmhToMph(statistics.average_speed)} mph`,
      icon: <SpeedIcon sx={{ fontSize: 20 }} />,
    },
    {
      label: "MOVING",
      value: statistics.en_route.toString(),
      icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
    },
    {
      label: "LAST UPDATE",
      value: formatTime(statistics.timestamp),
      icon: <AccessTimeIcon sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <AccessTimeIcon sx={{ fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Fleet Statistics
        </Typography>
      </Box>
      <Grid container spacing={1.5}>
        {stats.map((stat, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                backgroundColor: "#f9f9f9",
                boxShadow: "none",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ padding: "16px !important" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "11px" }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}