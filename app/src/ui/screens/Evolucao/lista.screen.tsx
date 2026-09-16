import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  Stack,
  Avatar,
  Chip,
  Button,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { AccessTime, Person, AddCircle } from "@mui/icons-material";
import {
  humorLabels,
  comportamentoLabels,
  socializacaoLabels,
  sonoLabels,
  aceitacaoAlimentarLabels,
} from "../../../enums/index";
import { Evolucao } from "../../../types/evolucao";
import { listarEvolucoes } from "../../../api/evolucao";
import { listarPacientes } from "../../../api/paciente";
import { Paciente } from "../../../types/paciente";
const humorColor: Record<
  string,
  "success" | "info" | "secondary" | "warning" | "error"
> = {
  feliz: "success",
  neutro: "info",
  triste: "secondary",
  ansioso: "warning",
  irritado: "error",
};

export default function ListaEvolucoes() {
  const [searchParams] = useSearchParams();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [filtro, setFiltro] = useState(searchParams.get("paciente") || "all");
  const navigate = useNavigate();

  const handleNovaEvolucao = () => {
    if (filtro === "all") {
      navigate("/");
    } else {
      navigate(`/evolucoes/nova?paciente=${filtro}`);
    }
  };
  const [dataFiltro, setDataFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [evolucoes, setEvolucoes] = useState<Evolucao[]>([]);

  useEffect(() => {
    carregarEvolucoes();
  }, []);

  const filtradas = evolucoes?.filter((e) => {
    const pacienteValido = filtro === "all" || e.pacienteId === Number(filtro);

    const dataValida = !dataFiltro || e.dataHora.split("T")[0] === dataFiltro;

    return pacienteValido && dataValida;
  });

  const carregarEvolucoes = async () => {
    try {
      setLoading(true);

      const { data } = await listarEvolucoes();
      setEvolucoes(data);
      const { data: dataPacientes } = await listarPacientes();

      setPacientes(dataPacientes);
    } catch (error) {
      console.error("Erro ao carregar evoluções:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Evoluções
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ sm: "center" }}
          justifyContent="flex-end"
        >
          <TextField
            select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            sx={{ width: { xs: "100%", sm: 260 } }}
          >
            <MenuItem value="all">Todos os pacientes</MenuItem>
            {pacientes.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Data"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: { xs: "100%", sm: 180 } }}
          />
          <Tooltip
            title={
              filtro === "all"
                ? "Selecione um paciente na lista"
                : "Nova evolução para o paciente"
            }
          >
            <Button
              variant="contained"
              startIcon={<AddCircle />}
              onClick={handleNovaEvolucao}
            >
              Nova Evolução
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        {loading
          ? [...Array(4)].map((_, index) => (
              <Card key={index} sx={{ p: 2.5 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="text" width={180} height={28} />
                  </Stack>

                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="75%" />

                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={80} height={28} />
                    <Skeleton variant="rounded" width={90} height={28} />
                    <Skeleton variant="rounded" width={70} height={28} />
                  </Stack>

                  <Skeleton variant="text" width="95%" />
                  <Skeleton variant="text" width="80%" />
                </Stack>
              </Card>
            ))
          : filtradas.map((e) => (
              <Card key={e.id} sx={{ p: 2.5 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ sm: "center" }}
                  mb={1.5}
                  gap={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "secondary.light",
                        color: "secondary.dark",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {e.pacienteNome
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Typography fontWeight={600}>{e.pacienteNome}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ color: "text.secondary" }}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTime sx={{ fontSize: 14 }} />
                      <Typography variant="caption">
                        {new Date(e.dataHora).toLocaleString("pt-BR")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Person sx={{ fontSize: 14 }} />
                      <Typography variant="caption">{e.usuarioNome}</Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {e.comentario}
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {e.humores.map((humor) => (
                      <Chip
                        key={humor}
                        label={humorLabels[humor]}
                        color={humorColor[humor]}
                        size="small"
                        variant="outlined"
                      />
                    ))}

                    {e.comportamentos.map((comportamento) => (
                      <Chip
                        key={comportamento}
                        label={comportamentoLabels[comportamento]}
                        size="small"
                      />
                    ))}
                  </Stack>

                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {e.socializacao && (
                      <Typography variant="body2">
                        <strong>Socialização:</strong>{" "}
                        {socializacaoLabels[e.socializacao]}
                      </Typography>
                    )}
                    {e.sono && (
                      <Typography variant="body2">
                        <strong>Sono:</strong> {sonoLabels[e.sono]}
                      </Typography>
                    )}

                    {e.aceitacaoAlimentar && (
                      <Typography variant="body2">
                        <strong>Alimentação:</strong>{" "}
                        {aceitacaoAlimentarLabels[e.aceitacaoAlimentar]}
                      </Typography>
                    )}
                    {e.pressaoArterial && (
                      <Typography variant="body2">
                        <strong>PA:</strong> {e.pressaoArterial}
                      </Typography>
                    )}
                    {e.temperatura && (
                      <Typography variant="body2">
                        <strong>Temperatura:</strong> {e.temperatura} °C
                      </Typography>
                    )}
                    {e.frequenciaCardiaca && (
                      <Typography variant="body2">
                        <strong>FC:</strong> {e.frequenciaCardiaca} bpm
                      </Typography>
                    )}
                    {e.saturacaoOxigenio && (
                      <Typography variant="body2">
                        <strong>SpO₂:</strong> {e.saturacaoOxigenio}%
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Card>
            ))}
      </Stack>
    </Box>
  );
}
