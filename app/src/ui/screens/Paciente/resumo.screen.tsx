import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  MenuItem,
  Grid,
  CircularProgress,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

import {
  Container,
  Header,
  PatientSelect,
  InfoCard,
  HighlightSection,
  InfoSection,
  SectionLabel,
  SectionText,
  StatusSelect,
} from "./resumo.styles";
import { Paciente, Resumo } from "../../../types/paciente";
import { toast } from "sonner";
import {
  atualizarStatusPaciente,
  buscarResumoPaciente,
  listarPacientes,
} from "../../../api/paciente";
import { GrauUrgencia, grauUrgenciaLabels } from "../../../enums/grauUrgencia";
import { LightbulbOutlined, Warning } from "@mui/icons-material";

const statusOptions = [
  { value: "ATIVO", label: "Ativo" },
  { value: "ALTA", label: "Alta" },
  { value: "TRANSFERIDO", label: "Transferido" },
];

const sevColor: Record<GrauUrgencia, "error" | "warning" | "success"> = {
  [GrauUrgencia.ALTO]: "error",
  [GrauUrgencia.MEDIO]: "warning",
  [GrauUrgencia.BAIXO]: "success",
};

export default function ResumoPaciente() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [paciente, setPaciente] = useState<Resumo>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(paciente?.status || "ativo");
  const [searchParams] = useSearchParams();
  const [pacienteId, setPacienteId] = useState(
    searchParams.get("paciente") || "1",
  );

  useEffect(() => {
    setStatus(paciente?.status || "ativo");
  }, [paciente]);

  const datas = paciente?.graficoHumor.map((x) => x.data) ?? [];

  const humores = paciente?.graficoHumor.map((x) => x.valor) ?? [];

  const barLabels = paciente?.graficoComportamento.map((x) => x.nome) ?? [];

  const barValues =
    paciente?.graficoComportamento.map((x) => x.quantidade) ?? [];

  useEffect(() => {
    carregarPacientes();
  }, []);

  useEffect(() => {
    if (pacienteId) {
      carregarResumo();
    }
  }, [pacienteId]);

  const carregarPacientes = async () => {
    try {
      const { data } = await listarPacientes();
      setPacientes(data);
    } catch {
      toast.error("Erro ao carregar pacientes.");
    }
  };

  const carregarResumo = async () => {
    try {
      setLoading(true);

      const { data } = await buscarResumoPaciente(Number(pacienteId));

      setPaciente(data);
      setStatus(data.status);
    } catch {
      toast.error("Erro ao carregar resumo.");
    } finally {
      setLoading(false);
    }
  };

  const alterarStatus = async (novoStatus: string) => {
    try {
      await atualizarStatusPaciente(Number(pacienteId), novoStatus);

      setStatus(novoStatus);

      toast.success("Status atualizado.");
    } catch {
      toast.error("Erro ao atualizar status.");
    }
  };

  function formatarData(data: string) {
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <Container>
      <Header>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Resumo do Paciente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Informações principais e evolução recente
          </Typography>
        </Box>
        <PatientSelect
          select
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
        >
          {pacientes.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.nome}
            </MenuItem>
          ))}
        </PatientSelect>
      </Header>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {paciente && (
            <InfoCard>
              <InfoSection>
                <SectionLabel>Nome</SectionLabel>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <Typography variant="h5" fontWeight={600}>
                    {paciente.nome}
                  </Typography>

                  <StatusSelect
                    select
                    size="small"
                    label="Status"
                    value={status}
                    onChange={(e) => alterarStatus(e.target.value)}
                    sx={{ minWidth: 180 }}
                  >
                    {statusOptions.map((s) => (
                      <MenuItem key={s.value} value={s.value}>
                        {s.label}
                      </MenuItem>
                    ))}
                  </StatusSelect>
                </Box>
              </InfoSection>

              <HighlightSection>
                <SectionLabel>Pontos de Atenção</SectionLabel>
                <SectionText>
                  {paciente.pontosAtencao || "Sem observações."}
                </SectionText>
              </HighlightSection>

              <InfoSection>
                <SectionLabel>Remédios de Uso Contínuo</SectionLabel>
                <SectionText>
                  {paciente.remediosUsoContinuo || "Nenhum registrado."}
                </SectionText>
              </InfoSection>
            </InfoCard>
          )}

          <Typography variant="h6" fontWeight={600} mb={2}>
            Gráficos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Card sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  Humor ao Longo do Tempo
                </Typography>
                {humores.length > 0 ? (
                  <LineChart
                    height={280}
                    xAxis={[{ scaleType: "point", data: datas }]}
                    yAxis={[
                      {
                        min: 1,
                        max: 5,
                        tickNumber: 5,
                        valueFormatter: (value) => {
                          const humores = {
                            1: "Irritado",
                            2: "Triste",
                            3: "Ansioso",
                            4: "Calmo",
                            5: "Feliz",
                          };

                          return humores[value as keyof typeof humores] ?? "";
                        },
                      },
                    ]}
                    series={[
                      {
                        data: humores,
                        color: "#10b981",
                        curve: "monotoneX",
                      },
                    ]}
                    margin={{ left: 75, right: 20, top: 20, bottom: 30 }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 280,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "text.secondary",
                    }}
                  >
                    Ainda não há dados de humor para exibir.
                  </Box>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  Distribuição de Comportamento
                </Typography>
                {barValues.length > 0 ? (
                  <BarChart
                    height={320}
                    margin={{
                      left: 40,
                      right: 20,
                      top: 20,
                      bottom: 70,
                    }}
                    xAxis={[
                      {
                        scaleType: "band",
                        data: barLabels,
                        colorMap: {
                          type: "ordinal",
                          values: barLabels,
                          colors: ["#12aad0", "#f18d09", "#ff0000", "#7c3aed"],
                        },
                      },
                    ]}
                    series={[
                      {
                        data: barValues,
                      },
                    ]}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 280,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "text.secondary",
                    }}
                  >
                    Ainda não há dados de comportamento para exibir.
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Alertas
          </Typography>
          {paciente?.alertas?.map((a) => (
            <Card
              key={a.id}
              sx={{
                p: 2.5,
                bgcolor:
                  a.status === "LIDO" ? "action.hover" : "background.paper",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ sm: "flex-start" }}
                gap={1.5}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                  flex={1}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor:
                        a.grauUrgencia === GrauUrgencia.ALTO
                          ? "error.light"
                          : "warning.light",
                      color:
                        a.grauUrgencia === GrauUrgencia.ALTO
                          ? "error.dark"
                          : "warning.dark",
                    }}
                  >
                    <Warning fontSize="small" />
                  </Avatar>
                  <Box flex={1}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={0.5}
                      flexWrap="wrap"
                    >
                      <Typography fontWeight={600}>
                        {a.paciente.nome}
                      </Typography>
                      <Chip
                        label={grauUrgenciaLabels[a.grauUrgencia]}
                        color={sevColor[a.grauUrgencia]}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {a.resumo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatarData(a.dataAlerta)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Box
                sx={{
                  mt: 2,
                  ml: { sm: 6.5 },
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: "secondary.light",
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <LightbulbOutlined
                  sx={{ fontSize: 20, color: "secondary.dark", mt: 0.25 }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="secondary.dark"
                    sx={{ display: "block" }}
                  >
                    Sugestão
                  </Typography>
                  <Typography variant="body2">{a.sugestao}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
