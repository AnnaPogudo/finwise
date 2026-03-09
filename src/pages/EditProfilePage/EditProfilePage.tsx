import { useState, type ChangeEvent } from "react";
import { Button, Typography, Box, Alert, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AuthInput } from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/hooks";
import { updateProfile } from "../../authRedux/authTrunk";
import { ROUTE } from "../../routes";
import { AuthLayout } from "../AuthLayout/AuthLayout";

export const EditProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const hasChanges =
    phone !== (user?.phone ?? "") || email !== (user?.email ?? "");

  const handleSubmit = async () => {
    if (!user?.id) return;

    try {
      await dispatch(
        updateProfile({
          userId: user.id,
          ...(phone !== (user.phone ?? "") && { phone }),
          ...(email !== user.email && { email }),
        })
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
      <AuthLayout title="Edit Profile">
        <AuthInput
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
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
          disabled={loading || !hasChanges}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Save changes"}
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
