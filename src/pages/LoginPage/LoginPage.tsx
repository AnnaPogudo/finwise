import { useState, type ChangeEvent } from "react";
import { Button, Typography, Box, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { AuthInput } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/useAppDispatch";
import { login } from "../../authRedux/authThunk";
import { ROUTE } from "../../routes";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(ROUTE.HOME());
    } catch {
      console.error("Login failed");
    }
  };

  return (
    <AuthLayout title="Welcome">
      <AuthInput
        label="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, py: 1.5, borderRadius: 5, textTransform: "none" }}
        disabled={loading || !email || !password}
        onClick={handleLogin}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>

      <Box textAlign="center" mt={3}>
        <Typography>
          Don’t have an account?
          <Link to="/register">Sign Up</Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};
