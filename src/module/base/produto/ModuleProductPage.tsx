import { useState } from "react";
import { CurrentSubModuleProduct } from "../home/enums/HomeEnums";
import { ProdutoPage } from "./produto/ProdutoPage";
import { FornecedorPage } from "./fornecedor/Page";
import { CategoriaPage } from "./categoria/Page";
import { MarkPage } from "./marca/Page";
import { CanalVendaPage } from "./canalVenda/CanalVendaPage";
import { EntregaPage } from "./entrega/EntregaPage";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents } from "../../../theme/theme";
import { Layers, Package, ShoppingCart, Tag, Truck, Users2 } from "lucide-react";

const subModulesProduct = [
  {
    label: "Produto",
    icon: Package,
    page: CurrentSubModuleProduct.Product,
  },
  {
    label: "Fornecedor",
    icon: Users2,
    page: CurrentSubModuleProduct.supplier,
  },
  {
    label: "Categoria",
    icon: Layers,
    page: CurrentSubModuleProduct.Category,
  },
  {
    label: "Marca",
    icon: Tag,
    page: CurrentSubModuleProduct.Mark,
  },
  {
    label: "Canal de Venda",
    icon: ShoppingCart,
    page: CurrentSubModuleProduct.SalesChannel,
  },
  {
    label: "Entrega",
    icon: Truck,
    page: CurrentSubModuleProduct.Delivery,
  },
];

export function ModuleProduct() {
const [currentPage, setPage] = useState<CurrentSubModuleProduct>(
CurrentSubModuleProduct.Product
);

  const currentPageView = () => {
    switch (currentPage) {
      // case CurrentPageHome.Product:
      //   return <ProductPage />;
      case CurrentSubModuleProduct.Product:
        return <ProdutoPage />;
      case CurrentSubModuleProduct.supplier:
        return <FornecedorPage />;
      case CurrentSubModuleProduct.Category:
        return <CategoriaPage />;
      case CurrentSubModuleProduct.Mark:
        return <MarkPage />;
      case CurrentSubModuleProduct.SalesChannel:
        return <CanalVendaPage />;
      case CurrentSubModuleProduct.Delivery:
        return <EntregaPage />;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentSubModuleProduct) => {
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
{subModulesProduct.map((item) => {
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