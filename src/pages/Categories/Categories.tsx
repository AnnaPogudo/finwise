import { useEffect } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import KeyIcon from "@mui/icons-material/Key";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SavingsIcon from "@mui/icons-material/Savings";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { fetchTransactions } from "../../transactionsRedux/transactionsTrunk";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storage/hooks/useAppDispatch";
import { useThemeMode } from "../../useThemeMode";
import { AppBottomNav } from "../../components/AppBottomNav/AppBottomNav";
import { ROUTE } from "../../routes";

export const Categories = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    if (!items.length) {
      void dispatch(fetchTransactions());
    }
  }, [dispatch, items.length]);

  const totalAmount = items.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = items
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const categories = [
    { id: "salary", label: "Salary", icon: <AccountBalanceWalletIcon /> },
    { id: "food", label: "Food", icon: <RestaurantIcon /> },
    { id: "transport", label: "Transport", icon: <DirectionsBusIcon /> },
    { id: "medicine", label: "Medicine", icon: <MedicationIcon /> },
    { id: "groceries", label: "Groceries", icon: <LocalGroceryStoreIcon /> },
    { id: "rent", label: "Rent", icon: <KeyIcon /> },
    { id: "gifts", label: "Gifts", icon: <CardGiftcardIcon /> },
    { id: "savings", label: "Savings", icon: <SavingsIcon /> },
    {
      id: "entertainment",
      label: "Entertainment",
      icon: <ConfirmationNumberIcon />,
    },
  ];
  return (
    <Box
      sx={(theme) => ({
        margin: "0 auto",
        minHeight: "100vh",
        background: theme.finwise.headerGradient,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Box
        sx={(theme) => ({ px: 3, pt: 4, color: theme.palette.common.white })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            sx={{ color: "inherit" }}
            onClick={() => navigate(ROUTE.HOME())}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography fontWeight={600} fontSize={18}>
            Categories
          </Typography>
          <IconButton sx={{ color: "inherit" }} onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <Box>
            <Typography fontSize={12}>Total Balance</Typography>
            <Typography fontWeight={700} fontSize={20}>
              {totalAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 1,
              height: 40,
            }}
          />

          <Box textAlign="right">
            <Typography fontSize={12}>Total Expense</Typography>
            <Typography
              fontWeight={700}
              fontSize={20}
              sx={{ color: "text.primary" }}
            >
              -
              {totalExpenses.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={(theme) => ({
          mt: 4,
          background: theme.palette.background.paper,
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          p: 4,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 3,
        })}
      >
        {categories.map((cat) => {
          return (
            <Box
              key={cat.label}
              onClick={() => {
                navigate(`/home/add/${cat.id}`);
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={(theme) => ({
                  width: 72,
                  height: 72,
                  margin: "0 auto",
                  borderRadius: 2,
                  background: theme.finwise.iconBoxGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mb: 1,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 2,
                  },
                })}
              >
                {cat.icon}
              </Box>
              <Typography fontSize={13} color="text.primary">
                {cat.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <AppBottomNav />
    </Box>
  );
};
