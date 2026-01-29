import { TextField, MenuItem, type TextFieldProps } from "@mui/material";
import {
  bgColorTopSellers,
  bordasComponents,
  colorOpacity,
  primaryColor,
} from "../../../../theme/theme";

interface BaseSelectOption {
  value: string | number;
  label: string;
}

interface BaseSelectProps extends Omit<TextFieldProps, "select"> {
  height?: number;
  options: BaseSelectOption[];
}

export function BaseSelect({
  height = 56,
  options,
  sx,
  ...props
}: BaseSelectProps) {
  return (
    <TextField
      select
      variant="outlined"
      {...props}
    sx={{
        backgroundColor: bgColorTopSellers,
        borderRadius: 1,
        transition: "0.3s ease",

        "&:hover": {
          boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
          borderColor: "rgba(40, 61, 107, 0.9)",
        },

        "& .MuiOutlinedInput-root": {
          height,
          backgroundColor: bgColorTopSellers,
          color: "#fff",
          borderRadius: 1
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: bordasComponents,borderRadius: 1
        },

        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
          borderRadius: 1
        },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${primaryColor}`,
          boxShadow: "0 0 0 3px rgba(245,159,10,0.25)",
        },

        "& .MuiSelect-select": {
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 14,
          color: "#fff",
        },

        "& .MuiSvgIcon-root": {
          color: colorOpacity,
        },

        "&.Mui-disabled .MuiSelect-select": {
          color: colorOpacity,
          WebkitTextFillColor: colorOpacity,
        },

        "& .MuiFormHelperText-root": {
          color: colorOpacity,
        },

        ...sx,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}