import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { bordasComponents, colorOpacity } from "../../../../theme/theme";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      sx={{
        border: bordasComponents,
        p: 3,
        borderRadius: 1,
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
          background:
            "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
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
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography
            fontWeight={300}
            color={colorOpacity}
            fontSize="1rem"
          >
            {title}
          </Typography>

          <Typography
            fontWeight={600}
            color="white"
            fontSize="1.7rem"
          >
            {value}
          </Typography>
        </Box>

        {icon}
      </Stack>
    </Box>
  );
}