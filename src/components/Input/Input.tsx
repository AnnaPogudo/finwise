import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

interface AuthInputProps extends Omit<TextFieldProps, "label"> {
  label?: string;
}

export const AuthInput = ({ label, ...rest }: AuthInputProps) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    margin="normal"
    {...rest}
  />
);
