import { Box, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, children }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        background:
          theme.palette.mode === "light"
            ? `linear-gradient(180deg, ${theme.palette.primary.main} 40%, #e0efea 40%)`
            : `linear-gradient(180deg, #021c17 40%, ${theme.palette.background.default} 40%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      })}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
          color="text.primary"
        >
          {title}
        </Typography>

        <Box
          sx={(theme) => ({
            background: theme.palette.background.paper,
            padding: 4,
            borderRadius: 3,
            boxShadow: theme.shadows[2],
          })}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
