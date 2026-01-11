import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: ReactNode;
  valueColor: string;
  borderStyle: string;
  subtitleColor?: string;
}

export function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  valueColor,
  borderStyle,
  subtitleColor = "rgba(255,255,255,0.6)",
}: SummaryCardProps) {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      sx={{
        border: borderStyle,
        p: 4,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease",

        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
          transform: "translateY(0px)",
        },

        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
          opacity: 0,
          transition: "0.3s ease",
        },

        "&:hover:before": {
          opacity: 1,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={500} color="white" fontSize="1rem">
          {title}
        </Typography>

        {icon}
      </Stack>

      <Typography fontWeight={600} color={valueColor} fontSize="1.6rem">
        {value}
      </Typography>

      <Typography fontWeight={200} color={subtitleColor} fontSize="1.2rem">
        {subtitle}
      </Typography>
    </Box>
  );
}
