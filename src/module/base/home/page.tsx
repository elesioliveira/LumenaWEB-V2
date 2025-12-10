import { Building2, ChartColumn, ChevronLeft, ChevronRight, ClipboardList, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Truck, Users, Wallet } from "lucide-react";
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
} from "@mui/material";
import { useState } from "react";

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



export default function HomePage() {
const [collapsed, setCollapsed] = useState(false);
const [currentModule, setModule] =useState<number>(0);
const drawerWidth = collapsed ? 80 : 280;
  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer }}
      >
        <Toolbar>
          <Typography variant="h4" color={"#FFFF"}>
            Meu Sistema
          </Typography>
        </Toolbar>
      </AppBar>

{/* Drawer lateral */}
<Drawer
variant="permanent"
sx={{
width: drawerWidth,
flexShrink: 0,
whiteSpace: "nowrap",
transition: "width 0.3s ease",
"& .MuiDrawer-paper": {
width: drawerWidth,
transition: "width 0.3s ease",
boxSizing: "border-box",
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
<Typography variant="body2" color={"text.secondary"}>
ERP System
</Typography>
</Box>
)}
</Box>}
<Divider sx={{ width: "100%",height:"2px", backgroundColor: "#283d6b", opacity: 0.7}} />
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
<Divider sx={{ width: "100%",height:"2px", backgroundColor: "#283d6b", opacity: 0.7}} /> 
{/* Rodapé do Drawer */}
<Box sx={{ width: "100%",  display: "flex",pl:2,pr:2, flexDirection: "column", gap: 1 }}>
{/* Botão Recolher/Expandir */}
<ListItemButton
sx={{
width: "100%",
borderRadius: 1,
display: "flex",
alignItems: "center",
 "&:hover": {
        background: "rgba(255,255,255,0.12)",
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
primaryTypographyProps={{ color: "#fff", fontWeight: 600 }}
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
      },
}}
onClick={() => {}}
>
<LogOut color="#fff" size={20} />
{!collapsed && (
<ListItemText
primary="Sair"
primaryTypographyProps={{ color: "#fff", fontWeight: 600 }}
sx={{ ml: 2 }}
/>
)}
</ListItemButton>
</Box>
</Drawer>

    {/* Conteúdo principal */}
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar />
    <h1>Dashboard</h1>
    <p>Conteúdo da página...</p>
    </Box>
    </Box>
    );
    }
