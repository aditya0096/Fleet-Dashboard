"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getTimeAgo, formatCountdown } from "@/app/utils/formats";

interface UpdateStatusProps {
  lastUpdate: string | null;
}

export default function UpdateStatus({ lastUpdate }: UpdateStatusProps) {
  const [timeAgo, setTimeAgo] = useState(0);
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    if (!lastUpdate) return;

    const interval = setInterval(() => {
      const secondsAgo = getTimeAgo(lastUpdate);
      setTimeAgo(secondsAgo);

      setCountdown((prev) => {
        if (prev <= 0) return 180;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  if (!lastUpdate) return null;

  return (
    <Box
      sx={{
        padding: "8px 12px",
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        marginTop: 2,
      }}
    >
      <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
      <Typography variant="caption" color="text.secondary">
        Updated {timeAgo}s ago • Next update in ~{formatCountdown(countdown)}
      </Typography>
    </Box>
  );
}