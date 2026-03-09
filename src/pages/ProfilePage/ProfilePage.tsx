import type { ReactNode } from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useThemeMode } from "../../useThemeMode";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/useAppDispatch";
import { logout } from "../../authRedux/authSlice";
import { ROUTE } from "../../routes";
import { AppBottomNav } from "../../components/AppBottomNav/AppBottomNav";

const menuItems: {
  icon: ReactNode;
  label: string;
  action?: "edit" | "security" | "help" | "logout";
}[] = [
  { icon: <PersonIcon />, label: "Edit Profile", action: "edit" },
  { icon: <SecurityIcon />, label: "Security", action: "security" },
  { icon: <HelpOutlineIcon />, label: "Help", action: "help" },
  { icon: <LogoutIcon />, label: "Logout", action: "logout" },
];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mode, toggleTheme } = useThemeMode();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Box
      sx={(theme) => ({
        background: theme.finwise.headerGradient,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      })}
    >
      <Box
        sx={(theme) => ({
          px: 2,
          py: 8,
          position: "relative",
          color: theme.palette.common.white,
        })}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton sx={{ color: "inherit" }} onClick={() => navigate(ROUTE.HOME())}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography fontSize={22} fontWeight={700}>
            Profile
          </Typography>
          <IconButton sx={{ color: "inherit" }} onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: -40,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <Avatar
            src={user?.profileImage || "/default-avatar.svg"}
            sx={{ width: 120, height: 120, mx: "auto" }}
          />
          <Typography fontWeight={600} color="white">
            {user?.fullName || "User"}
          </Typography>
            {user?.email && (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {user.email}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          flex: 1,
          backgroundColor: theme.palette.background.paper,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          py: 10,
          px: 3,
          mt: 6,
        })}
      >

        <Stack spacing={4}>
          {menuItems.map((item, index) => {
            const handleClick = () => {
              if (item.action === "edit") navigate(ROUTE.PROFILE_EDIT());
              if (item.action === "security") navigate(ROUTE.PROFILE_SECURITY());
              if (item.action === "help") navigate(ROUTE.PROFILE_HELP());
              if (item.action === "logout") {
                dispatch(logout());
                navigate(ROUTE.WELCOME_PAGE());
              }
            };
            const clickable = !!item.action;
            return (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={3}
                onClick={clickable ? handleClick : undefined}
                sx={{
                  cursor: clickable ? "pointer" : "default",
                  "&:hover": clickable ? { opacity: 0.85 } : {},
                }}
              >
                <Box
                  sx={(theme) => ({
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    background: theme.finwise.iconBoxGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flexShrink: 0,
                  })}
                >
                  {item.icon}
                </Box>

                <Typography fontSize={18} fontWeight={500} color="text.primary">
                  {item.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <AppBottomNav />
    </Box>
  );
};
