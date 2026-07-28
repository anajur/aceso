import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Stack,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  Save,
  ArrowBack,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { cadastrarUsuario } from "../../../api/usuario";
import { UsuarioForm } from "../../../types/usuario";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { register, handleSubmit, watch } = useForm<UsuarioForm>();
  const senha = watch("senha");
  const confirmar = watch("confirmarSenha");
  const [loading, setLoading] = useState(true);
  const onSubmit = async (data: UsuarioForm) => {
    if (data.senha.length < 6) {
      toast.error("A senha deve ter ao menos 6 caracteres.");
      return;
    }

    if (data.senha !== data.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      await cadastrarUsuario({
        nome: data.nome,
        email: data.email,
        coren: data.coren,
        senha: data.senha,
      });

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch {
      toast.error("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto" }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Cadastrar Usuário
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Adicione um novo usuário ao sistema
          </Typography>
        </Box>
      </Stack>

      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Nome Completo" required {...register("nome")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="E-mail"
                type="email"
                required
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`COREN (opcional)`}
                placeholder="COREN-UF 000000"
                {...register("coren")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Senha"
                {...register("senha")}
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setMostrarSenha((v) => !v)}
                        edge="end"
                        size="small"
                      >
                        {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmar Senha"
                {...register("confirmarSenha")}
                type={mostrarSenha ? "text" : "password"}
                value={confirmar}
                required
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Salvar Usuário
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
