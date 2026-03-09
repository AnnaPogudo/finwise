import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  Avatar,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useThemeMode } from "../../useThemeMode";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/hooks";
import { fetchTransactions } from "../../transactionsRedux/transactionsTrunk";
import { AppBottomNav } from "../../components/AppBottomNav/AppBottomNav";
import type { Transaction } from "../../enums/typeResponse";
import { categoryConfig } from "../../constants/categoriesConfig";
import {
  filterByPeriod,
  type PeriodTab,
} from "../../utils/dateFilters";

const EMPTY_EXPENSES_MESSAGE = "Вы пока не записали свои траты";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${time} · ${date}`;
}

function getCategoryLabel(categoryId: string): string {
  const cat = categoryConfig[categoryId as keyof typeof categoryConfig];
  return cat?.label ?? categoryId;
}

function getCategoryIcon(categoryId: string) {
  const cat = categoryConfig[categoryId as keyof typeof categoryConfig];
  return cat?.icon ?? <PaymentsIcon />;
}

const FinanceDashboard: React.FC = () => {
  const [tab, setTab] = useState<PeriodTab>(2);
  const { mode, toggleTheme } = useThemeMode();
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    if (!items.length) {
      void dispatch(fetchTransactions());
    }
  }, [dispatch, items.length]);

  const periodItems = filterByPeriod(items, tab);
  const sortedExpenses = periodItems
    .filter((t) => t.amount < 0)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const totalAmount = items.reduce((sum, t) => sum + t.amount, 0);
  const totalExpensesAll = items
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalForBarAll = totalExpensesAll + Math.max(0, totalAmount);
  const spendingPercentAll =
    totalForBarAll > 0
      ? Math.min(100, (totalExpensesAll / totalForBarAll) * 100)
      : 0;

  return (
    <Box
      sx={(theme) => ({
        margin: "0 auto",
        backgroundColor: theme.palette.background.default,
        display: "grid",
        minHeight: "100vh",
        gridTemplateRows: "auto auto 1fr auto",
      })}
    >
      <Box
        sx={(theme) => ({
          background: theme.finwise.headerGradient,
          color: theme.palette.common.white,
          p: 3,
        })}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Hi, Welcome Back
            </Typography>
            <Typography variant="body2">Good Morning</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton sx={{ color: "inherit" }} onClick={toggleTheme}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <Box>
            <Typography variant="body2">Total Balance</Typography>
            <Typography variant="h5" fontWeight={700}>
              <img
                src="/UpPrice.svg"
                alt=""
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              {totalAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255,255,255,0.3)" }}
          />
          <Box>
            <Typography variant="body2">Total Expense</Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: "text.primary" }}>
              <img
                src="/LowPrice.svg"
                alt=""
                style={{ width: 20, height: 20, marginRight: 5 }}
              />
              -
              {totalExpensesAll.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Можно ещё потратить:{" "}
            {totalAmount > 0
              ? totalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "0"}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={loading ? 0 : spendingPercentAll}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.3)",
              mt: 0.5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ px: 2, pt: 2 }}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <Tab label="Ежедневно" />
          <Tab label="Еженедельно" />
          <Tab label="Ежемесячно" />
        </Tabs>
      </Box>

      <Stack spacing={2} sx={{ p: 2, flex: 1, overflow: "auto" }}>
        {loading ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            Загрузка...
          </Typography>
        ) : sortedExpenses.length === 0 ? (
          <Typography
            color="text.secondary"
            textAlign="center"
            py={4}
            px={2}
          >
            {EMPTY_EXPENSES_MESSAGE}
          </Typography>
        ) : (
          sortedExpenses.map((t) => (
            <TransactionCard key={t.id} transaction={t} />
          ))
        )}
      </Stack>

      <AppBottomNav />
    </Box>
  );
};

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const label = getCategoryLabel(transaction.categoryId);
  const icon = getCategoryIcon(transaction.categoryId);
  const amount = transaction.amount;
  const isExpense = amount < 0;

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent sx={{ py: 1.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "action.hover" }}>
            {icon}
          </Avatar>
          <Box flex={1}>
            <Typography fontWeight={600}>{label}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(transaction.date)}
            </Typography>
          </Box>
          <Typography
            fontWeight={600}
            color={isExpense ? "error.main" : "primary.main"}
          >
            {isExpense ? "-" : ""}
            {Math.abs(amount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default FinanceDashboard;
