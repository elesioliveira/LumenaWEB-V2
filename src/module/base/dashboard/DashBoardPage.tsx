import {ResponsiveContainer,Line,XAxis,YAxis,Tooltip,CartesianGrid, Area, ComposedChart,
} from "recharts";
import { Bell, Building2, Calculator, ChartColumn, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, DollarSign, LayoutDashboard, LogOut, Package, Plus, Settings, ShoppingCart, TrendingDown, TrendingUp, Truck, User, User2, Users, UsersRound, Wallet } from "lucide-react";
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
  Button,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer
} from "@mui/material";
import { useState } from "react";
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgComponents, bgshopColor, bgView, colorGray, colorNegative, colorOpacity, colorPositive, primaryColor, productBgColorIcon, productColorIcon, shopIconColor, userBgColorIcon, userColorIcon } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";

 const pedidos = [
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  { pedido: "002", cliente: "Maria Oliveira", produto: "Produto B", valor: "R$ 150,00", status: "Em andamento", data: "12/01/2025" },
  { pedido: "003", cliente: "Carlos Souza", produto: "Produto C", valor: "R$ 200,00", status: "Cancelado", data: "15/01/2025" },
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  { pedido: "002", cliente: "Maria Oliveira", produto: "Produto B", valor: "R$ 150,00", status: "Em andamento", data: "12/01/2025" },
  { pedido: "003", cliente: "Carlos Souza", produto: "Produto C", valor: "R$ 200,00", status: "Cancelado", data: "15/01/2025" },
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  { pedido: "001", cliente: "João Silva", produto: "Produto A", valor: "R$ 100,00", status: "Concluído", data: "10/01/2025" },
  // Add more rows as needed
  ];

const topSelles = [
  {top:1 , product:"iPhone 15 Pro Max", total:"342", value:"R$ 3.248.658", porcentagem:"+12.5"},
  {top:2 , product:"MacBook Air M3", total:"189", value:"R$ 2.456.811", porcentagem:"+8.2"},
  {top:3 , product:"Samsung Galaxy S24", total:"134 vendas", value:"R$ 1.205.866", porcentagem:"-2.4"},
  {top:4 , product:"iPad Pro 12.9", total:"342", value:"R$ 3.248.658", porcentagem:"+12.5"},
  {top:5 , product:"AirPods Pro 2", total:"521", value:"R$ 989.499", porcentagem:"+22.1"},
];






const enumStatus = {
  concluido: "Concluído",
  andamento: "Em andamento",
  cancelado: "Cancelado"
}

const chartData = [
  { mes: "Jan", receita: 12000, despesas: 8000 },
  { mes: "Fev", receita: 15000, despesas: 9000 },
  { mes: "Mar", receita: 14000, despesas: 10000 },
  { mes: "Abr", receita: 18000, despesas: 12000 },
  { mes: "Mai", receita: 20000, despesas: 15000 },
  { mes: "Jun", receita: 22000, despesas: 17000 },
  { mes: "Jul", receita: 21000, despesas: 16000 },
  { mes: "Ago", receita: 24000, despesas: 19000 },
  { mes: "Set", receita: 26000, despesas: 20000 },
  { mes: "Out", receita: 28000, despesas: 23000 },
  { mes: "Nov", receita: 30000, despesas: 25000 },
  { mes: "Dez", receita: 32000, despesas: 27000 },
];


const cardsDashBoard = [
  {label:"Receita Total", value: "R\$ 248.590", porcentagem:"12.5%", icon: <DollarSign color={colorPositive} size={27}></DollarSign>, postive:true},
  {label:"Pedidos", value: "1.429", porcentagem:"8.2%", icon: <ShoppingCart color={shopIconColor} size={27}></ShoppingCart>,postive:true},
  {label:"Clientes", value: "3.847", porcentagem:"2.4%", icon: <UsersRound color={userColorIcon} size={27}></UsersRound>,postive:false},
  {label:"Produtos", value: "847", porcentagem:"15.3%", icon: <Package color={productColorIcon} size={27}></Package>,postive:true},
];

const acoesRapidas = [
  {label:"Nova Venda", icon:<Plus color={"#FFFF"}></Plus>, onClick: () => {console.log("object");},},
  {label:"Novo Cliente", icon:<UsersRound color={"#FFFF"}></UsersRound>, onClick: () => {console.log("object");},},
  {label:"Novo Produto", icon:<Package color={"#FFFF"}></Package>, onClick: () => {console.log("object");},},
  {label:"Conta a Pagar", icon:<Calculator color={"#FFFF"}></Calculator>, onClick: () => {console.log("object");},},
  {label:"Nova Compra", icon:<Truck color={"#FFFF"}></Truck>, onClick: () => {console.log("object");},},
];

function currentBgColorIconDashBoard(label: string) {
  switch (label) {
    case "Receita Total":
      return bgColorPositive;

    case "Pedidos":
      return bgshopColor;

    case "Clientes":
      return userBgColorIcon;

    case "Produtos":
      return productBgColorIcon;

    default:
      return "#ffffff"; // fallback
  }
}

interface DashBoardPageProps {
  collapsed: boolean;
}


export function DashBoardPage({ collapsed }: DashBoardPageProps) {
    return (
      <Box
    component="main"
    sx={{
    flexGrow: 1,
    bgcolor: bgView,
    pl:2.5,
    // SCROLL ÚNICO AQUI
    overflowY: "auto",
    overflowX: "hidden",

    // ESSENCIAL para Flexbox
    minHeight: 0,
    }}
    >
    <Toolbar />  {/* Esse toolbar empurra o conteúdo pra baixo do AppBar */}
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"2rem"} color={"#FFFF"} marginTop={7} fontWeight={"bold"}>
    Dashboard
    </Typography>
    <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1.2rem"} color={colorOpacity} marginTop={1} >
    Bem-vindo de volta, João! Aqui está o resumo do seu negócio.
    </Typography>
    <Stack direction="row" display={"flex"} spacing={2} sx={{ overflowX: "auto",mt:4, mr:2}} flexGrow={1}>
    {cardsDashBoard.map((item, index) => (
    <Box flexDirection={"row"} flexGrow={1}   minHeight={180} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} p={2}  gap={10} border={"1px solid rgba(40, 61, 107, 0.4)"} 
    sx={{
  position: "relative",
  overflow: "hidden",
  transition: "0.3s ease",

  "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
    transform: "translateY(0px)",
  },

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
    opacity: 0,
    transition: "0.3s ease",
  },

  "&:hover:before": {
    opacity: 1,
  },
}} >
      <Box flexDirection={"column"} display={"flex"} gap={1.5}>
        <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity} marginTop={1} >
        {item.label}
        </Typography>
        <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"2rem"} color={"#FFFF"} marginTop={1} fontWeight={"bold"} >
        {item.value}
        </Typography>
      <Stack display={"flex"} flexDirection={"row"}  alignContent={"center"} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} gap={1}>
      <Box bgcolor={item.postive ===true? bgColorPositive :bgColorNegative } width={65} height={10} display={"flex"} alignContent={"center"} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} borderRadius={10} pt={1.5} pb={1.5} pl={0} pr={0}>
      <Stack flexDirection={"row"} display={"flex"} alignContent={"center"} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} >
      {item.postive ? (
        <TrendingUp size={13} color={colorPositive} />
      ) : (
        <TrendingDown size={13} color={colorNegative} />
      )}
      <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} ml={0.5} fontSize={"0.75rem"} color={item.postive ===true? colorPositive : colorNegative} >
      {item.porcentagem}
      </Typography>
      </Stack>
      </Box>
      <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"0.8rem"} color={colorOpacity} >
      vs mês anterior
      </Typography>
      </Stack>
      </Box>
      <Box display={"flex"} alignContent={"center"} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} borderRadius={1} width={55} height={55} bgcolor={currentBgColorIconDashBoard(item.label)} mt={2} ml={collapsed === true? 12: 5}>
      {item.icon}
      </Box>
    </Box>
    ))}
    </Stack>
    <Box display={"flex"} width={"100%"} height={"50%"} flexGrow={1} mt={4}>
    <Box flexDirection={"column"} flex={2} gridRow={1}  minHeight={180} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={1}  gap={0} border={"1px solid rgba(40, 61, 107, 0.4)"} 
    sx={{
  position: "relative",
  overflow: "hidden",
  transition: "0.3s ease",

  "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
    transform: "translateY(0px)",
  },

   "&:before": {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
  opacity: 0,
  transition: "0.3s ease",
  pointerEvents: "none", //PERMITE FILHOS TRABALHAR COM ONHOVER TAMBÉM
},

  "&:hover:before": {
    opacity: 1,
  },
}} >
<Stack flexDirection={"row"} display={"flex"} flexGrow={1} alignContent={"center"} justifyContent={"space-between"} justifyItems={"center"} alignItems={"start"} marginTop={3} mb={2}>
  <Box flexDirection={"column"} display={"flex"}>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1.3rem"} color={"#FFFF"}  fontWeight={"bold"}>
    Receita vs Despesas
    </Typography>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity} marginTop={1} fontWeight={400}>
    Visão anual do fluxo financeiro
    </Typography>
  </Box>
  <Stack flexDirection={"row"} display={"flex"} gap={3} mr={4}>
    <Stack flexDirection={"row"} display={"flex"}>
      <Avatar sx={{ bgcolor: primaryColor, width:15, height:15, color:'transparent' }}>
      </Avatar>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"0.9rem"} color={colorOpacity} ml={1} fontWeight={400} alignItems={"start"} justifyItems={"start"} justifyContent={"start"} alignContent={"center"}>
    Receita
    </Typography>
    </Stack>
    <Stack flexDirection={"row"} display={"flex"}>
      <Avatar sx={{ bgcolor: colorGray, width:15, height:15, color:'transparent' }}>
      </Avatar>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"0.9rem"} color={colorOpacity} ml={1} fontWeight={400} alignItems={"start"} justifyItems={"start"} justifyContent={"start"} alignContent={"center"}>
    Despesas
    </Typography>
    </Stack>
  </Stack>
</Stack>
  <Box display={"flex"}  pr={2} height={"100%"}>
  <ResponsiveContainer width="100%" height={"100%"}>
  <ComposedChart data={chartData}>

  {/* GRADIENT */}
  <defs>
  <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#f59f0a" stopOpacity={0.45} />
  <stop offset="70%" stopColor="#f59f0a" stopOpacity={0.15} />
  <stop offset="100%" stopColor="#f59f0a" stopOpacity={0} />
  </linearGradient>
  </defs>
  <defs>
  <linearGradient id="gradientDespesas" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor={colorGray} stopOpacity={0.35} />
  <stop offset="70%" stopColor={colorGray} stopOpacity={0.12} />
  <stop offset="100%" stopColor={colorGray} stopOpacity={0} />
  </linearGradient>
  </defs>

  {/* GRID */}
  <CartesianGrid
  stroke="#283d6b"
  strokeDasharray="3 3"
  opacity={0.25}
  />

  {/* EIXOS */}
  <XAxis dataKey="mes" stroke="#94a3b8" />
  <YAxis
  stroke="#94a3b8"
  fontSize={"0.7rem"}
  tickFormatter={(value: number) =>
  new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0, // remove centavos (opcional)
  }).format(value)
  }
  />
  <Tooltip
  formatter={(value: number, name: string) => {
  const formatted = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  }).format(value);

  const label =
  name === "receita" ? "Receita" :
  name === "despesas" ? "Despesas" :
  name;

  return [formatted, label];
  }}
  contentStyle={{
  backgroundColor: "#131d34",
  border: "1px solid #283d6b",
  borderRadius: 8,
  color: "#fff",
  }}
  labelStyle={{ color: "#94a3b8" }}
  />

  {/* ÁREA (FILL) */}
  <Area
  type="monotone"
  dataKey="receita"
  fill="url(#gradientFill)"
  stroke="none"
  isAnimationActive
  animationDuration={1200}
  tooltipType="none"
  />
  {/* ÁREA (FILL) */}
  <Area
  type="monotone"
  dataKey="despesas"
  fill="url(#gradientDespesas)"
  stroke="none"
  isAnimationActive
  animationDuration={1200}
  tooltipType="none"
  />

  {/* LINHA */}
  <Line
  type="monotone"
  dataKey="receita"
  stroke="#f59f0a"
  strokeWidth={3}
  dot={false}
  activeDot={{ r: 6 }}
  isAnimationActive
  animationDuration={1400}
  />
  <Line
  type="monotone"
  dataKey="despesas"
  stroke={colorGray}
  strokeWidth={3}
  dot={false}
  activeDot={{ r: 6 }}
  isAnimationActive
  animationDuration={1400}
  />
  </ComposedChart>
  </ResponsiveContainer>

  </Box>
  </Box>
  <Box flexDirection={"column"} ml={4} mr={2} flex={1} gridRow={1}  height={"100%"} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={3}  gap={3} border={"1px solid rgba(40, 61, 107, 0.4)"} 
  sx={{
  position: "relative",
  overflow: "hidden",
  transition: "0.3s ease",
  "&:hover": {
  boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
  borderColor: "rgba(40, 61, 107, 0.9)",
  transform: "translateY(0px)",
  },
  "&:before": {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
  opacity: 0,
  transition: "0.3s ease",
  pointerEvents: "none", // 
  },

  "&:hover:before": {
  opacity: 1,
  },
  }} >
  <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1.3rem"} color={"#FFFF"}  fontWeight={"bold"}>
  Ações Rápidas
  </Typography>
  <Box
  display="grid"
  gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
  mr={2}
  gap={2 }
  sx={{
  overflow: {
  minHeight: 0,
  md: "visible" // desktop → SEM scroll
  }
  }}
  >
  {acoesRapidas.map((acao) => (
  <Box
  key={acao.label}
  onClick={acao.onClick}
  sx={{
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  height: 90,
  borderRadius: 1,
  background: "#182543",
  transition: "0.25s ease",

  "&:hover": {
  background: "linear-gradient(to right, #f39b0a 0%, #de6f09 100%)",
  transform: "translateY(-2px)",
  },
  }}
  >
  {acao.icon}
  <Typography fontSize="0.8rem" color="#fff">
  {acao.label}
  </Typography>
  </Box>
  ))}
  </Box>
  </Box>
  </Box>
  {/* PEDIDOS RECENTES*/}
    <Box display={"flex"} flexDirection={"row"} width={"100%"} height={"60%"} flexGrow={1} mt={4} mb={4}>
    <Box flexDirection={"column"} flex={2} gridRow={1}  minHeight={180} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={1}  gap={0} border={"1px solid rgba(40, 61, 107, 0.4)"} 
    sx={{
    position: "relative",
    overflow: "hidden",
    transition: "0.3s ease",

    "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
    transform: "translateY(0px)",
    },

    "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
    opacity: 0,
    transition: "0.3s ease",
    pointerEvents: "none", //PERMITE FILHOS TRABALHAR COM ONHOVER TAMBÉM
    },

    "&:hover:before": {
    opacity: 1,
    },
    }} >
    <Stack display={"flex"} flexDirection={"row"} pt={2.5} pr={3} justifyContent={"space-between"}  >
    <Box display={"flex"} flexDirection={"column"}>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1.3rem"} color={"#FFFF"}  fontWeight={"bold"}>
    Pedidos Recentes
    </Typography>
    <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity}  fontWeight={400}>
    Últimas transações realizadas
    </Typography>
    </Box>
    <Button
    variant="outlined"
    sx={{
    width: "110px",
    height: "45px",
    color: "#fff",
    border: "2px solid rgba(40, 61, 107, 0.4)", // 👈 todos os lados
    transition: "0.3s ease",
    "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "linear-gradient(to right, #f59f0a 0%, #e68a00 100%)",
    transform: "translateY(0px)",
    },
    "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
    opacity: 0,
    transition: "0.3s ease",
    },
    }}
    >
    Ver todos
    </Button>
    </Stack>
 {/* Tabela */}
<Box mr={2} flexGrow={1}>
  <TableContainer sx={{ maxHeight: "450px", mr:5, mt:2}}>
  <Table
    stickyHeader//se tirar some o header da table
    aria-label="Pedidos Recentes"
    sx={{
      mt: 2,
      bgcolor: "transparent",
      borderCollapse: "separate",
      borderSpacing: "0 8px", // espaço entre linhas (opcional)
    }}
  >
    {/* HEADER */}
    <TableHead>
      <TableRow>
        {["Pedido", "Cliente", "Produto", "Valor", "Status", "Data"].map(
          (col) => (
            <TableCell
              key={col}
              sx={{
                backgroundColor: "transparent", // 👈 remove fundo
                color: colorOpacity,
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
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
      {pedidos.map((row) => (
        <TableRow
          key={row.pedido}
          sx={{
            backgroundColor: "rgba(255,255,255,0.02)",
            transition: "0.25s ease",

            "&:hover": {
              backgroundColor: "rgba(245,159,10,0.08)",
            },
          }}
        >
          <TableCell sx={cellStyle}>{row.pedido}</TableCell>
          <TableCell sx={cellStyleBold}>{row.cliente}</TableCell>
          <TableCell sx={cellStyle}>{row.produto}</TableCell>
          <TableCell sx={cellStyleBold}>{row.valor}</TableCell>
          <TableCell sx={cellStyle}>
            <Box
              sx={{
                width: 100,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                fontSize: "0.7rem",
                fontWeight: 600,
                color:  row.status === enumStatus.andamento
                    ? shopIconColor
                    : row.status === enumStatus.concluido
                    ? colorPositive
                    : colorNegative,
                bgcolor:
                  row.status === enumStatus.andamento
                    ? bgshopColor
                    : row.status === enumStatus.concluido
                    ? bgColorPositive
                    : bgColorNegative,
              }}>
              {row.status}
            </Box>
          </TableCell>
          <TableCell sx={cellStyle}>{row.data}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Box>

    </Box>
  <Box flexDirection={"column"} ml={4} mr={2} flex={1} gridRow={1}  height={"100%"} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={3}  gap={0} border={"1px solid rgba(40, 61, 107, 0.4)"} 
  sx={{
  position: "relative",
  overflow: "hidden",
  transition: "0.3s ease",
  "&:hover": {
  boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
  borderColor: "rgba(40, 61, 107, 0.9)",
  transform: "translateY(0px)",
  },
  "&:before": {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  background: "radial-gradient(circle at 30% 20%, rgba(40,61,107,0.35), transparent)",
  opacity: 0,
  transition: "0.3s ease",
  pointerEvents: "none", // 
  },

  "&:hover:before": {
  opacity: 1,
  },
  }} >
     <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1.3rem"} color={"#FFFF"}  fontWeight={"bold"}>
    Produtos Mais Vendidos
    </Typography>
    <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity}  fontWeight={400}>
    Top 5 do mês atual
    </Typography>
    {topSelles.map((row) => (
      <Stack display={"flex"} flexDirection={"row"}  alignItems={"center"} justifyContent={"start"} alignContent={"center"} justifyItems={"center"} gap={2} >
      <Box flex={1}
      alignItems={"start"} justifyContent={"start"} alignContent={"center"} justifyItems={"center"} 
      sx={{
      borderRadius:1,
      bgcolor: bgColorTopSellers,
      width:60,
      height:60,mt:3
      }}>
      <Typography gutterBottom variant="h1" component="div" mb={0}mt={0} fontSize={"1.4rem"} color={colorOpacity}  fontWeight={"bold"}>
      {row.top}
      </Typography>
      </Box>
      <Box flex={3} display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"start"} alignContent={"start"} justifyItems={"start"} height={15}>
          <Typography gutterBottom variant="h1" component="div" mb={0}mt={0} fontSize={"1.2rem"} color={"#FFFF"}  fontWeight={"bold"}>
      {row.product}
      </Typography>
      <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity}  fontWeight={400}>
      {row.total}
      </Typography>
      </Box>
      <Box flex={2} display={"flex"} flexDirection={"column"} alignItems={"end"} justifyContent={"start"} alignContent={"start"} justifyItems={"start"} height={15} mr={2}>
          <Typography gutterBottom variant="h1" component="div" mb={0}mt={0} fontSize={"1.2rem"} color={"#FFFF"}  fontWeight={"bold"}>
      {row.value}
      </Typography>
      <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={row.porcentagem.includes("+")? colorPositive : colorNegative}  fontWeight={400}>
      {row.porcentagem}%
      </Typography>
      </Box>
      </Stack>
      
    ))}
  </Box>
    </Box>
    </Box>

    );
}