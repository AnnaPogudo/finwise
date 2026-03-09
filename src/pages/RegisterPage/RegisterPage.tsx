import { useState } from "react";
import { Button, Typography, Box, Alert, Avatar, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { AuthInput } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/useAppDispatch";
import { register } from "../../authRedux/authThunk";
import { ROUTE } from "../../routes";

export const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const passwordsMismatch =
    password !== "" && confirmPassword !== "" && password !== confirmPassword;

  const handleSignUp = async () => {
    if (passwordsMismatch) return;

    try {
      await dispatch(
        register({ fullName, email, password, phone, profileImage: avatarUrl || undefined })
      ).unwrap();
      navigate(ROUTE.HOME());
    } catch {
      console.error("Registration failed");
    }
  };

  return (
    <AuthLayout title="Create Account">
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent:"center", flexDirection:"column" }}>
        <Avatar
          src={avatarUrl || "/default-avatar.svg"}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <TextField
          label="Avatar URL"
          variant="outlined"
          size="small"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/avatar.png"
        />
      </Box>

      <AuthInput
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <AuthInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput label="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <AuthInput label="Date Of Birth" />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {passwordsMismatch && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Passwords do not match
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, py: 1.5, borderRadius: 5, textTransform: "none" }}
        disabled={
          loading ||
          !fullName ||
          !email ||
          !password ||
          !confirmPassword ||
          passwordsMismatch
        }
        onClick={handleSignUp}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>

      <Box textAlign="center" mt={3}>
        <Typography>
          Already have an account? <Link to="/login">Log In</Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};