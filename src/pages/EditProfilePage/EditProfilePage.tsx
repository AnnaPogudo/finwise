import { useState, type ChangeEvent } from "react";
import {
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  Avatar,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AuthInput } from "../../components/Input/Input";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storage/hooks//useAppDispatch";
import { updateProfile } from "../../authRedux/authThunk";
import { ROUTE } from "../../routes";
import { AuthLayout } from "../AuthLayout/AuthLayout";

export const EditProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentAvatar = user?.profileImage || "";
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar);
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const hasChanges =
    phone !== (user?.phone ?? "") ||
    email !== (user?.email ?? "") ||
    (avatarUrl.trim() !== "" && avatarUrl !== currentAvatar);

  const handleSubmit = async () => {
    if (!user?.id) return;

    try {
      await dispatch(
        updateProfile({
          userId: user.id,
          ...(phone !== (user.phone ?? "") && { phone }),
          ...(email !== user.email && { email }),
          ...(avatarUrl.trim() !== "" && avatarUrl !== user?.profileImage && {
            profileImage: avatarUrl,
          }),
        }),
      ).unwrap();
      navigate(ROUTE.PROFILE());
    } catch {
      console.error("Profile update failed");
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
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent:"center", flexDirection:"column" }}>
        <Avatar
          src={(avatarUrl || user?.profileImage) || "/default-avatar.svg"}
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
