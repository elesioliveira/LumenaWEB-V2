import { useState } from "react";
import { CurrentSubModuleFiscal } from "./enums/FiscalEnums";
import { CfopPage } from "./cfop/CfopPage";
import { ProdutoFiscalPage } from "./produtoFiscal/ProdutoFiscalPage";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents } from "../../../theme/theme";
import { useResponsive } from "../../../shared/useResponsive";
import { FileText, Link } from "lucide-react";

const subModulesFiscal = [
  {
    label: "CFOP",
    icon: FileText,
    page: CurrentSubModuleFiscal.Cfop,
  },
  {
    label: "Regra Fiscal",
    icon: Link,
    page: CurrentSubModuleFiscal.RegraFiscal,
  },
];

export function ModuleFiscal() {
  const { isMobile } = useResponsive();
  const [currentPage, setPage] = useState<CurrentSubModuleFiscal>(
    CurrentSubModuleFiscal.Cfop
  );

  const currentPageView = () => {
    switch (currentPage) {
      case CurrentSubModuleFiscal.Cfop:
        return <CfopPage />;
      case CurrentSubModuleFiscal.RegraFiscal:
        return <ProdutoFiscalPage />;
      default:
        return null;
    }
  };

  const handleOnChangePage = (page: CurrentSubModuleFiscal) => {
    setPage(page);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: bgView,
        flexDirection: "column",
        pl: { xs: 1, md: 2.5 },
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: 0,
      }}
    >
      <Toolbar></Toolbar>
      <Stack
        direction="row"
        flexGrow={1}
        gap={{ xs: 1, md: 5 }}
        ml={{ xs: 0, md: 2 }}
        height={{ xs: 50, md: 100 }}
        mt={2}
        sx={{
          borderBottom: bordasComponents,
          mb: 3,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {subModulesFiscal.map((item) => {
          const isActive = item.page === currentPage;
          const Icon = item.icon;

          return (
            <Box
              key={item.label}
              onClick={() => handleOnChangePage(item.page)}
              sx={{
                minWidth: { xs: "auto", md: 150 },
                px: { xs: 1.5, md: 0 },
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
