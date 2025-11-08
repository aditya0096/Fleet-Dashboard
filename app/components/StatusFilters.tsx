"use client";

import { Box, Button, Typography, Grid } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import type { FilterStatus } from "@/app/types";
import { STATUS_COLORS } from "@/app/utils/constants";

interface StatusFiltersProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  statistics: {
    total: number;
    idle: number;
    en_route: number;
    delivered: number;
  } | null;
}

export default function StatusFilters({
  activeFilter,
  onFilterChange,
  statistics,
}: StatusFiltersProps) {
  if (!statistics) return null;

  const filters: {
    value: FilterStatus;
    label: string;
    count: number;
    color: string;
  }[] = [
    { value: "all", label: "All", count: statistics.total, color: "#2196F3" },
    { value: "idle", label: "Idle", count: statistics.idle, color: STATUS_COLORS.IDLE },
    { value: "en_route", label: "En Route", count: statistics.en_route, color: STATUS_COLORS.EN_ROUTE },
    { value: "delivered", label: "Delivered", count: statistics.delivered, color: STATUS_COLORS.DELIVERED },
  ];

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <FilterListIcon sx={{ fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold">
          Filter by Status
        </Typography>
      </Box>
      <Grid container spacing={1.5}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <Grid item xs={6} key={filter.value}>
              <Button
                fullWidth
                onClick={() => onFilterChange(filter.value)}
                sx={{
                  padding: "12px",
                  borderRadius: 2,
                  backgroundColor: isActive ? filter.color : "#f5f5f5",
                  color: isActive ? "white" : "text.primary",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: isActive ? filter.color : "#e0e0e0",
                  },
                }}
              >
                {filter.label} ({filter.count})
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}