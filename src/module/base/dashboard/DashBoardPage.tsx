import {ResponsiveContainer,Line,XAxis,YAxis,Tooltip,CartesianGrid, Area, ComposedChart,
} from "recharts";
import { Calculator, DollarSign, Package, Plus, ShoppingCart, Truck, UsersRound } from "lucide-react";
import {
  Box,
  Toolbar,
  Typography,
  Stack,
  Avatar,
  Button,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer, CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";
import { bgColorCardsDashBoard, bgColorNegative, bgColorPositive, bgColorTopSellers, bgshopColor, bgView, colorGray, colorNegative, colorOpacity, colorPositive, primaryColor, productBgColorIcon, productColorIcon, shopIconColor, userBgColorIcon, userColorIcon } from "../../../theme/theme";
import { cellStyle, cellStyleBold } from "../../../theme/cellTable";
import { fetchDashboard } from "./repository/repository";


const mesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


const enumStatus: Record<string, string> = {
  Aprovado: "Aprovado",
  Pendente: "Pendente",
  Cancelada: "Cancelada",
};

const acoesRapidas = [
  {label:"Nova Venda", icon:<Plus color={"#FFFF"}></Plus>, page: 1},
  {label:"Novo Cliente", icon:<UsersRound color={"#FFFF"}></UsersRound>, page: 3},
  {label:"Novo Produto", icon:<Package color={"#FFFF"}></Package>, page: 2},
  {label:"Conta a Pagar", icon:<Calculator color={"#FFFF"}></Calculator>, page: 4},
  {label:"Nova Compra", icon:<Truck color={"#FFFF"}></Truck>, page: 5},
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

interface PedidoRecente {
  pedido: number;
  cliente: string;
  contato: string;
  status: string;
  data_cadastro: string;
}

interface GraficoLinhaItem {
  ano: number;
  mes: number;
  receita: number;
}

interface DespesaItem {
  ano: number;
  mes: number;
  despesa: number;
}

interface DashBoardPageProps {
  collapsed: boolean;
  onNavigate: (page: number) => void;
}


export function DashBoardPage({ collapsed, onNavigate }: DashBoardPageProps) {
    const [loading, setLoading] = useState(true);
    const [kpi, setKpi] = useState({ receita_total: 0, qtd_pedido: 0, qtd_cliente: 0, qtd_produto: 0 });
    const [chartData, setChartData] = useState<{ mes: string; receita: number; despesas: number }[]>([]);
    const [pedidos, setPedidos] = useState<PedidoRecente[]>([]);
    const [topProdutos, setTopProdutos] = useState<{ qtd_por_produto: number; produto: string }[]>([]);

    useEffect(() => {
      const loadDashboard = async () => {
        const result = await fetchDashboard();
        if (result.success && result.data) {
          const d = result.data;
          setKpi(d.kpi);

          const despesasMap = new Map<number, number>();
          (d.despesas ?? []).forEach((dp: DespesaItem) => despesasMap.set(dp.mes, dp.despesa));

          setChartData(
            d.grafico_linha.map((item: GraficoLinhaItem) => ({
              mes: mesNomes[item.mes - 1] ?? `Mês ${item.mes}`,
              receita: item.receita,
              despesas: despesasMap.get(item.mes) ?? 0,
            }))
          );
          setPedidos(d.pedidos_recentes);
          setTopProdutos(d.top_produtos);
        }
        setLoading(false);
      };
      loadDashboard();
    }, []);

    const cardsDashBoard = [
      {label:"Receita Total", value: `R$ ${kpi.receita_total.toLocaleString("pt-BR")}`, icon: <DollarSign color={colorPositive} size={27}></DollarSign>},
      {label:"Pedidos", value: kpi.qtd_pedido.toLocaleString("pt-BR"), icon: <ShoppingCart color={shopIconColor} size={27}></ShoppingCart>},
      {label:"Clientes", value: kpi.qtd_cliente.toLocaleString("pt-BR"), icon: <UsersRound color={userColorIcon} size={27}></UsersRound>},
      {label:"Produtos", value: kpi.qtd_produto.toLocaleString("pt-BR"), icon: <Package color={productColorIcon} size={27}></Package>},
    ];

    if (loading) {
      return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: bgView, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <CircularProgress sx={{ color: primaryColor }} />
        </Box>
      );
    }

    return (
      <Box
    component="main"
    sx={{
    flexGrow: 1,
    bgcolor: bgView,
    pl: { xs: 1, md: 2.5 },
    // SCROLL ÚNICO AQUI
    overflowY: "auto",
    overflowX: "hidden",

    // ESSENCIAL para Flexbox
    minHeight: 0,
    }}
    >
    <Toolbar />  {/* Esse toolbar empurra o conteúdo pra baixo do AppBar */}
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }} color={"#FFFF"} marginTop={7} fontWeight={"bold"}>
    Dashboard
    </Typography>
    <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1.2rem"} color={colorOpacity} marginTop={1} >
    Bem-vindo de volta, João! Aqui está o resumo do seu negócio.
    </Typography>
    <Stack direction="row" display={"flex"} sx={{ flexWrap: "wrap", gap: { xs: 2, md: 2 }, overflowX: "auto", mt:4, mr:2}} flexGrow={1}>
    {cardsDashBoard.map((item) => (
    <Box flexDirection={"row"} minHeight={180} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} p={2}  gap={10} border={"1px solid rgba(40, 61, 107, 0.4)"} 
    sx={{
  flex: { xs: "1 1 100%", sm: "1 1 45%", md: 1 },
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
      </Box>
      <Box display={"flex"} alignContent={"center"} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} borderRadius={1} width={55} height={55} bgcolor={currentBgColorIconDashBoard(item.label)} mt={2} ml={collapsed === true? 12: 5}>
      {item.icon}
      </Box>
    </Box>
    ))}
    </Stack>
    <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" }, height: { xs: "auto", md: "50%" } }} width={"100%"} flexGrow={1} mt={4}>
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
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" } }} color={"#FFFF"}  fontWeight={"bold"}>
    Receita vs Despesas
    </Typography>
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity} marginTop={1} fontWeight={400}>
    Visão mensal do fluxo financeiro
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
  <Area
  type="monotone"
  dataKey="despesas"
  fill="url(#gradientDespesas)"
  stroke="none"
  isAnimationActive
  animationDuration={1200}
  tooltipType="none"
  />

  {/* LINHAS */}
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
  <Box flexDirection={"column"} mr={2} flex={1} gridRow={1}  height={"100%"} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={3}  gap={3} border={"1px solid rgba(40, 61, 107, 0.4)"} 
  sx={{
  ml: { xs: 0, md: 4 },
  mt: { xs: 2, md: 0 },
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
  <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" } }} color={"#FFFF"}  fontWeight={"bold"}>
  Ações Rápidas
  </Typography>
  <Box
  display="grid"
  gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
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
  onClick={() => onNavigate(acao.page)}
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
    <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" }, height: { xs: "auto", md: "60%" } }} width={"100%"} flexGrow={1} mt={4} mb={4}>
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
    <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" } }} color={"#FFFF"}  fontWeight={"bold"}>
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
  <TableContainer sx={{ maxHeight: "450px", mr:5, mt:2, overflowX: "auto"}}>
  <Table
    stickyHeader//se tirar some o header da table
    aria-label="Pedidos Recentes"
    sx={{
      mt: 2,
      minWidth: 600,
      bgcolor: "transparent",
      borderCollapse: "separate",
      borderSpacing: "0 8px", // espaço entre linhas (opcional)
    }}
  >
    {/* HEADER */}
    <TableHead>
      <TableRow>
        {["Pedido", "Cliente", "Contato", "Status", "Data"].map(
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
          <TableCell sx={cellStyle}>#{row.pedido}</TableCell>
          <TableCell sx={cellStyleBold}>{row.cliente}</TableCell>
          <TableCell sx={cellStyle}>{row.contato}</TableCell>
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
                color:  row.status === enumStatus.Pendente
                    ? shopIconColor
                    : row.status === enumStatus.Aprovado
                    ? colorPositive
                    : colorNegative,
                bgcolor:
                  row.status === enumStatus.Pendente
                    ? bgshopColor
                    : row.status === enumStatus.Aprovado
                    ? bgColorPositive
                    : bgColorNegative,
              }}>
              {row.status}
            </Box>
          </TableCell>
          <TableCell sx={cellStyle}>{row.data_cadastro}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Box>

    </Box>
  <Box flexDirection={"column"} mr={2} flex={1} gridRow={1}  height={"100%"} display={"flex"} borderRadius={1} bgcolor={bgColorCardsDashBoard} pl={4} pt={3}  gap={0} border={"1px solid rgba(40, 61, 107, 0.4)"} 
  sx={{
  ml: { xs: 0, md: 4 },
  mt: { xs: 2, md: 0 },
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
     <Typography gutterBottom variant="h2" component="div" mb={0}mt={0} sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" } }} color={"#FFFF"}  fontWeight={"bold"}>
    Produtos Mais Vendidos
    </Typography>
    <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity}  fontWeight={400}>
    Top 5 do mês atual
    </Typography>
    {topProdutos.map((row, index) => (
      <Stack key={row.produto} display={"flex"} flexDirection={"row"}  alignItems={"center"} justifyContent={"start"} alignContent={"center"} justifyItems={"center"} gap={2} >
      <Box flex={1}
      alignItems={"start"} justifyContent={"start"} alignContent={"center"} justifyItems={"center"} 
      sx={{
      borderRadius:1,
      bgcolor: bgColorTopSellers,
      width:60,
      height:60,mt:3
      }}>
      <Typography gutterBottom variant="h1" component="div" mb={0}mt={0} fontSize={"1.4rem"} color={colorOpacity}  fontWeight={"bold"}>
      {index + 1}
      </Typography>
      </Box>
      <Box flex={3} display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"start"} alignContent={"start"} justifyItems={"start"} height={15}>
          <Typography gutterBottom variant="h1" component="div" mb={0}mt={0} fontSize={"1.2rem"} color={"#FFFF"}  fontWeight={"bold"}>
      {row.produto}
      </Typography>
      <Typography gutterBottom variant="body1" component="div" mb={0}mt={0} fontSize={"1rem"} color={colorOpacity}  fontWeight={400}>
      {row.qtd_por_produto} vendas
      </Typography>
      </Box>
      </Stack>
      
    ))}
  </Box>
    </Box>
    </Box>

    );
}