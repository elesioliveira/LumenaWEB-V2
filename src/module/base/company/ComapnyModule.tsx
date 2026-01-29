import { useState } from "react";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { bgView, bordasComponents, colorOpacity } from "../../../theme/theme";
import {  Building2, User2 } from "lucide-react";
import { div } from "framer-motion/m";
import { CurrentTabCompany } from "./enums/ComapanyEnums";
import { DetailsCompanyTab } from "./pages/DetailsCompanyTab";
import { UsersTab } from "./pages/UsersTab";

const currentPageStock = [
  {
    label: "Dados da Empresa",
    page: CurrentTabCompany.DetailsCompany,
    icon: <Building2/>
  },
  {
    label: "Usuários",
    page: CurrentTabCompany.Users,
    icon: <User2/>
  },
];

export function ModuleCompany() {
const [currentPage, setPage] = useState<CurrentTabCompany>(CurrentTabCompany.DetailsCompany);

  const currentPageView = () => {
    switch (currentPage) {
      case CurrentTabCompany.DetailsCompany:
        return <DetailsCompanyTab/>
      case CurrentTabCompany.Users:
        return <UsersTab/>;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentTabCompany) => {
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
        <Stack display={"flex"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"} gap={1}>
        {item.icon}
        <Typography fontSize="1rem" fontWeight={isActive ? 600 : 400} color={isActive ? "#fff" : "#94a3b8"} whiteSpace="nowrap">
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