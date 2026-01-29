import { Box, Typography, TextField, type TextFieldProps } from "@mui/material";
import type { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { colorOpacity } from "../../../../theme/theme";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  rules?: RegisterOptions;
}

export function FormTextField({
  label,
  name,
  register,
  errors,
  sx,
  rules,
  ...rest
}: FormTextFieldProps) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={1}>
      <Typography fontWeight={300} fontSize="1rem" color="white">
        {label}
      </Typography>

      <TextField
       {...register(name, rules)}
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{
          ...sx,
          "& .MuiInputBase-input": {
            color: "#fff",
          },
          "& input::placeholder": {
            color: colorOpacity,
          },
        }}
        {...rest}
      />
    </Box>
  );
}