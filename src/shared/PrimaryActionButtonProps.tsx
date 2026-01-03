import { Button, CircularProgress, type ButtonProps } from "@mui/material";
import { bgComponents, bordasComponents } from "../theme/theme";

interface PrimaryActionButtonProps extends ButtonProps {
  label: string;
  background?: string;
  boxShadow?: string;
  height?: number;
  loading?: boolean;
}

export function PrimaryActionButton({
  label,
  sx,
  background,
  boxShadow,
  height,
  loading = false,
  disabled,
  ...props
}: PrimaryActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      sx={{
        height: height ?? 40,
        px: 3,
        color: "#fff",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: 1,
        background: background ?? bgComponents,
        border: bordasComponents,
        boxShadow: boxShadow,
        transition: "all 0.25s ease",
        ...(isDisabled && {
          background: "#9e9e9e",
          boxShadow: "none",
          cursor: "not-allowed",
        }),
        "&:hover": !isDisabled
          ? {
              background:
                "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
              boxShadow: "0 0 25px rgba(245,159,10,0.55)",
              transform: "translateY(-1px)",
            }
          : {},
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={22} sx={{ color: "#fff" }} />
      ) : (
        label
      )}
    </Button>
  );
}