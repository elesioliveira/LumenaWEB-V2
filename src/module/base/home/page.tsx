
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
  import { bgComponents, bgView, bordasComponents, colorOpacity, } from "../../../theme/theme";
import { FornecedorPage } from "../produto/fornecedor/Page";
import { CategoriaPage } from "../produto/categoria/Page";
import { MarkPage } from "../produto/marca/Page";
import { CanalVendaPage } from "../produto/canalVenda/CanalVendaPage";
import { EntregaPage } from "../produto/entrega/EntregaPage";
import { CurrentPageHome } from "./enums/HomeEnums";
import { ProdutoPage } from "../produto/produto/ProdutoPage";

  const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Vendas", icon: ShoppingCart },
  { label: "Produto", icon: Package },
  { label: "Clientes", icon: Users },
  { label: "Financeiro", icon: Wallet },
  { label: "Estoque", icon: Truck },
  { label: "Relatórios", icon: ClipboardList },
  { label: "Análise", icon: ChartColumn },
  { label: "Empresa", icon: Building2 },
  { label: "Configurações", icon: Settings },
  ];

const subModulesProduct = [
  {
    label: "Produto",
    icon: Package,
    page: CurrentPageHome.Product,
  },
  {
    label: "Fornecedor",
    icon: Users2,
    page: CurrentPageHome.supplier,
  },
  {
    label: "Categoria",
    icon: Layers,
    page: CurrentPageHome.Category,
  },
  {
    label: "Marca",
    icon: Tag,
    page: CurrentPageHome.Mark,
  },
  {
    label: "Canal de Venda",
    icon: ShoppingCart,
    page: CurrentPageHome.SalesChannel,
  },
  {
    label: "Entrega",
    icon: Truck,
    page: CurrentPageHome.Delivery,
  },
];


export default function HomePage() {
const [collapsed, setCollapsed] = useState(false);
const [currentModule, setModule] =useState<number>(2);
const drawerWidth = collapsed ? 80 : 280;
const [currentPage, setPage] = useState<CurrentPageHome>(
  CurrentPageHome.supplier
);

  const currentPageView = () => {
    switch (currentPage) {
      // case CurrentPageHome.Product:
      //   return <ProductPage />;
      case CurrentPageHome.Product:
        return <ProdutoPage />;
      case CurrentPageHome.supplier:
        return <FornecedorPage />;
      case CurrentPageHome.Category:
        return <CategoriaPage />;
      case CurrentPageHome.Mark:
        return <MarkPage />;
      case CurrentPageHome.SalesChannel:
        return <CanalVendaPage />;
      case CurrentPageHome.Delivery:
        return <EntregaPage />;
      default:
        return null;
    }
  };

const handleOnChagentPage = (page: CurrentPageHome) => {
  setPage(page);
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
  <List sx={{ width: "100%", pl: 2, pr:2, display: "flex", flexDirection: "column", gap: 2}}>
  {menuItems.map((item, index) => (
  <ListItemButton
  key={item.label}
  onClick={() => setModule(index)}
  sx={{
  width: "100%",
  display: "flex",
  alignItems: "center",
  px: 2,
  borderRadius: 1,
  transition: "all 0.25s ease",

  // Fundo do item ativo
  background:
  currentModule === index
  ? "linear-gradient(to right, #f39b0a 0%, #de6f09 100%)"
  : "transparent",

  // Borda esquerda animada
  borderLeft: currentModule === index ? "4px solid #f59f0a" : "4px solid transparent",

  "&:hover": {
  background:
  currentModule === index
  ? "linear-gradient(to right, #f4a51c 0%, #c76007 100%)" // reforça o ativo
  : "rgba(255,255,255,0.08)",

  borderLeft:
  currentModule === index
  ? "4px solid #f59f0a"
  : "4px solid rgba(255,255,255,0.3)",
  },
  }}
  >
  {/* Ícone com Glow opcional */}
  <item.icon
  size={20}
  color={currentModule === index ? "#fff" :"#94a3b8"}
  style={{
  marginRight: collapsed ? 0 : 12,
  filter: currentModule === index ? "drop-shadow(0 0 6px rgba(245,159,10,0.9))" : "none",
  transition: "all 0.25s ease",
  }}
  />

  {!collapsed && (
  <ListItemText
  primary={item.label}
  sx={{ ml: 2 }}
  primaryTypographyProps={{
  color:currentModule === index ? "#fff" :"text.secondary",
  fontWeight: currentModule === index ? 700 : 400,
  letterSpacing: currentModule === index ? "0.3px" : "0px",
  }}
  />
  )}
  </ListItemButton>
  ))}
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
  </Box>
  );
  }
