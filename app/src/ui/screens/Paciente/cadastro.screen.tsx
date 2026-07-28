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
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { PacienteForm } from "../../../types/paciente";
import { salvarPaciente } from "../../../api/paciente";

export default function CadastroPaciente() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PacienteForm>({
    defaultValues: {
      nome: "",
      remediosUsoContinuo: "",
      pontosAtencao: "",
    },
  });

  const onSubmit = async (data: PacienteForm) => {
    try {
      await salvarPaciente(data);

      toast.success("Paciente cadastrado com sucesso!");
      navigate("/pacientes");
    } catch (error) {
      toast.error("Erro ao cadastrar paciente.");
      console.error(error);
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
            Cadastrar Paciente
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Preencha os dados do novo paciente
          </Typography>
        </Box>
      </Stack>

      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome Completo"
                fullWidth
                error={!!errors.nome}
                helperText={errors.nome?.message}
                {...register("nome", {
                  required: "Informe o nome do paciente.",
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Remédios de Uso Contínuo"
                placeholder="Ex: Losartana 50mg pela manhã; Sertralina 50mg à noite"
                multiline
                rows={3}
                fullWidth
                {...register("remediosUsoContinuo")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Pontos de Atenção"
                placeholder="Ex: Hipertensão, diabetes, alergias, histórico relevante"
                helperText="Condições clínicas, alergias ou observações importantes para a equipe."
                multiline
                rows={3}
                fullWidth
                {...register("pontosAtencao")}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>

            <Button type="submit" variant="contained" startIcon={<Save />}>
              Salvar Paciente
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
