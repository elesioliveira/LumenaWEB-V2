import { useEffect, useRef, useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents } from "../../../theme/theme";
import { ClipboardList, Plus } from "lucide-react";
import { CurrentSaleViewEnum } from "./enums/SalesEnums";
import { OrderSalePage } from "./OrderSalesPage";
import { NewSalePage } from "./NewSalePage";
import { useSales } from "./provider/SalesProvider";

const currentPageStock = [
  {
    label: "Pedidos",
    icon: ClipboardList,
    page: CurrentSaleViewEnum.Order,
  },
  {
    label: "Novo pedido",
    icon: Plus,
    page: CurrentSaleViewEnum.NewSale,
  },
 
];

export function ModuleSales() {
const { currentPage, onChangedCurrentPage } = useSales();
const jaCarregouRef = useRef(false);
  const currentPageView = () => {
    switch (currentPage) {
      case CurrentSaleViewEnum.Order:
        return <OrderSalePage />;
      case CurrentSaleViewEnum.NewSale:
        return <NewSalePage />;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentSaleViewEnum) => {
  onChangedCurrentPage(page);
};

useEffect(() => {
   if (jaCarregouRef.current) return;
    jaCarregouRef.current = true;
    handleOnChagentPage(CurrentSaleViewEnum.Order);
}, []);

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