
import {
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Sun } from "lucide-react";
import { useAuth } from "./provider/AuthProvider";
import { CurrentPageEnum } from "./enums/CurrentPageEnum";
import { LoginForm } from "./components/LoginForm";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import { AnimatePresence } from "framer-motion";
import { AnimatedPage } from "./components/AnimatedPage";



export default function AuthPage() {
const { currentPage } = useAuth();


  const currentPageView = () => {
    switch (currentPage) {
      case CurrentPageEnum.Signin:
        return <LoginForm />;
      case CurrentPageEnum.Register:
        return <Register />;
      case CurrentPageEnum.ForgotPassword:
        return <ForgotPassword />;
      default:
        return null;
    }
  };

    return (
      <Grid container sx={{ minHeight: "100vh"}}>
        {/* LADO ESQUERDO */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: "relative",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              p: 6,
              color: "primary.contrastText",
              background: "linear-gradient(135deg, #0f1729 0%, #1c253a 100%)",
            }}
          >
            {/* === Overlay Grid Pattern === */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",

              "&::before, &::after": {
                content: '""',
                position: "absolute",
                borderRadius: "50%",
                filter: "blur(120px)",
                opacity: 0.35,
                mixBlendMode: "screen",
              },

              // Left Glow
              "&::before": {
                width: 500,
                height: 500,
                top: 80,
                left: 0,
                background: "radial-gradient(circle at center, rgba(245, 159, 10, 1), transparent 60%)",
              },

              // Right Glow
              "&::after": {
                width: 500,
                height: 550,
                bottom: 100,
                right: 0,
                background: "radial-gradient(circle at center,  rgba(245, 159, 10, 1), transparent 60%)",
              },
            }}
          />
          <Box
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0.02
                , overflow:"auto", overflowX:"auto", overflowY:"auto",
                pointerEvents: "none",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                },
              }}
            />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
              pointerEvents: "none",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }
            }}
          />
            {/* Content wrapper */}
            <Box sx={{ position: "relative", zIndex: 10, height: "100%" }}>
              
              {/* Logo */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt:4, ml:5 }}>
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    background: "linear-gradient(135deg, #f59f0a 0%, #e68a00 100%)",
                    boxShadow: "0 0 25px rgba(245,159,10,0.35)",
                  }}
                >
                  <Sun color="#ffffff" size={28} />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ letterSpacing: "-0.5px", fontSize:'38px' }}
                >
                  Lumena ERP
                </Typography>
              </Box>

              {/* Main content */}
              <Box sx={{ mt: 35, maxWidth: 480, animation: "fadeIn 1s ease forwards",ml:5 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  fontSize={40}
                  sx={{ lineHeight: 1.2 }}
                >
                  Gerencie seu negócio com{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    clareza
                  </Box>{" "}
                  e{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    eficiência
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  fontSize={20}
                  sx={{
                    mt: 3,
                    opacity: 0.7,
                    lineHeight: 1.6,
                    
                  }}
                >
                  Uma plataforma completa para controle financeiro, vendas, estoque e 
                  muito mais. Simplifique sua gestão empresarial.
                </Typography>
              </Box>

              {/* Footer */}
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.5,
                  ml:5,
                  mt:30
                }}
              >
                © 2024 Lumena ERP. Todos os direitos reservados.
              </Typography>
            </Box>
          </Grid>
        <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        square
        sx={{
          position: "relative",   // necessário para os children absolute
          overflow: "hidden",     // corta overflow durante animação
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f6f7f9",
        }}
      >
        <Box sx={{ width: "100%", maxWidth:"480px", height: "100%", position: "relative", m:{xs:2, md:0,}}}>
          <AnimatePresence mode="wait">
            <AnimatedPage customKey={currentPage}>
              {/* currentPageView() deve retornar somente o conteúdo INTERNO (sem Grid item) */}
              {currentPageView()}
            </AnimatedPage>
          </AnimatePresence>
        </Box>
      </Grid>
      </Grid>
    );
  }
