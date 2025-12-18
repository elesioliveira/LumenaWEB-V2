import { TablePagination } from "@mui/material";
  import { Bell, Building2, ChartColumn, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, LayoutDashboard, LogOut, Package, Pencil, Plus, Ruler, Settings, ShoppingBag, ShoppingCart,  Tag,  ToggleLeft,  ToggleRight,  Trash2,  Truck, User, Users, Wallet } from "lucide-react";
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
  TextField,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  } from "@mui/material";
  import { useCallback, useEffect, useRef, useState } from "react";
  import { bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, bgView, colorNegative, colorOpacity, colorPositive, primaryColor } from "../../../theme/theme";
  import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
  import { CreateFornecedorModal } from "../produto/fornecedor/modalCreateOrUpdate";
  import type { FornecedorEntity } from "../produto/fornecedor/entity/FornecedorEntity";
  import { getFornecedor, updateFornecedor } from "../produto/fornecedor/repository/FornecedorRepository";
import { PaginationButton } from "../produto/fornecedor/components/PaginationButton";
  



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

  const subModulesProduct= [
  {label:"Produtos", icon:Package},
  {label:"Fornecedores", icon:Users},
  {label:"Categorias", icon:Tag},
  {label:"Marcas", icon:Package},
  {label:"Canais de Venda", icon:ShoppingBag},
  {label:"Métodos de Entrega", icon:Truck},
  ];


  export default function HomePage() {
const [collapsed, setCollapsed] = useState(false);
const [currentModule, setModule] =useState<number>(0);
const drawerWidth = collapsed ? 80 : 280;
const [activeSubModule, setActiveSubModule] = useState(0);
const [openFornecedorModal, setOpenFornecedorModal] = useState(false);
const [selectedFornecedor, setSelectedFornecedor] =useState<FornecedorEntity | null>(null);
const [fornecedores, setFornecedores] = useState<FornecedorEntity[]>([]);
const [toastOpen, setToastOpen] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("error");
const searchRef = useRef("");
const [loading, setLoading] = useState(false);
const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const jaCarregouRef = useRef(false);
const [page, setPage] = useState(0);
const rowsPerPage = 10;

const totalPages = Math.ceil(fornecedores.length / rowsPerPage);
const fornecedoresPaginados = fornecedores.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);

const fetchFornecedores = async (search: string) => {
  setLoading(true);

  try {
    const response = await getFornecedor(search);

    if (response?.success) {
      setFornecedores(response.data);
      if (page >= totalPages && totalPages > 0) {
      setPage(0);
      }
    }
  } finally {
    setLoading(false);
  }
};

const debounceSearch = () => {
if (debounceTimeout.current) {
  clearTimeout(debounceTimeout.current);
}

  debounceTimeout.current = setTimeout(() => {
    const value = searchRef.current.trim();

    if ( value !=='' && value.length < 3) return;

    fetchFornecedores(value);
  }, 1000);
};


const onChangedAtivo = async (f: FornecedorEntity)=> {
  try {
    f.ativo = !f.ativo;
     setLoading(true);
    const response = await updateFornecedor(f);
       if (!response?.success) {
      setToastType("error");
      setToastMsg(response?.message ?? "Erro ao mudar status do fornecedor.");
      setToastOpen(true);
      return;
    }
    await fetchFornecedores(searchRef.current);
  } catch (error) {
      setToastType("error");
      setToastMsg("Erro ao mudar status do fornecedor.");
      setToastOpen(true);
      return;
  }finally {
    setLoading(false);
  }
}

useEffect(() => {
  if (jaCarregouRef.current) return;

  jaCarregouRef.current = true;
  fetchFornecedores("");
}, []);

const handleEdit = (row: FornecedorEntity) => {
  setSelectedFornecedor(row);      //  passa o fornecedor
  setOpenFornecedorModal(true);    //  abre modal
};



  return (
  <Box
  sx={{
  display: "flex",
  height: "100vh",   // viewport inteira
  width: "100vw",
  overflow: "hidden" //  nunca scroll aqui
  }}>
  <Snackbar
  open={toastOpen}
  autoHideDuration={2500}
  onClose={() => setToastOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
  <Alert
  severity={toastType}
  onClose={() => setToastOpen(false)}
  sx={{ width: "100%" }}
  >
  {toastMsg}
  </Alert>
  </Snackbar>
<CreateFornecedorModal
  open={openFornecedorModal}
  onClose={() => {
    setOpenFornecedorModal(false);
    setSelectedFornecedor(null);   //  limpa ao fechar
  }}
 onSuccess={() => fetchFornecedores(searchRef.current)}   //  recarrega lista
  fornecedor={selectedFornecedor}  //  passa via props
/>
  {/* AppBar */}
  <AppBar position="fixed"   sx={{
  background: "#131d34",
  borderRadius: 0,
  p: 0.35,
  border: "1px solid rgba(40, 61, 107, 0.4)" //  borda aplicada corretamente
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
  border: "1px solid rgba(40, 61, 107, 0.4)",
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
  border: "1px solid rgba(40, 61, 107, 0.4)",
  transition: "width 0.3s ease",
  "& .MuiDrawer-paper": {
  width: drawerWidth,
  transition: "width 0.3s ease",
  boxSizing: "border-box",
  borderRight: "1px solid rgba(40, 61, 107, 0.4)",
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
  <Toolbar> </Toolbar>

  <Stack
  direction="row"
  flexGrow={1}
  gap={5}
  ml={2}
  height={100}
  mt={2}
  sx={{
  borderBottom: "1px solid rgba(40, 61, 107, 0.4)",
  mb: 3,
  }}
  >
  {subModulesProduct.map((item, index) => {
  const isActive = index === activeSubModule;
  const Icon = item.icon;
  return (
  <Box
  key={item.label}
  onClick={() => setActiveSubModule(index)}
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
  {/* ICON + LABEL */}
  <Stack direction="row" spacing={1.2} alignItems="center">
  <Icon
  size={18}
  color={isActive ? "#fff" : "#94a3b8"}
  />
  <Typography
  fontSize="0.95rem"
  fontWeight={isActive ? 600 : 400}
  color={isActive ? "#fff" : "#94a3b8"}
  whiteSpace="nowrap" 
  sx={{
  "&:hover": {
  transform: "translateY(-1.5px)",
  fontWeight: "500"
  },
  }}
  >
  {item.label}
  </Typography>
  </Stack>
  </Box>
  );
  })}
  </Stack>
  <Box display={"flex"} flexDirection={"column"} flexGrow={2} ml={2}>
  <Stack display={"flex"} flexDirection={"row"} flexGrow={2} justifyContent={"space-between"} >
  <Typography sx={{fontWeight:"bold", fontSize:"1.5rem", color:"#ffff"}}>
  Fornecedores
  </Typography>
  <Stack display={"flex"} flexDirection={"row"} gap={2} mr={3} >
  <TextField
  placeholder="Buscar fornecedor"
 onChange={(e) => {
    searchRef.current = e.target.value;
    debounceSearch();
  }}
  size="small"
  sx={{
  width: 270,

  // INPUT ROOT
  "& .MuiOutlinedInput-root": {
  backgroundColor: bgColorTopSellers, // fundo
  color: "#fff",

  // BORDA PADRÃO
  "& fieldset": {
  borderColor: colorOpacity,
  },

  // HOVER
  "&:hover fieldset": {
  borderColor: primaryColor,
  },

  // FOCUS
  "&.Mui-focused fieldset": {
  borderColor: primaryColor,
  borderWidth: 2,
  },
  },

  // TEXTO DO INPUT
  "& input": {
  color: "#fff",
  fontSize: "0.9rem",
  },

  // PLACEHOLDER
  "& input::placeholder": {
  color: colorOpacity,
  opacity: 1,
  },
  }}
  />
  <Button
  startIcon={<Plus />}
  onClick={() => setOpenFornecedorModal(true)}
  sx={{
  height: 40,
  width:100,
  px: 3,
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 1,
  background: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
  boxShadow: "0 0 20px rgba(245,159,10,0.35)",
  transition: "0.25s ease",
  "&:hover": {
  background: "linear-gradient(to right, #f4a51c 0%, #c76007 100%)",
  boxShadow: "0 0 25px rgba(245,159,10,0.55)",
  transform: "translateY(-1px)",
  },
  }}>
  Novo
  </Button>
  </Stack>
  </Stack>

  {/* Tabela */}
  <Box mr={2} flexGrow={1}>
  {/* LOADING */}
  {loading && (
  <Stack
  height={200}
  alignItems="center"
  justifyContent="center"
  >
  <CircularProgress color="inherit" />
  <Typography mt={2} color={colorOpacity}>
  Carregando fornecedores...
  </Typography>
  </Stack>
  )}

  {/* LISTA VAZIA */}
  {!loading && fornecedores.length === 0 && (
  <Stack
  height={200}
  alignItems="center"
  justifyContent="center"
  >
  <Typography color={colorOpacity}>
  Nenhum fornecedor encontrado.
  </Typography>
  </Stack>
  )}

  {/* TABELA */}
  {!loading && fornecedores.length > 0 && (
  <TableContainer
  sx={{
  maxHeight: "100%",
  mr: 5,
  mt: 2,
  }}
  >
  <Table
  stickyHeader
  sx={{
  bgcolor: "transparent",
  borderCollapse: "separate",
  borderSpacing: "0 8px",
  }}
  >
  {/* HEADER */}
  <TableHead>
  <TableRow>
  {["Nome", "CNPJ", "E-mail", "Telefone", "Cidade", "Status", "Ações"].map(
  (col) => (
  <TableCell
  key={col}
  sx={{
  backgroundColor: "transparent",
  color: colorOpacity,
  fontSize: "0.9rem",
  fontWeight: 600,
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(40, 61, 107, 0.4)",
  }}
  >
  {col}
  </TableCell>
  )
  )}
  </TableRow>
  </TableHead>

  {/* BODY */}
  <TableBody>
  {fornecedoresPaginados.map((row) => (
  <TableRow
  key={row.id}
  sx={{
  backgroundColor: "rgba(255,255,255,0.02)",
  transition: "0.25s ease",
  "&:hover": {
  backgroundColor: "rgba(245,159,10,0.08)",
  },
  }}
  >
  <TableCell sx={cellStyleBold}>
  {row.nome}
  </TableCell>

  <TableCell sx={cellStyle}>{row.cnpj}</TableCell>
  <TableCell sx={cellStyle}>{row.email ?? "-"}</TableCell>
  <TableCell sx={cellStyle}>{row.telefone ?? "-"}</TableCell>
  <TableCell sx={cellStyle}>{row.cidade ?? "-"}</TableCell>

  <TableCell sx={cellStyle}>
  <Box
  sx={{
  width: 80,
  height: 22,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.7rem",
  fontWeight: 600,
  color: row.ativo ===true? colorPositive : colorNegative,
  bgcolor:row.ativo ===true? bgColorPositive : bgColorNegative ,
  }}
  >
 {row.ativo ===true? "ativo" : "desativado"}
  </Box>
  </TableCell>
  <TableCell sx={cellStyle}> <Stack direction="row" spacing={1} justifyContent="start" alignItems="start" > 
    {/* EDITAR */} 
    <Box onClick={() => handleEdit(row)} sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", color: colorOpacity, transition: "0.25s ease", "&:hover": { color: primaryColor, backgroundColor: "rgba(245,159,10,0.15)", boxShadow: "0 0 12px rgba(245,159,10,0.45)", transform: "translateY(-1px)", }, }} >
    <Pencil size={16} /> </Box> 
    {/* Ativar ou Desativar */} 
   <Box
    onClick={() => onChangedAtivo(row)}
    sx={{
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1,
      cursor: "pointer",
      color: row.ativo ? colorPositive : colorNegative,
      transition: "0.25s ease",
      "&:hover": {
        backgroundColor: row.ativo
          ? "rgba(0,200,83,0.15)"
          : "rgba(255,50,50,0.15)",
        boxShadow: row.ativo
          ? "0 0 12px rgba(0,200,83,0.45)"
          : "0 0 12px rgba(255,50,50,0.45)",
        transform: "translateY(-1px)",
      },
    }}>
    {row.ativo ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
  </Box>
    </Stack> 
    </TableCell>
  </TableRow>
  ))}
  </TableBody>
  </Table>
  </TableContainer>
  )}
 {!loading && fornecedores.length > rowsPerPage && (
  <Box
    mt={3}
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={2}
    mb={2}
  >
    {/* LEFT */}
    <PaginationButton
      disabled={page === 0}
      onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    >
      <ChevronLeft size={20} />
    </PaginationButton>

    {/* PAGE NUMBER */}
    <Box
      sx={{
        minWidth: 48,
        height: 36,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "0.9rem",
        color: "#fff",
        background: bgComponents,
      }}
    >
      {page + 1}
    </Box>

    {/* RIGHT */}
    <PaginationButton
      disabled={page >= totalPages - 1}
      onClick={() =>
        setPage((prev) => Math.min(prev + 1, totalPages - 1))
      }
    >
      <ChevronRight size={20} />
    </PaginationButton>
  </Box>
)}

  </Box>

  </Box>
  </Box>
  </Box>
  );
  }
