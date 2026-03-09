import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ROUTE } from "../../routes";
import { AppBottomNav } from "../../components/AppBottomNav/AppBottomNav";

const FAQ: { question: string; answer: string }[] = [
  {
    question: "Как добавить трату?",
    answer:
      "Перейдите в раздел «Wallet» (Кошелёк), выберите категорию и нажмите на неё. Заполните форму: сумма, дата и при необходимости заметка.",
  },
  {
    question: "Как изменить пароль?",
    answer:
      "В профиле нажмите «Security» (Безопасность). Введите новый пароль и подтвердите его, затем нажмите «Change password».",
  },
  {
    question: "Где смотреть траты за день или месяц?",
    answer:
      "На главной странице переключайте табы «Ежедневно», «Еженедельно» и «Ежемесячно» — список трат и статистика обновятся за выбранный период.",
  },
  {
    question: "Что значит «Можно ещё потратить»?",
    answer:
      "Это ваш текущий баланс: разница между доходами и расходами. Прогресс-бар показывает, какая доля уже потрачена от суммы доступных средств.",
  },
  {
    question: "Как сменить тему (светлая/тёмная)?",
    answer:
      "На любой странице в правом верхнем углу нажмите на иконку солнца или луны — тема переключится и сохранится при следующем входе.",
  },
];

export const HelpPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        background: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Box
        sx={(theme) => ({
          background: theme.finwise.headerGradient,
          color: theme.palette.common.white,
          px: 2,
          py: 3,
        })}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            sx={{ color: "inherit" }}
            onClick={() => navigate(ROUTE.PROFILE())}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography fontSize={22} fontWeight={700}>
            Help
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ответы на частые вопросы. Нажмите на вопрос, чтобы увидеть ответ.
        </Typography>
        <Stack spacing={1}>
          {FAQ.map((item, index) => (
            <Box
              key={index}
              sx={(theme) => ({
                background: theme.palette.background.paper,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              })}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography fontWeight={500}>{item.question}</Typography>
                {openIndex === index ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </Stack>
              <Collapse in={openIndex === index}>
                <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.answer}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Stack>
      </Box>

      <AppBottomNav />
    </Box>
  );
};
