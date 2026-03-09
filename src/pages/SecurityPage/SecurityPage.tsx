import { useState, type ChangeEvent } from "react";
import { Button, Typography, Box, Alert, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/hooks";
import { updateProfile } from "../../authRedux/authTrunk";
import { ROUTE } from "../../routes";
import { AuthLayout } from "../AuthLayout/AuthLayout";

export const SecurityPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = password.length >= 6 && passwordsMatch;

  const handleSubmit = async () => {
    if (!user?.id || !canSubmit) return;

    try {
      await dispatch(
        updateProfile({ userId: user.id, password })
      ).unwrap();
      navigate(ROUTE.PROFILE());
    } catch {
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => navigate(ROUTE.PROFILE())}
          sx={{ color: "text.primary" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>
      <AuthLayout title="Security">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Change your password. Use at least 6 characters.
        </Typography>
        <PasswordInput
          label="New password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <PasswordInput
          label="Confirm new password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        {password.length > 0 && password.length < 6 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Password must be at least 6 characters
          </Alert>
        )}
        {password.length > 0 && confirmPassword.length > 0 && !passwordsMatch && (
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
          disabled={loading || !canSubmit}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Change password"}
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate(ROUTE.PROFILE())}
            sx={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Cancel
          </Typography>
        </Box>
      </AuthLayout>
    </Box>
  );
};
