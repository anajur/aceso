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
import { ListaEvolucoes, CadastroEvolucao } from "./ui/screens/index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
