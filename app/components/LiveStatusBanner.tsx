"use client";

import { Box, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";

export default function LiveStatusBanner({ isConnected }: { isConnected: boolean }) {
  if (!isConnected) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 16px",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        marginBottom: 2,
      }}
    >
      <WifiIcon sx={{ fontSize: 18 }} />
      <Typography variant="body2" fontWeight={500}>
        Live Updates Active
      </Typography>
    </Box>
  );
}