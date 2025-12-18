import { Box } from "@mui/material";

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function PaginationButton({
  children,
  onClick,
  disabled,
}: PaginationButtonProps) {
  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        width: 36,
        height: 36,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        color: "#fff",
        opacity: disabled ? 0.4 : 1,
        background:
          "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
        boxShadow: "0 0 20px rgba(245,159,10,0.35)",
        transition: "0.25s ease",
        "&:hover": !disabled
          ? {
              background:
                "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
              boxShadow:
                "0 0 25px rgba(245,159,10,0.55)",
              transform: "translateY(-1px)",
            }
          : {},
      }}
    >
      {children}
    </Box>
  );
}
