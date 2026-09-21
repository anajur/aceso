import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { Favorite, Login as LoginIcon } from "@mui/icons-material";
import { toast } from "sonner";
import { Page, LoginCard, BrandRow, BrandCircle, Footer } from "./login.styles";
import { login } from "../../../api/auth";
import { useAuth } from "../../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(true);
  const { setUsuarioId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Informe email e senha");
      return;
    }

    try {
      setLoading(true);
      const { data } = await login(email, senha);

      setUsuarioId(data.usuarioId);

      toast.success("Bem-vindo(a)!");
      navigate("/");
    } catch {
      toast.error("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <LoginCard>
        <BrandRow>
          <BrandCircle>
            <Favorite />
          </BrandCircle>
          <Box>
            <Typography
              variant="h6"
              style={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              ACESO
            </Typography>
          </Box>
        </BrandRow>

        <Box>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Entrar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Acesse sua conta para continuar
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
              startIcon={<LoginIcon />}
            >
              Entrar
            </Button>
          </Box>
        </form>

        <Footer>© {new Date().getFullYear()} ACESO</Footer>
      </LoginCard>
    </Page>
  );
}
