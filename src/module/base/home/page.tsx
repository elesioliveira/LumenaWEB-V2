
  import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Bell, Building2, ChartColumn, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, FileText, Headset, LayoutDashboard, LogOut, Menu, Package, ShoppingCart, Truck, User, Users, Wallet, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useResponsive } from "../../../shared/useResponsive";
import { bgComponents, bordasComponents, colorOpacity, } from "../../../theme/theme";
import { useSessionController } from "../../auth/controller/SessionController";
import { AnalysisPage } from "../analysis/AnalysisPage";
import { ModuleClient } from "../client/ModuleClient";
import { ModuleCompany } from "../company/ComapnyModule";
import { DashBoardPage } from "../dashboard/DashBoardPage";
import { ModuleFiscal } from "../fiscal/ModuleFiscalPage";
import { ModuleProduct } from "../produto/ModuleProductPage";
import { ModuleSales } from "../sales/SalesPage";
import { StockPage } from "../stock/StockPage";
import { SupportPage } from "../support/SupportPage";
import { ModuleWallet } from "../wallet/ModuleWallet";
import { CurrentModulePage } from "./enums/HomeEnums";
  
const menuItems = [
  { 
    key: 0,
    label: "Dashboard", 
    icon: LayoutDashboard, 
    page: CurrentModulePage.Dashboard 
  },
  { 
    key: 1,
    label: "Vendas", 
    icon: ShoppingCart, 
    page: CurrentModulePage.Sales 
  },
  { 
    key:2,
     label: "Produto",
     icon: Package, 
     page: CurrentModulePage.Product 
    },
  { 
    key:3,
    label: "Clientes", 
    icon: Users, 
    page: CurrentModulePage.Client 
  },
  { 
    key:4,
    label: "Financeiro", 
    icon: Wallet, 
    page: CurrentModulePage.Financial 
  },
  { 
    key:5,
    label: "Estoque", 
    icon: Truck, 
    page: CurrentModulePage.Stock 
  },
  { 
    key:6,
    label: "Relatórios", 
    icon: ClipboardList, 
    page: CurrentModulePage.Reports 
  },
  { 
    key:7,
    label: "Análise", 
    icon: ChartColumn, 
    page: CurrentModulePage.Analysis 
  },
  { 
    key:8,
    label: "Empresa", 
    icon: Building2, 
    page: CurrentModulePage.Company 
  },
  { 
    key:9,
    label: "Suporte", 
    icon: Headset, 
    page: CurrentModulePage.Support 
  },
  { 
    key:10,
    label: "Fiscal", 
    icon: FileText, 
    page: CurrentModulePage.Fiscal 
  },
  ];




export default function HomePage() {
const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const { isMobile } = useResponsive();
const { user } = useSessionController();
const allowedMenuItems = useMemo(() => {
  if (!user) return [];

  return menuItems.filter((item) =>
    user.rotas.includes(item.key)
  );
}, [user]);
const [currentPage, setPage] = useState<CurrentModulePage>(allowedMenuItems[0].page);
const drawerWidth = isMobile ? 280 : (collapsed ? 80 : 280);


const handleOnChagentPage = (page: CurrentModulePage) => {
  setPage(page);
  if (isMobile) setMobileOpen(false);
};

  const currentModule = () => {
    switch (currentPage) {
      case CurrentModulePage.Product:
        return <ModuleProduct />;
        case CurrentModulePage.Dashboard:
        return <DashBoardPage collapsed={collapsed} onNavigate={handleOnChagentPage} />;
        case CurrentModulePage.Stock:
        return <StockPage/>;
        case CurrentModulePage.Client:
        return <ModuleClient/>;
        case CurrentModulePage.Sales:
        return <ModuleSales/>;
        case CurrentModulePage.Financial:
        return <ModuleWallet/>;
        case CurrentModulePage.Company:
        return <ModuleCompany/>;
        case CurrentModulePage.Analysis:
        return <AnalysisPage/>;
        case CurrentModulePage.Support:
        return <SupportPage/>;
        case CurrentModulePage.Fiscal:
        return <ModuleFiscal/>;
      default:
        return null;
    }
  };
   


  return (
  <Box
  sx={{
  display: "flex",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  }}>

  {/* AppBar */}
  <AppBar position="fixed" sx={{
  background: "#131d34",
  borderRadius: 0,
  p: 0.35,
  border: bordasComponents,
  ...(isMobile && { zIndex: (theme: any) => theme.zIndex.drawer + 1 }),
  }}>
  <Toolbar>
  {isMobile && (
    <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 1, color: "#fff" }}>
      {mobileOpen ? <X size={22} /> : <Menu size={22} />}
    </IconButton>
  )}
  <Stack
  direction="row"
  sx={{
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 2,
  borderRadius: 0,
  }}>
  <Badge badgeContent={4} color="primary">
  <Bell  color={colorOpacity}/>
  </Badge>
  <Divider
  orientation="vertical"
  flexItem
  sx={{
  display:"flex",
  height:"50px",
  border: bordasComponents,
  opacity: 0.7,
  mx: 1,               
  }}/>
  <Avatar
  sx={{
  bgcolor: bgComponents,  // fundo
  width: 45,
  height: 45,
  }}>
  <User size={22} color={colorOpacity} />
  </Avatar>
  <Stack flexDirection={"column"} gap={0} sx={{ display: { xs: "none", sm: "flex" } }}>
  <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"0.8rem"}>
  Elesio Oliveira
  </Typography>
  <Typography gutterBottom variant="body1" component="div" color={colorOpacity}mb={0} mt={0} fontSize={"0.8rem"}>
  Administrador
  </Typography>
  </Stack>
  <Box sx={{ display: "flex", alignItems: "center", ml:1 }}>
  <ChevronDown size={20} color={colorOpacity} />
  </Box>
  </Stack>
  </Toolbar>
  </AppBar>
  
  {/* Drawer lateral */}
  <Drawer
  variant={isMobile ? "temporary" : "permanent"}
  open={isMobile ? mobileOpen : true}
  onClose={() => setMobileOpen(false)}
  ModalProps={{ keepMounted: true }}
  sx={{
  width: isMobile ? 0 : drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  transition: "width 0.3s ease",
  "& .MuiDrawer-paper": {
  width: 280,
  transition: "width 0.3s ease",
  boxSizing: "border-box",
  borderRight: bordasComponents,
  borderRadius: 0,
  backgroundColor: "#0f1729",
  color: (theme) => theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  ...(!isMobile && { width: drawerWidth }),
  },
  }}>
  {/* Logo */}
  {<Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4, px: 2 }}>
  <Box
  sx={{
  width: 45,
  height: 45,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 1,
  background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
  boxShadow: "0 0 25px rgba(245,159,10,0.35)",
  }}
  >
  <Typography variant="h6" fontWeight="bold">
  L
  </Typography>
  </Box>

  {!collapsed && (
  <Box>
  <Typography variant="h6" fontWeight="bold">Lumena</Typography>
  <Typography variant="body2" color={colorOpacity}>
  ERP System
  </Typography>
  </Box>
  )}
  </Box>}
  <Divider sx={{ width: "100%",height:"1px", backgroundColor: "#283d6b", opacity: 0.7}} />
<List sx={{ width: "100%", pl: 2, pr: 2, display: "flex", flexDirection: "column", gap: 2 }}>
  {allowedMenuItems.map((item) => {
    const isActive = item.page === currentPage;
    const Icon = item.icon;

    return (
      <ListItemButton
        key={item.label}
        onClick={() => handleOnChagentPage(item.page)}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderRadius: 1,
          transition: "all 0.25s ease",

          background: isActive
            ? "linear-gradient(to right, #f39b0a 0%, #de6f09 100%)"
            : "transparent",

          borderLeft: isActive
            ? "4px solid #f59f0a"
            : "4px solid transparent",

          "&:hover": {
            background: isActive
              ? "linear-gradient(to right, #f4a51c 0%, #c76007 100%)"
              : "rgba(255,255,255,0.08)",

            borderLeft: isActive
              ? "4px solid #f59f0a"
              : "4px solid rgba(255,255,255,0.3)",
          },
        }}
      >
        {/* Ícone */}
        <Icon
          size={20}
          color={isActive ? "#fff" : "#94a3b8"}
          style={{
            marginRight: collapsed ? 0 : 12,
            filter: isActive
              ? "drop-shadow(0 0 6px rgba(245,159,10,0.9))"
              : "none",
            transition: "all 0.25s ease",
          }}
        />

        {!collapsed && (
          <ListItemText
            primary={item.label}
            sx={{ ml: 2 }}
            primaryTypographyProps={{
              color: isActive ? "#fff" : "text.secondary",
              fontWeight: isActive ? 700 : 400,
              letterSpacing: isActive ? "0.3px" : "0px",
            }}
          />
        )}
      </ListItemButton>
    );
  })}
</List>

  <Divider sx={{ width: "100%",height:"1px", backgroundColor: "#283d6b", opacity: 0.7}} /> 
  {/* Rodapé do Drawer */}
  <Box sx={{ width: "100%",  display: "flex",pl:2,pr:2, flexDirection: "column", gap: 1 }}>
  {!isMobile && (
  <ListItemButton
  sx={{
  width: "100%",
  borderRadius: 1,
  color:"text.secondary",
  display: "flex",
  alignItems: "center",
  "&:hover": {
  background: "rgba(255,255,255,0.12)"
  },
  }}
  onClick={() => setCollapsed((prev) => !prev)}
  >
  {collapsed ? (
  <ChevronRight color="#fff" size={20} />
  ) : (
  <ChevronLeft color="#fff" size={20} />
  )}

  {!collapsed && (
  <ListItemText
  primary={collapsed ? "Expandir" : "Recolher"}
  primaryTypographyProps={{ color: {colorOpacity}, fontWeight: 400 }}
  sx={{ ml: 2}}
  />
  )}
  </ListItemButton>
  )}

  {/* Botão Sair */}
  <ListItemButton
  sx={{
  width: "100%",
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  "&:hover": {
  background: "rgba(255,50,50,0.25)",
  color:"#FFFF"
  },
  }}
  onClick={() => {}}
  >
  <LogOut color="#fff" size={20} />
  {!collapsed && (
  <ListItemText
  primary="Sair"
  primaryTypographyProps={{ color: "#8a98b8ff", fontWeight: 400 }}
  sx={{ ml: 2 
  }} />
  )}
  </ListItemButton>
  </Box>
  </Drawer>

  {/* Conteúdo principal */}
   {currentModule()}
  </Box>
  );
  }
