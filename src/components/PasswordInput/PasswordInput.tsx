import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import type { TextFieldProps } from "@mui/material/TextField";

interface PasswordInputProps extends Omit<TextFieldProps, "type"> {
  label: string;
}

export const PasswordInput = ({ label, ...rest }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      fullWidth
      variant="outlined"
      type={show ? "text" : "password"}
      label={label}
margin="normal"
    {...rest}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disableRipple
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
