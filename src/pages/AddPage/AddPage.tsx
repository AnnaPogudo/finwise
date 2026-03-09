import { useState, type ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Paper,
  IconButton,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate, useParams } from "react-router-dom";
import { categoryConfig } from "../../config/categoriesConfig";
import { useAppDispatch, useAppSelector } from "../../storage/hooks/useAppDispatch";
import { addTransaction } from "../../transactionsRedux/transactionsTrunk";
import type { TransactionType } from "../../enums/typeResponse";
import { ROUTE } from "../../routes";

const CATEGORY_IDS = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

const AddPage = () => {
  const { categoryId: categoryIdParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isValidCategory =
    categoryIdParam && CATEGORY_IDS.includes(categoryIdParam as keyof typeof categoryConfig);

  const isIncomeCategory = categoryIdParam === "income";
  const [transactionType, setTransactionType] = useState<TransactionType>(
    isIncomeCategory ? "deposit" : "payment"
  );
  const [categoryId, setCategoryId] = useState<string>(
    isValidCategory ? categoryIdParam! : "food"
  );
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const category = categoryConfig[categoryId as keyof typeof categoryConfig];

  const amountNum = Math.abs(parseFloat(amount) || 0);
  const canSubmit =
    user?.id &&
    amountNum > 0 &&
    date &&
    (transactionType === "deposit" || transactionType === "payment");

  const handleSubmit = async () => {
    if (!canSubmit || !user?.id) return;
    setError(null);
    setLoading(true);
    const value = transactionType === "deposit" ? amountNum : -amountNum;
    try {
      await dispatch(
        addTransaction({
          userId: user.id,
          categoryId,
          amount: value,
          type: transactionType,
          date: new Date(date).toISOString(),
          note: note.trim() || undefined,
        })
      ).unwrap();
      navigate(ROUTE.CATEGORIES());
    } catch {
      setError("Не удалось сохранить операцию");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        background: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
      })}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 480, overflow: "hidden" }}
      >
        <Box
          sx={(theme) => ({
            background: theme.finwise.headerGradient,
            color: "white",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          })}
        >
          <Box>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {category?.icon}
              </Box>
            </Box>

            <Typography variant="h5" fontWeight={700}>
              {transactionType === "deposit"
                ? "Пополнение"
                : "Трата"}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              {transactionType === "deposit"
                ? "Добавьте доход (зарплата, подарок и т.д.)"
                : "Запишите расход по выбранной категории"}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            FinWise
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Тип операции
          </Typography>
          <ToggleButtonGroup
            value={transactionType}
            exclusive
            onChange={(_, newType: TransactionType | null) => {
              if (newType) {
                setTransactionType(newType);
                if (newType === "deposit") setCategoryId("income");
              }
            }}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="payment">
              <TrendingDownIcon sx={{ mr: 1 }} />
              Трата
            </ToggleButton>
            <ToggleButton value="deposit">
              <TrendingUpIcon sx={{ mr: 1 }} />
              Пополнение
            </ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Данные операции
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Сумма"
              type="number"
              // inputProps={{ min: 0 }}
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              fullWidth
              required
            />

            <TextField
              select
              label="Категория"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              fullWidth
            >
              {transactionType === "deposit" ? (
                <MenuItem value="income">
                  {categoryConfig.income.label}
                </MenuItem>
              ) : (
                CATEGORY_IDS.filter((id) => id !== "income").map((id) => (
                  <MenuItem key={id} value={id}>
                    {categoryConfig[id].label}
                  </MenuItem>
                ))
              )}
            </TextField>

            <TextField
              label="Дата"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              // InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Заметка (необязательно)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              multiline
              maxRows={2}
            />
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Отмена
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
            >
              {loading ? "Сохранение…" : "Сохранить"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddPage;
