import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Divider,
  FormHelperText,
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { toast } from "sonner";
import {
  Container,
  HeaderRow,
  FormCard,
  SectionLabel,
  ButtonRow,
} from "./cadastro.styles";
import { pacientes } from "../../mockadata";
import {
  aceitacaoAlimentarLabels,
  comportamentoLabels,
  humorLabels,
  nivelConscienciaLabels,
  socializacaoLabels,
  sonoLabels,
} from "../../../enums";

export default function CadastroEvolucao() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pacientePre = searchParams.get("paciente") || "";

  const [paciente, setPaciente] = useState(pacientePre);
  const [pacienteErro, setPacienteErro] = useState(false);

  const nowLocal = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente) {
      setPacienteErro(true);
      toast.error("Selecione um paciente para registrar a evolução.");
      return;
    }
    setPacienteErro(false);
    toast.success("Evolução registrada com sucesso!");
    navigate("/evolucoes");
  };

  return (
    <Container>
      <HeaderRow>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <div>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Registrar Evolução
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registre a evolução do paciente
          </Typography>
        </div>
      </HeaderRow>

      <FormCard>
        <form onSubmit={handleSubmit}>
          <SectionLabel>Identificação</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                label="Paciente"
                select
                required
                value={paciente}
                onChange={(e) => {
                  setPaciente(e.target.value);
                  if (e.target.value) setPacienteErro(false);
                }}
                error={pacienteErro}
                fullWidth
              >
                <MenuItem value="">Selecione…</MenuItem>
                {pacientes.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.nome} — Leito {p.leito}
                  </MenuItem>
                ))}
              </TextField>
              {pacienteErro && (
                <FormHelperText error>Selecione um paciente.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Data e Hora"
                type="datetime-local"
                defaultValue={nowLocal()}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descrição da Evolução"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>

          <Divider style={{ margin: "24px 0" }} />
          <SectionLabel>Avaliação Psicossocial</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField label="Humor" select defaultValue="" fullWidth>
                <MenuItem value="">—</MenuItem>
                {Object.entries(humorLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Comportamento" select defaultValue="" fullWidth>
                <MenuItem value="">—</MenuItem>
                {Object.entries(comportamentoLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Socialização" select defaultValue="" fullWidth>
                <MenuItem value="">—</MenuItem>
                {Object.entries(socializacaoLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Divider style={{ margin: "24px 0" }} />
          <SectionLabel>Avaliação Clínica</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nível de Consciência"
                select
                defaultValue=""
                fullWidth
              >
                <MenuItem value="">—</MenuItem>
                {Object.entries(nivelConscienciaLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Sono" select defaultValue="" fullWidth>
                <MenuItem value="">—</MenuItem>
                {Object.entries(sonoLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Aceitação Alimentar"
                select
                defaultValue=""
                fullWidth
              >
                <MenuItem value="">—</MenuItem>
                {Object.entries(aceitacaoAlimentarLabels).map(([k, l]) => (
                  <MenuItem key={k} value={k}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Temperatura (°C)"
                type="number"
                inputProps={{ step: 0.1, min: 30, max: 45 }}
                placeholder="Ex: 36.5"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Frequência Cardíaca (bpm)"
                type="number"
                inputProps={{ step: 1, min: 20, max: 250 }}
                placeholder="Ex: 78"
                fullWidth
              />
            </Grid>
          </Grid>

          <ButtonRow>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Registrar Evolução
            </Button>
          </ButtonRow>
        </form>
      </FormCard>
    </Container>
  );
}
