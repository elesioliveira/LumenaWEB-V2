import { Box, Typography } from "@mui/material";
import { colorOpacity } from "../../../../theme/theme";

interface InfoTextProps {
  title: string;
  description: string;
}

export function InfoText({ title, description }: InfoTextProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        fontWeight={300}
        color={colorOpacity}
        fontSize="0.95rem"
      >
        {title}
      </Typography>

      <Typography
        fontWeight={500}
        color="white"
        fontSize="1.1rem"
      >
        {description}
      </Typography>
    </Box>
  );
}
