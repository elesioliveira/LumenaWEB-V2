import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents, colorOpacity } from "../../../theme/theme";
import {  User2 } from "lucide-react";
import { CurrentWalletTabEnum } from "./enums/WalletEnums";
import { div } from "framer-motion/m";
import { MovimentacaoWalletTab } from "./FluxoCaixaTab";
import { ContasPagarTab } from "./ContasPagarTab";
import { ContasReceberTab } from "./ContasReceberTab";

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
        return <div>Categorias</div>;
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
  pl:2.5,
  // SCROLL ÚNICO AQUI
  overflowY: "auto",
  overflowX: "hidden",

  // ESSENCIAL para Flexbox
  minHeight: 0,
  }}
  >
  <Toolbar></Toolbar>
  <Typography fontWeight={600} color={"white"} fontSize={"1.8rem"} mt={4} ml={2}>
    Financeiro
  </Typography>
  <Typography fontWeight={300} color={colorOpacity} fontSize={"1.2rem"} mt={0} ml={2}>
   Gerencie suas finanças, contas a pagar e receber
  </Typography>
  <Stack
  direction="row"
  flexGrow={1}
  gap={5}
  ml={2}
  height={100}
  sx={{
  borderBottom: bordasComponents,
  mb: 3,
  }}
  >
{currentPageStock.map((item) => {
  const isActive = item.page === currentPage;

  return (
    <Box
      key={item.label}
      onClick={() => handleOnChagentPage(item.page)}
      sx={{
        width: 150,
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