
  import { Bell, Building2, ChartColumn, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Layers, LayoutDashboard, LogOut, Package, Pencil, Plus, Ruler, Settings, ShoppingBag, ShoppingCart,  Tag,  ToggleLeft,  ToggleRight,  Trash2,  Truck, User, Users, Users2, Wallet } from "lucide-react";
  import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  Stack,
  Badge,
  Avatar,
  } from "@mui/material";
  import {  useState } from "react";
  import { bgComponents, bordasComponents, colorOpacity, } from "../../../theme/theme";
import { ModuleProduct } from "../produto/ModuleProductPage";
import { CurrentModulePage } from "./enums/HomeEnums";
import { DashBoardPage } from "../dashboard/DashBoardPage";
import { StockPage } from "../fornecedor/StockPage";
  const menuItems = [
  { label: "Dashboard", 
    icon: LayoutDashboard, 
    page: CurrentModulePage.Dashboard 
  },
  { label: "Vendas", 
    icon: ShoppingCart, 
    page: CurrentModulePage.seller 
  },
  { label: "Produto",
     icon: Package, 
     page: CurrentModulePage.Product 
    },
  { label: "Clientes", 
    icon: Users, 
    page: CurrentModulePage.Client 
  },
  { label: "Financeiro", 
    icon: Wallet, 
    page: CurrentModulePage.Financial 
  },
  { label: "Estoque", 
    icon: Truck, 
    page: CurrentModulePage.Stock 
  },
  { label: "Relatórios", 
    icon: ClipboardList, 
    page: CurrentModulePage.Reports 
  },
  { label: "Análise", 
    icon: ChartColumn, 
    page: CurrentModulePage.Analysis 
  },
  { label: "Empresa", 
    icon: Building2, 
    page: CurrentModulePage.Company 
  },
  { label: "Configurações", 
    icon: Settings, 
    page: CurrentModulePage.Settings 
  },
  ];




export default function HomePage() {
const [collapsed, setCollapsed] = useState(false);
const [currentPage, setPage] = useState<CurrentModulePage>(CurrentModulePage.Dashboard);
const drawerWidth = collapsed ? 80 : 280;


const handleOnChagentPage = (page: CurrentModulePage) => {
  setPage(page);
};

  const currentModule = () => {
    switch (currentPage) {
      case CurrentModulePage.Product:
        return <ModuleProduct />;
        case CurrentModulePage.Dashboard:
        return <DashBoardPage collapsed={collapsed} />;
        case CurrentModulePage.Stock:
        return <StockPage/>;
      // case CurrentModulePage.Seller:
      //   return <SellerPage />;
      // case CurrentModulePage.Client:
      //   return <ClientPage />;
      // case CurrentModulePage.Financial:
      //   return <FinancialPage />;
      // case CurrentModulePage.Stock:
      //   return <StockPage />;
      // case CurrentModulePage.Reports:
      //   return <ReportsPage />;
      // case CurrentModulePage.Analysis:
      //   return <AnalysisPage />;
      // case CurrentModulePage.Company:
      //   return <CompanyPage />;
      // case CurrentModulePage.Settings:
      //   return <SettingsPage />;
      default:
        return null;
    }
  };
     


  return (
  <Box
  sx={{
  display: "flex",
  height: "100vh",   // viewport inteira
  width: "100vw",
  overflow: "hidden" //  nunca scroll aqui
  }}>

  {/* AppBar */}
  <AppBar position="fixed"   sx={{
  background: "#131d34",
  borderRadius: 0,
  p: 0.35,
  border: bordasComponents //  borda aplicada corretamente
  }}>
  <Toolbar>
  <Stack
  direction="row"
  sx={{
  width: "100%",          // ← ocupa 100% da largura
  justifyContent: "flex-end", // ← empurra os filhos para a direita
  alignItems: "center",
  gap:2,
  borderRadius:0
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
  <Stack flexDirection={"column"} gap={0}>
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
  variant="permanent"
  sx={{
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  border: bordasComponents,
  transition: "width 0.3s ease",
  "& .MuiDrawer-paper": {
  width: drawerWidth,
  transition: "width 0.3s ease",
  boxSizing: "border-box",
  borderRight: bordasComponents,
  borderRadius: 0,
  backgroundColor: (theme) => theme.palette.text.primary,
  color: (theme) => theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
  {menuItems.map((item) => {
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
  {/* Botão Recolher/Expandir */}
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
