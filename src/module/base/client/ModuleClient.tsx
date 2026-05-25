import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents } from "../../../theme/theme";
import { useResponsive } from "../../../shared/useResponsive";
import {  User2 } from "lucide-react";
import { CurrentClientPageEnum } from "./enum/enums";
import { ClientPage } from "./ClientPage";
import { GroupClient } from "./GroupClientPage";

const currentPageStock = [
  {
    label: "Clientes",
    icon: User2,
    page: CurrentClientPageEnum.Client,
  },
  {
    label: "Grupo de clientes",
    icon: User2,
    page: CurrentClientPageEnum.GroupClient,
  },
];

export function ModuleClient() {
const { isMobile } = useResponsive();
const [currentPage, setPage] = useState<CurrentClientPageEnum>(
CurrentClientPageEnum.Client
);

  const currentPageView = () => {
    switch (currentPage) {
      case CurrentClientPageEnum.Client:
        return <ClientPage/>;
      case CurrentClientPageEnum.GroupClient:
        return <GroupClient/>;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentClientPageEnum) => {
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
  <Stack
  direction="row"
  flexGrow={1}
  gap={{ xs: 2, md: 5 }}
  ml={{ xs: 0, md: 2 }}
  height={{ xs: 60, md: 100 }}
  mt={2}
  sx={{
  borderBottom: bordasComponents,
  mb: 3,
  overflowX: "auto",
  "&::-webkit-scrollbar": { display: "none" },
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