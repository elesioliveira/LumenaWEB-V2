import { Button, CircularProgress, type ButtonProps } from "@mui/material";
import { bgComponents, bordasComponents, colorOpacity } from "../theme/theme";

interface SecondaryActionButtonProps extends ButtonProps {
  label: string;
  height?: number;
  loading?: boolean;
}

export function SecondaryActionButton({
  label,
  sx,
  height,
  loading = false,
  disabled,
  ...props
}: SecondaryActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      sx={{
        height: height ?? 40,
        px: 3,
        color: "#fff",
        fontWeight: 500,
        textTransform: "none",
        borderRadius: 1,
        background: "transparent",
        border: bordasComponents,
        opacity: 0.9,
        transition: "all 0.25s ease",
        ...(isDisabled && {
          color: "#9e9e9e",
          borderColor: "#9e9e9e",
          cursor: "not-allowed",
        }),
        "&:hover": !isDisabled
          ? {
              background: "rgba(255,255,255,0.05)",
              borderColor: colorOpacity,
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