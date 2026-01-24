import { createTheme } from "@mui/material/styles";

export const primaryColor = "#f59f0a"
export const rgbPrimaryColor = "#fac9743d"
export const bordasComponents = "1px solid rgba(40, 61, 107, 0.4)"
export const bgComponents = "#1a2849ff"
export const colorOpacity = "#8a98b8ff"
export const bgView = "#0f1729"
export const bgColorCardsDashBoard = "#131d34"
export const bgColorNegative = "#9b5d5950";
export const colorNegative = "#FF2E2E";
export const colorGray = "#94a3b8";
export const bgColorTopSellers = "#182543";
export const bgColorDatePicker ="#rgba(40, 61, 107, 0.9)";


//colors icons
export const shopIconColor = "#197DFA";
export const bgshopColor = "#197efa2a";

export const colorPositive = "#0FFA98"
export const bgColorPositive = "#0ffa9823"

export const userColorIcon = "#AD0FFA";
export const userBgColorIcon = "#ac0ffa1e";

export const productColorIcon = "#FAE10F";
export const productBgColorIcon ="#fae20f23";


export const hoverGlow = {
  "&:hover": {
    boxShadow: "0 0 25px rgba(40, 61, 107, 0.6)",
    borderColor: "rgba(40, 61, 107, 0.9)",
    transform: "translateY(0px)",
  },
};
export const hoverPrimary = {
 "&:hover": {
            transform: "scale(1.05)",
            color: "linear-gradient(90deg, #f7a41c, #b5770a)",
          },
};



export const customTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#f59f0a",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#f3f4f6",
      contrastText: "#0f1729",
    },

    background: {
      default: "#f6f7f9", // Background
      paper: "#ffffff",   // Cards / Popovers
    },

    text: {
      primary: colorOpacity,
      secondary: "#6b7280",
    },

    error: {
      main: "#ef4343",
      contrastText: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },

  shape: {
    borderRadius: 12, // 0.75rem ≈ 12px
  },

shadows: [
  "none",
  "0px 1px 3px rgba(0,0,0,0.10)",
  "none", "none", "none", "none", "none",
  "none", "none", "none", "none", "none",
  "none", "none", "none", "none", "none",
  "none", "none", "none", "none", "none",
  "none", "none", "none", 
],

  components: {
    // ------------------------------
    //  BUTTONS
    // ------------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: bgColorTopSellers,
          borderRadius: "0.75rem",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 1px 3px rgba(0,0,0,0.10)",
          },
        },
      },
    },

    // ------------------------------
    //  TEXTFIELDS & INPUTS
    // ------------------------------
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          backgroundColor: "#ffffff",
                input: {
        color: colorOpacity,
        WebkitTextFillColor: colorOpacity,
      },
          "& fieldset": {
            borderColor: "#e5e7eb", // Border
          },
          "&:hover fieldset": {
            borderColor: "#0f1729",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#f59f0a", // Focus Ring
            boxShadow: "0 0 0 3px rgba(245,159,10,0.25)",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#6b7280",
          "&.Mui-focused": {
            color: "#f59f0a",
          },
        },
      },
    },

    // ------------------------------
    //  CARDS
    // ------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0f1729",
          borderRadius: "0.75rem",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.10)",
        },
      },
    },

    // ------------------------------
    //  POPOVERS / MENUS
    // ------------------------------
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          color: "#0f1729",
          borderRadius: "0.75rem",
        },
      },
    },
    

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          color: "#ffff",
          borderRadius: "0.75rem",
        },
      },
    },
  },
});


export const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: bgColorTopSellers,
    color: "#fff",
    primaryColor: "#fff",
    "&.MuiInputBase-root": {
    backgroundColor: bgColorTopSellers,
    },
  },

  /* BORDA PADRÃO */
  "& .MuiOutlinedInput-notchedOutline": {
    border: bordasComponents,
  },
/* TEXTO DISABLED */
"& .MuiInputBase-root.Mui-disabled input": {
  color: colorOpacity,
  WebkitTextFillColor: colorOpacity,
},

/* PLACEHOLDER DISABLED */
"& .MuiInputBase-root.Mui-disabled input::placeholder": {
  color: colorOpacity,
  opacity: 1,
},

  /* HOVER */
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${primaryColor}`,
  },

  /* FOCUS */
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${primaryColor}`,
    boxShadow: "0 0 0 3px rgba(245,159,10,0.25)",
    color: "#FFFF",
  },

  /* LABEL */
  "& .MuiInputLabel-root": {
    color: colorOpacity,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: primaryColor,
  },

  /* TEXTO */
  "& .MuiInputBase-input": {
    color: "#fff",
  },

  /* PLACEHOLDER */
  "& .MuiInputBase-input::placeholder": {
    color: colorOpacity,
    opacity: 1,
  },

  /* ÍCONE */
  "& .MuiIconButton-root": {
    color: "#FFFF",
  },

  "& .MuiIconButton-root:hover": {
    color: "#FFFF",
  },

  "& .MuiFormHelperText-root": {
    color: "#FFFF",
  },
};
