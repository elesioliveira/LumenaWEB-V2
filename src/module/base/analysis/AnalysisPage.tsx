import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Info,
  Percent,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { maskCurrency } from "../../../shared/MaskUtils";
import {
  bgColorCardsDashBoard,
  bgColorTopSellers,
  bgView,
  colorGray,
  colorNegative,
  colorOpacity,
  colorPositive,
  primaryColor,
} from "../../../theme/theme";
import { alertasInteligentes } from "./mocks/AnalysisMocks";
import { fetchAnaliseData } from "./repository/repository";

const cardSx = {
  bgcolor: bgColorCardsDashBoard,
  border: "1px solid rgba(40, 61, 107, 0.4)",
  borderRadius: 1,
  position: "relative" as const,
  overflow: "hidden",
  transition: "0.3s ease",
  "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
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
    pointerEvents: "none",
  },
  "&:hover:before": {
    opacity: 1,
  },
};

function kpiIcon(label: string) {
  switch (label) {
    case "Ticket Médio":
      return <DollarSign color={primaryColor} size={24} />;
    case "Margem de Lucro":
      return <Percent color={colorPositive} size={24} />;
    case "Quantidade de Pedidos":
      return <ShoppingCart color="#197DFA" size={24} />;
    case "Inadimplência":
      return <TrendingDown color={colorNegative} size={24} />;
    default:
      return <Info color={colorOpacity} size={24} />;
  }
}

function kpiIconBg(label: string) {
  switch (label) {
    case "Ticket Médio":
      return "rgba(245,159,10,0.15)";
    case "Margem de Lucro":
      return "rgba(15,250,152,0.15)";
    case "Quantidade de Pedidos":
      return "rgba(25,125,250,0.15)";
    case "Inadimplência":
      return "rgba(255,46,46,0.15)";
    default:
      return "rgba(148,163,184,0.15)";
  }
}

function alertIcon(tipo: string) {
  switch (tipo) {
    case "warning":
      return <AlertTriangle color="#FAE10F" size={18} />;
    case "success":
      return <CheckCircle2 color={colorPositive} size={18} />;
    case "error":
      return <XCircle color={colorNegative} size={18} />;
    default:
      return <Info color="#197DFA" size={18} />;
  }
}

function alertBg(tipo: string) {
  switch (tipo) {
    case "warning":
      return "rgba(250,225,15,0.08)";
    case "success":
      return "rgba(15,250,152,0.08)";
    case "error":
      return "rgba(255,46,46,0.08)";
    default:
      return "rgba(25,125,250,0.08)";
  }
}

const mesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const CATEGORY_COLORS = ["#f59f0a", "#197DFA", "#94a3b8", "#0ffa98", "#ff2e2e", "#FAE10F", "#de6f09", "#8b5cf6"];

/* eslint-disable @typescript-eslint/no-explicit-any */
export function AnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<{ label: string; value: string | null; variacao: number |null; qtd: string | null; total: string | null }[]>([]);
  const [vendasPorCanal, setVendasPorCanal] = useState<{ nome: string; qtd_por_canal: number; percentual: number }[]>([]);
  const [vendasPorCategoria, setVendasPorCategoria] = useState<{ nome: string; qtd_por_categoria: number; percentual: number }[]>([]);
  const [margemProdutos, setMargemProdutos] = useState<{ produto: string; preco_custo: number; preco_venda: number; margem: number; qtd_venda_por_produto: number; lucro_total: number }[]>([]);
  const [topClientes, setTopClientes] = useState<{ id: number; cliente: string; qtd_por_cliente: number; total_por_cliente: number }[]>([]);
  const [evolucaoMensal, setEvolucaoMensal] = useState<{ mes: string; receita_atual: number; receita_anterior: number }[]>([]);

  useEffect(() => {
    const loadAnalise = async () => {
      const result = await fetchAnaliseData();
      if (result.success && result.data) {
        const d = result.data;

        setKpis([
          {
            label: "Ticket Médio",
            value: `R$ ${d.ticket_medio.ticket_mes_atual.toFixed(2)}`,
            variacao: d.ticket_medio.percentual_variacao,
            qtd: null,
            total: null,
          },
          {
            label: "Margem de Lucro",
            value: `${d.margem_lucro.margem_lucro_percentual.toFixed(1)}%`,
            variacao: d.margem_lucro.margem_lucro_percentual,
            qtd: null,
            total: null,
          },
          {
            label: "Inadimplência",
            value: `${d.inadimplencia.porcentagem_mes_atual.toFixed(1)}%`,
            variacao: d.inadimplencia.percentual_variacao,
            qtd: null,
            total: null,
          },
          {
            label: "Quantidade de Pedidos",
            value: null,
            variacao: null,
            qtd: `${d.resumo_vendas.qtd}`,
            total: `${d.resumo_vendas.total}`,
          },
        ]);

        setVendasPorCanal(d.vendas_por_canal);
        setVendasPorCategoria(d.vendas_por_categoria);
        setMargemProdutos(d.margem_por_produto);
        setTopClientes(d.top_clientes);
        setEvolucaoMensal(
          d.evolucao_mensal.map((item: any) => ({
            mes: mesNomes[item.mes - 1] ?? `Mês ${item.mes}`,
            receita_atual: item.receita_ano_atual,
            receita_anterior: item.receita_ano_anterior,
          }))
        );
      }
      setLoading(false);
    };
    loadAnalise();
  }, []);

  if (loading) {
    return (
      <Box component="main" sx={{ flexGrow: 1, bgcolor: bgView, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  function formatCurrency(total: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: bgView,
        pl: { xs: 1, md: 2.5 },
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: 0,
      }}
    >
      <Toolbar />
      <Typography
        variant="h2"
        component="div"
        sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }}
        color="#fff"
        mt={7}
        fontWeight="bold"
      >
        Análise
      </Typography>
      <Typography
        variant="body1"
        component="div"
        fontSize="1.2rem"
        color={colorOpacity}
        mt={1}
        mb={4}
      >
        Insights estratégicos do seu negócio
      </Typography>

      {/* SECAO 1 - KPIs Analiticos */}
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", gap: { xs: 2, md: 2 }, mr: 2 }}
      >
        {kpis.map((kpi) => (
          <Box
            key={kpi.label}
            sx={{
              ...cardSx,
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: 1 },
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minHeight: 150,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontSize="0.9rem" color={colorOpacity}>
                {kpi.label}
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: kpiIconBg(kpi.label),
                }}
              >
                {kpiIcon(kpi.label)}
              </Box>
            </Stack>
            <Typography fontSize="1.8rem" fontWeight="bold" color="#fff">
              {kpi.value} {kpi.qtd}
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.5}>
             
              {
                kpi.total != null ? (
                  <TrendingUp size={14} color={colorPositive} />
                ):
              kpi.variacao !== null && kpi.variacao >= 0 ? (
                <TrendingUp size={14} color={colorPositive} />
              ) : (
                <TrendingDown size={14} color={colorNegative} />
              )}
              <Typography
                fontSize="0.8rem"
                color={
                  kpi.total !==null? colorPositive:
                  kpi.variacao !== null && kpi.variacao >= 0 ? colorPositive : colorNegative}
                fontWeight={600}
              >
                {kpi.variacao !== null && kpi.variacao >= 0 ? "+" : ""}
                {kpi.variacao !== null ? kpi.variacao + '%' : ''}
                {kpi.total !== null ? 'Total: ' + maskCurrency(kpi.total) : ''}
              </Typography>
              <Typography fontSize="0.75rem" color={colorOpacity} ml={0.5}>
               {kpi.total? '': ' vs. mês anterior'}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* SECAO 2 & 4 - Vendas por Canal + Curva ABC */}
      <Box
        display="flex"
        sx={{ flexDirection: { xs: "column", md: "row" }, mt: 4, gap: 2, mr: 2 }}
      >
        {/* Vendas por Canal */}
        <Box sx={{ ...cardSx, flex: 2, p: 3, minHeight: 380 }}>
          <Typography fontSize="1.3rem" fontWeight="bold" color="#fff" mb={0.5}>
            Vendas por Canal
          </Typography>
          <Typography fontSize="0.9rem" color={colorOpacity} mb={2}>
            Distribuição de vendas por canal
          </Typography>
          <Box height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendasPorCanal} barSize={36}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59f0a" stopOpacity={1} />
                    <stop offset="100%" stopColor="#de6f09" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#283d6b" strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="nome" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  formatter={(value: number) => [
                    `${value}`,
                    "Quantidade",
                  ]}
                  contentStyle={{
                    backgroundColor: "#131d34",
                    border: "1px solid #283d6b",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Bar dataKey="qtd_por_canal" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Vendas por Categoria */}
        <Box sx={{ ...cardSx, flex: 1, p: 3, minHeight: 380 }}>
          <Typography fontSize="1.3rem" fontWeight="bold" color="#fff" mb={0.5}>
            Vendas por Categoria
          </Typography>
          <Typography fontSize="0.9rem" color={colorOpacity} mb={2}>
            Distribuição por categoria de produto
          </Typography>
          <Box height={200} display="flex" justifyContent="center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendasPorCategoria}
                  dataKey="percentual"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={0}
                >
                  {vendasPorCategoria.map((_, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "#131d34",
                    border: "1px solid #283d6b",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Stack gap={1.5} mt={1}>
            {vendasPorCategoria.map((item, index) => (
              <Stack key={item.nome} direction="row" alignItems="center" gap={1.5}>
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }} />
                <Typography fontSize="0.85rem" color="#fff" fontWeight={600}>
                  {item.nome}
                </Typography>
                <Typography fontSize="0.8rem" color={colorOpacity}>
                  {item.percentual}% — {item.qtd_por_categoria} vendas
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* SECAO 3 - Margem por Produto */}
      <Box sx={{ ...cardSx, mt: 4, mr: 2, p: 3 }}>
        <Typography fontSize="1.3rem" fontWeight="bold" color="#fff" mb={0.5}>
          Análise de Margem por Produto
        </Typography>
        <Typography fontSize="0.9rem" color={colorOpacity} mb={3}>
          Top 10 produtos por margem de lucro
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Header */}
            <Stack
              direction="row"
              sx={{ borderBottom: "1px solid rgba(40,61,107,0.4)", pb: 1.5, mb: 1 }}
            >
              <Typography flex={2.5} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Produto
              </Typography>
              <Typography flex={1} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Custo
              </Typography>
              <Typography flex={1} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Venda
              </Typography>
              <Typography flex={1} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Margem
              </Typography>
              <Typography flex={1} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Vendidos
              </Typography>
              <Typography flex={2} fontSize="0.8rem" color={colorOpacity} fontWeight={600} textTransform="uppercase">
                Performance
              </Typography>
            </Stack>
            {/* Rows */}
            {margemProdutos.map((prod) => (
              <Stack
                key={prod.produto}
                direction="row"
                alignItems="center"
                sx={{
                  py: 1.5,
                  transition: "0.2s",
                  "&:hover": { bgcolor: "rgba(245,159,10,0.05)" },
                }}
              >
                <Typography flex={2.5} fontSize="0.9rem" color="#fff" fontWeight={500}>
                  {prod.produto}
                </Typography>
                <Typography flex={1} fontSize="0.85rem" color={colorOpacity}>
                  R$ {prod.preco_custo.toFixed(2)}
                </Typography>
                <Typography flex={1} fontSize="0.85rem" color="#fff">
                  R$ {prod.preco_venda.toFixed(2)}
                </Typography>
                <Typography flex={1} fontSize="0.85rem" color={colorPositive} fontWeight={600}>
                  {prod.margem.toFixed(1)}%
                </Typography>
                <Typography flex={1} fontSize="0.85rem" color={colorOpacity}>
                  {prod.qtd_venda_por_produto}
                </Typography>
                <Box flex={2} pr={2}>
                  <LinearProgress
                    variant="determinate"
                    value={prod.margem}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: bgColorTopSellers,
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${primaryColor}, #de6f09)`,
                      },
                    }}
                  />
                </Box>
              </Stack>
            ))}
          </Box>
        </Box>
      </Box>

      {/* SECAO 5 - Evolucao Mensal Comparativa */}
      <Box sx={{ ...cardSx, mt: 4, mr: 2, p: 3, minHeight: 400 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Typography fontSize="1.3rem" fontWeight="bold" color="#fff" mb={0.5}>
              Evolução Mensal Comparativa
            </Typography>
            <Typography fontSize="0.9rem" color={colorOpacity}>
              2026 vs. 2025 — Receita mensal
            </Typography>
          </Box>
          <Stack direction="row" gap={3}>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ width: 12, height: 3, bgcolor: primaryColor, borderRadius: 1 }} />
              <Typography fontSize="0.8rem" color={colorOpacity}>
                2026
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ width: 12, height: 3, bgcolor: colorGray, borderRadius: 1 }} />
              <Typography fontSize="0.8rem" color={colorOpacity}>
                2025
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={evolucaoMensal}>
              <defs>
                <linearGradient id="gradAtual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59f0a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59f0a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAnterior" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colorGray} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={colorGray} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#283d6b" strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="mes" stroke="#94a3b8" />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v: number) => `R$ ${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const label = name === "receita_atual" ? "2026" : "2025";
                  return [`R$ ${value.toLocaleString("pt-BR")}`, label];
                }}
                contentStyle={{
                  backgroundColor: "#131d34",
                  border: "1px solid #283d6b",
                  borderRadius: 8,
                  color: "#fff",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Area
                type="monotone"
                dataKey="receita_atual"
                fill="url(#gradAtual)"
                stroke="none"
                tooltipType="none"
              />
              <Area
                type="monotone"
                dataKey="receita_anterior"
                fill="url(#gradAnterior)"
                stroke="none"
                tooltipType="none"
              />
              <Line
                type="monotone"
                dataKey="receita_atual"
                stroke="#f59f0a"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="receita_anterior"
                stroke={colorGray}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* SECAO 6 & 7 - Top Clientes + Alertas */}
      <Box
        display="flex"
        sx={{ flexDirection: { xs: "column", md: "row" }, mt: 4, gap: 2, mr: 2, mb: 4 }}
      >
        {/* Top Clientes */}
        <Box sx={{ ...cardSx, flex: 1, p: 3 }}>
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <Trophy size={20} color={primaryColor} />
            <Typography fontSize="1.3rem" fontWeight="bold" color="#fff">
              Top Clientes
            </Typography>
          </Stack>
          <Typography fontSize="0.9rem" color={colorOpacity} mb={3}>
            Maiores compradores por faturamento
          </Typography>
          <Stack gap={2}>
            {topClientes.map((cliente, index) => (
              <Stack
                key={cliente.id}
                direction="row"
                alignItems="center"
                gap={2}
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: bgColorTopSellers,
                  transition: "0.2s",
                  "&:hover": { bgcolor: "rgba(245,159,10,0.08)" },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: index === 0 ? "rgba(245,159,10,0.2)" : "rgba(148,163,184,0.1)",
                  }}
                >
                  <Typography
                    fontSize="0.9rem"
                    fontWeight="bold"
                    color={index === 0 ? primaryColor : colorOpacity}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography fontSize="0.9rem" color="#fff" fontWeight={500}>
                    {cliente.cliente}
                  </Typography>
                  <Typography fontSize="0.75rem" color={colorOpacity}>
                    {cliente.qtd_por_cliente} pedidos
                  </Typography>
                </Box>
                <Typography fontSize="0.9rem" color={primaryColor} fontWeight={600}>
                  R$ {cliente.total_por_cliente.toLocaleString("pt-BR")}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Alertas Inteligentes */}
        <Box sx={{ ...cardSx, flex: 1, p: 3 }}>
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <AlertTriangle size={20} color="#FAE10F" />
            <Typography fontSize="1.3rem" fontWeight="bold" color="#fff">
              Alertas Inteligentes
            </Typography>
          </Stack>
          <Typography fontSize="0.9rem" color={colorOpacity} mb={3}>
            Destaques que exigem atenção
          </Typography>
          <Stack gap={1.5}>
            {alertasInteligentes.map((alerta, i) => (
              <Stack
                key={i}
                direction="row"
                alignItems="center"
                gap={1.5}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: alertBg(alerta.tipo),
                  border: "1px solid rgba(40,61,107,0.3)",
                }}
              >
                {alertIcon(alerta.tipo)}
                <Typography fontSize="0.85rem" color="#fff">
                  {alerta.mensagem}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
