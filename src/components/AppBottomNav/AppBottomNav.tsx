import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const ROUTES = ["/home", "/home/categories", "/home/profile"] as const;

function getNavValue(pathname: string): number {
  if (pathname.startsWith("/home/profile")) return 2;
  if (pathname.startsWith("/home/categories")) return 1;
  return 0;
}

export const AppBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navValue = getNavValue(location.pathname);

  return (
    <BottomNavigation
      value={navValue}
      onChange={(_, newValue) => navigate(ROUTES[newValue])}
      showLabels
      sx={{
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Wallet" icon={<LayersIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonOutlineIcon />} />
    </BottomNavigation>
  );
};
