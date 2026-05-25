import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents, colorOpacity } from "../../../theme/theme";
import { useResponsive } from "../../../shared/useResponsive";
import {  User2 } from "lucide-react";
import { CurrentWalletTabEnum } from "./enums/WalletEnums";
import { div } from "framer-motion/m";
import { MovimentacaoWalletTab } from "./FluxoCaixaTab";
import { ContasPagarTab } from "./ContasPagarTab";
import { ContasReceberTab } from "./ContasReceberTab";
import { CategoriaTab } from "./CategoriasTab";

const currentPageStock = [
  {
    label: "Fluxo de Caixa",
    page: CurrentWalletTabEnum.FluxoCaixa,
  },
  {
    label: "Contas a Pagar",
    page: CurrentWalletTabEnum.ContasPagar,
  },
  {
    label: "Contas a Receber",
    page: CurrentWalletTabEnum.ContasReceber,
  },
  {
    label: "Categorias",
    page: CurrentWalletTabEnum.Categorias,
  },
];

export function ModuleWallet() {
const { isMobile } = useResponsive();
const [currentPage, setPage] = useState<CurrentWalletTabEnum>(CurrentWalletTabEnum.FluxoCaixa);

  const currentPageView = () => {
    switch (currentPage) {
      case CurrentWalletTabEnum.FluxoCaixa:
        return <MovimentacaoWalletTab/>;
      case CurrentWalletTabEnum.ContasPagar:
        return <ContasPagarTab/>;
      case CurrentWalletTabEnum.ContasReceber:
        return <ContasReceberTab/>;
      case CurrentWalletTabEnum.Categorias:
        return <CategoriaTab/>;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentWalletTabEnum) => {
  setPage(page);
};

    return (
  <Box
  component="main"
  sx={{
  flexGrow: 1,
  bgcolor: bgView,
  flexDirection:"column",
  pl: { xs: 1, md: 2.5 },
  overflowY: "auto",
  overflowX: "hidden",
  minHeight: 0,
  }}
  >
  <Toolbar></Toolbar>
  <Typography fontWeight={600} color={"white"} fontSize={{ xs: "1.4rem", md: "1.8rem" }} mt={4} ml={2}>
    Financeiro
  </Typography>
  <Typography fontWeight={300} color={colorOpacity} fontSize={{ xs: "0.9rem", md: "1.2rem" }} mt={0} ml={2}>
   Gerencie suas finanças, contas a pagar e receber
  </Typography>
  <Stack
  direction="row"
  flexGrow={1}
  gap={{ xs: 2, md: 5 }}
  ml={{ xs: 0, md: 2 }}
  height={{ xs: 60, md: 100 }}
  sx={{
  borderBottom: bordasComponents,
  mb: 3,
  overflowX: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  }}
  >
{currentPageStock.map((item) => {
  const isActive = item.page === currentPage;

  return (
    <Box
      key={item.label}
      onClick={() => handleOnChagentPage(item.page)}
      sx={{
        minWidth: { xs: "auto", md: 150 },
        px: { xs: 2, md: 0 },
        height: "100%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transition: "0.25s ease",

        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: isActive ? "100%" : "0%",
          height: "2px",
          background:
            "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
          transition: "0.25s ease",
        },

        "&:hover::after": {
          width: "100%",
          transform: "translateY(-1px)",
        },
      }}
    >
        <Typography
          fontSize="0.95rem"
          fontWeight={isActive ? 600 : 400}
          color={isActive ? "#fff" : "#94a3b8"}
          whiteSpace="nowrap"
        >
          {item.label}
        </Typography>
    </Box>
  );
})}

  </Stack>
  {currentPageView()}
  </Box>
    );
}