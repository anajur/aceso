import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  MenuItem,
  Grid,
  CircularProgress,
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

const statusOptions = [
  { value: "ATIVO", label: "Ativo" },
  { value: "ALTA", label: "Alta" },
  { value: "TRANSFERIDO", label: "Transferido" },
];

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
                <LineChart
                  height={280}
                  xAxis={[{ scaleType: "point", data: datas }]}
                  yAxis={[{ min: 0, max: 5 }]}
                  series={[
                    {
                      data: humores,
                      color: "#10b981",
                      label: "Humor",
                      curve: "monotoneX",
                    },
                  ]}
                  margin={{ left: 40, right: 20, top: 20, bottom: 30 }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={2}>
                  Distribuição de Comportamento
                </Typography>
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
                        colors: ["#12d091", "#ff0000", "#e1f436", "#f18d09"],
                      },
                    },
                  ]}
                  series={[
                    {
                      data: barValues,
                    },
                  ]}
                />
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
