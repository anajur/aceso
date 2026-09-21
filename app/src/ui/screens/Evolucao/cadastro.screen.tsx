import { useEffect, useState } from "react";
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
  Chip,
  Box,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { toast } from "sonner";
import {
  Container,
  HeaderRow,
  FormCard,
  SectionLabel,
  ButtonRow,
} from "./cadastro.styles";
import {
  aceitacaoAlimentarLabels,
  Comportamento,
  comportamentoLabels,
  Humor,
  humorLabels,
  socializacaoLabels,
  sonoLabels,
} from "../../../enums";
import { Controller, useForm } from "react-hook-form";
import { EvolucaoForm } from "../../../types/evolucao";
import { salvarEvolucao } from "../../../api/evolucao";
import { Paciente } from "../../../types/paciente";
import { listarPacientes } from "../../../api/paciente";
import { useAuth } from "../../../hooks/useAuth";

export default function CadastroEvolucao() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [searchParams] = useSearchParams();
  const pacientePre = searchParams.get("paciente") || "";
  const { usuarioId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const nowLocal = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EvolucaoForm>({
    defaultValues: {
      pacienteId: Number(pacientePre),
      dataHora: nowLocal(),
      comentario: undefined,
      humores: [],
      comportamentos: [],
      socializacao: undefined,
      pressaoArterial: undefined,
      saturacaoOxigenio: undefined,
      sono: undefined,
      aceitacaoAlimentar: undefined,
      temperatura: undefined,
      frequenciaCardiaca: undefined,
    },
  });

  async function onSubmit(data: EvolucaoForm) {
    try {
      setLoading(true);
      await salvarEvolucao({
        ...data,
        socializacao: data.socializacao || undefined,
        sono: data.sono || undefined,
        aceitacaoAlimentar: data.aceitacaoAlimentar || undefined,
        pressaoArterial: data.pressaoArterial || undefined,
        usuarioId: usuarioId ?? 1,
      });

      toast.success("Evolução registrada com sucesso!");

      reset({
        pacienteId: pacientePre ? Number(pacientePre) : undefined,
        dataHora: nowLocal(),
        comentario: undefined,
        humores: [],
        comportamentos: [],
        socializacao: undefined,
        pressaoArterial: undefined,
        saturacaoOxigenio: undefined,
        sono: undefined,
        aceitacaoAlimentar: undefined,
        temperatura: undefined,
        frequenciaCardiaca: undefined,
      });
    } catch (error) {
      toast.error("Erro ao registrar evolução.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function buscarPacientes() {
      try {
        const { data } = await listarPacientes();

        setPacientes(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Erro ao carregar pacientes.");
      }
    }

    buscarPacientes();
  }, []);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionLabel>Identificação</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Controller
                name="pacienteId"
                control={control}
                rules={{ required: "Selecione um paciente." }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Paciente"
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value="">Selecione...</MenuItem>

                    {pacientes?.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {errors.pacienteId && (
                <FormHelperText error>Selecione um paciente.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Data e Hora"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("dataHora")}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="comentario"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Descrição da Evolução"
                    multiline
                    rows={4}
                    fullWidth
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider style={{ margin: "24px 0" }} />
          <SectionLabel>Avaliação Psicossocial</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Controller
                name="socializacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Socialização"
                    select
                    fullWidth
                    {...field}
                    value={field.value ?? ""}
                  >
                    <MenuItem value="">—</MenuItem>
                    {Object.entries(socializacaoLabels).map(([k, l]) => (
                      <MenuItem key={k} value={k}>
                        {l}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="humores"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Humor"
                    select
                    fullWidth
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value,
                      )
                    }
                    slotProps={{
                      select: {
                        multiple: true,
                        renderValue: (selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as Humor[]).map((humor) => (
                              <Chip
                                key={humor}
                                label={humorLabels[humor]}
                                size="small"
                              />
                            ))}
                          </Box>
                        ),
                      },
                    }}
                  >
                    {Object.entries(humorLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="comportamentos"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Comportamentos"
                    select
                    fullWidth
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value,
                      )
                    }
                    slotProps={{
                      select: {
                        multiple: true,
                        renderValue: (selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as Comportamento[]).map(
                              (comportamento) => (
                                <Chip
                                  key={comportamento}
                                  label={comportamentoLabels[comportamento]}
                                  size="small"
                                />
                              ),
                            )}
                          </Box>
                        ),
                      },
                    }}
                  >
                    {Object.entries(comportamentoLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Divider style={{ margin: "24px 0" }} />
          <SectionLabel>Avaliação Clínica</SectionLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="sono"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Sono"
                    select
                    defaultValue=""
                    fullWidth
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  >
                    <MenuItem value="">—</MenuItem>
                    {Object.entries(sonoLabels).map(([k, l]) => (
                      <MenuItem key={k} value={k}>
                        {l}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="aceitacaoAlimentar"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Aceitação Alimentar"
                    select
                    defaultValue=""
                    fullWidth
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  >
                    <MenuItem value="">—</MenuItem>
                    {Object.entries(aceitacaoAlimentarLabels).map(([k, l]) => (
                      <MenuItem key={k} value={k}>
                        {l}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="pressaoArterial"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    label="Pressão Arterial (PA)"
                    placeholder="Ex: 120/80"
                    fullWidth
                    {...register("pressaoArterial")}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="temperatura"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Temperatura"
                    type="number"
                    fullWidth
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="frequenciaCardiaca"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Frequência Cardíaca"
                    type="number"
                    fullWidth
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="saturacaoOxigenio"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Saturação de Oxigênio (SpO₂)"
                    type="number"
                    inputProps={{
                      min: 0,
                    }}
                    fullWidth
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                      )
                    }
                  />
                )}
              />
            </Grid>
          </Grid>

          <ButtonRow>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              Salvar
            </Button>
          </ButtonRow>
        </form>
      </FormCard>
    </Container>
  );
}
