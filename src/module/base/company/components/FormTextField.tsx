import { Box, Typography, TextField, type TextFieldProps } from "@mui/material";
import { type UseFormRegisterReturn } from "react-hook-form";
import { bgColorTopSellers, bordasComponents, colorOpacity, primaryColor } from "../../../../theme/theme";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  label: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  row?: number | null;
}

export function FormTextField({
  label,
  required = false,
  register,
  row,
  ...textFieldProps
}: FormTextFieldProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography fontWeight={300} color="white" fontSize="1rem">
        {label}
        {required }
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={row??1}
        {...register}
        {...textFieldProps}
            sx={{
            // INPUT ROOT
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
            flex:2,
            "& .MuiOutlinedInput-root": {
            backgroundColor: bgColorTopSellers, // fundo
          
            //DEFINE AS BORDAS DO TEXTFIELD
            "& .MuiOutlinedInput-notchedOutline": {
                border: bordasComponents,
            },
            // HOVER
            "&:hover fieldset": {
            borderColor: primaryColor,
            },
        
            // FOCUS
            "&.Mui-focused fieldset": {
            borderColor: primaryColor,
            borderWidth: 2,
            },
            },
        
            // TEXTO DO INPUT
            "& input": {
            color: "#fff",
            fontSize: "0.9rem",
            },
        
            // PLACEHOLDER
            "& input::placeholder": {
            color: colorOpacity,
            opacity: 1,
            },
            }}
      />
    </Box>
  );
}