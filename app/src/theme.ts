import { createTheme, Shadows } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#12d091",
      dark: "#047857",
      light: "#34d399",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a78bfa",
      dark: "#7c3aed",
      light: "#c4b5fd",
      contrastText: "#ffffff",
    },
    background: {
      default: "#faf9fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1b2e",
      secondary: "#6b6880",
    },
    divider: "#ece9f4",
    success: { main: "#12d091" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    info: { main: "#a78bfa" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 500, letterSpacing: "-0.01em" },
    h2: { fontWeight: 500, letterSpacing: "-0.01em" },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  shadows: [
    "none",
    "0 1px 2px rgba(30,27,46,0.04)",
    "0 1px 3px rgba(30,27,46,0.06)",
    ...Array(22).fill("0 2px 6px rgba(30,27,46,0.06)"),
  ] as Shadows,
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none", border: "1px solid #ece9f4" },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: "1px solid #ece9f4" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
      styleOverrides: {
        root: { borderBottom: "1px solid #ece9f4", backgroundColor: "#ffffff" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginInline: 8,
          marginBlock: 2,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small", fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
  },
});

export default theme;
