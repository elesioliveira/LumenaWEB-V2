import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents } from "../../../theme/theme";
import { ClipboardList, FileInput, FileOutput } from "lucide-react";
import { CurrentFornecedorPage } from "./enum/enums";
import { MovimentPage } from "./MovimentPage";
import { EntradaEstoque } from "./EntradaEstoquePage";
import { SaidaEstoque } from "./SaidaEstoquePage";

const currentPageStock = [
  {
    label: "Movimentação",
    icon: ClipboardList,
    page: CurrentFornecedorPage.Movimemovement,
  },
  {
    label: "Entrada de nota",
    icon: FileInput,
    page: CurrentFornecedorPage.Entry,
  },
  {
    label: "Saída de Estoque",
    icon: FileOutput,
    page: CurrentFornecedorPage.Output,
  },
 
];

export function StockPage() {
const [currentPage, setPage] = useState<CurrentFornecedorPage>(
CurrentFornecedorPage.Movimemovement
);

  const currentPageView = () => {
    switch (currentPage) {
      // case CurrentPageHome.Product:
      //   return <ProductPage />;
      case CurrentFornecedorPage.Movimemovement:
        return <MovimentPage />;
      case CurrentFornecedorPage.Entry:
        return <EntradaEstoque />;
      case CurrentFornecedorPage.Output:
        return <SaidaEstoque />;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentFornecedorPage) => {
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
  <Stack
  direction="row"
  flexGrow={1}
  gap={5}
  ml={2}
  height={100}
  mt={2}
  sx={{
  borderBottom: bordasComponents,
  mb: 3,
  }}
  >
{currentPageStock.map((item) => {
  const isActive = item.page === currentPage;
  const Icon = item.icon;

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
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Icon size={18} color={isActive ? "#fff" : "#94a3b8"} />
        <Typography
          fontSize="0.95rem"
          fontWeight={isActive ? 600 : 400}
          color={isActive ? "#fff" : "#94a3b8"}
          whiteSpace="nowrap"
        >
          {item.label}
        </Typography>
      </Stack>
    </Box>
  );
})}

  </Stack>
  {currentPageView()}
  </Box>
    );
}