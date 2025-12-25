import { Button, type ButtonProps } from "@mui/material";
import { bgComponents, bordasComponents } from "../theme/theme";

interface PrimaryActionButtonProps extends ButtonProps {
  label: string;
  background?: string;
  boxShadow?: string;
  height?: number;
}

export function PrimaryActionButton({
  label,
  sx,
  background,
  boxShadow,
  height,
  ...props
}: PrimaryActionButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        height:height?? 40,
        px: 3,
        color: "#fff",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: 1,
        background:background?? bgComponents,
        border: bordasComponents,
        boxShadow:boxShadow,
        transition: "all 0.25s ease",
        "&:hover": {
          background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
          boxShadow: "0 0 25px rgba(245,159,10,0.55)",
          transform: "translateY(-1px)",
        },
        ...sx, // permite customização local
      }}
    >
      {label}
    </Button>
  );
}
