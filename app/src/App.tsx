import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import { GlobalStyle } from "./ui/styles/global";
import theme from "./theme";
import { Layout } from "./ui/components/index";
import {
  ListaEvolucoes,
  CadastroEvolucao,
  ListaPacientes,
  Login,
  ListaAlertas,
  CadastroUsuario,
  CadastroPaciente,
  ResumoPaciente,
} from "./ui/screens/index";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <GlobalStyle />
        <Sonner position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Layout>
                  <ListaEvolucoes />
                </Layout>
              }
            />
            <Route
              path="/evolucoes"
              element={
                <Layout>
                  <ListaEvolucoes />
                </Layout>
              }
            />
            <Route
              path="/evolucoes/nova"
              element={
                <Layout>
                  <CadastroEvolucao />
                </Layout>
              }
            />
            <Route
              path="/pacientes"
              element={
                <Layout>
                  <ListaPacientes />
                </Layout>
              }
            />
            <Route
              path="/alertas"
              element={
                <Layout>
                  <ListaAlertas />
                </Layout>
              }
            />
            <Route
              path="/usuarios/novo"
              element={
                <Layout>
                  <CadastroUsuario />
                </Layout>
              }
            />
            <Route
              path="/pacientes/novo"
              element={
                <Layout>
                  <CadastroPaciente />
                </Layout>
              }
            />
            <Route
              path="/resumo"
              element={
                <Layout>
                  <ResumoPaciente />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
