import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  InputAdornment,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  MenuItem,
} from "@mui/material";
import {
  Search,
  Add,
  Description,
  BarChart,
  AddCircle,
} from "@mui/icons-material";
import {
  Container,
  Header,
  Actions,
  SearchField,
  PacienteCard,
  CardRow,
  InfoRow,
  PacienteAvatar,
  CardActions,
  EvolucaoStatus,
} from "./lista.styles";
import { Paciente } from "../../../types/paciente";
import { listarPacientes } from "../../../api/paciente";
import { toast } from "sonner";

export default function ListaPacientes() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("ATIVO");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const filtrados = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) && p.status === status,
  );

  async function carregarPacientes() {
    try {
      setLoading(true);

      const { data: dataPacientes } = await listarPacientes();

      setPacientes(dataPacientes);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar pacientes:");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPacientes();
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Pacientes
          </Typography>
        </div>
        <Actions>
          <Button
            component={Link}
            to="/evolucoes/nova"
            variant="outlined"
            startIcon={<AddCircle />}
          >
            Nova Evolução
          </Button>
          <Button
            component={Link}
            to="/pacientes/novo"
            variant="contained"
            startIcon={<Add />}
          >
            Novo Paciente
          </Button>
        </Actions>
      </Header>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <SearchField
          placeholder="Buscar paciente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />

        <SearchField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="ATIVO">Ativo</MenuItem>
          <MenuItem value="ALTA">Alta</MenuItem>
          <MenuItem value="TRANSFERIDO">Transferido</MenuItem>
        </SearchField>
      </Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {filtrados.length === 0 ? (
            <Box
              py={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" color="text.secondary">
                Nenhum paciente encontrado
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Tente alterar a busca ou o filtro de status.
              </Typography>
            </Box>
          ) : (
            filtrados.map((p) => {
              const done = p.possuiEvolucaoHoje;
              return (
                <PacienteCard key={p.id}>
                  <CardRow>
                    <InfoRow>
                      <PacienteAvatar>
                        {p.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </PacienteAvatar>
                      <div>
                        <Typography style={{ fontWeight: 600 }}>
                          {p.nome}
                        </Typography>
                      </div>
                    </InfoRow>
                    <CardActions>
                      <EvolucaoStatus $done={done}>
                        {done
                          ? "Evolução do dia registrada"
                          : "Evolução pendente"}
                      </EvolucaoStatus>
                      <Tooltip title="Registrar evolução">
                        <IconButton
                          component={Link}
                          to={`/evolucoes/nova?paciente=${p.id}`}
                          color="primary"
                          size="small"
                        >
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                      <Button
                        component={Link}
                        to={`/evolucoes?paciente=${p.id}`}
                        size="small"
                        startIcon={<Description />}
                        color="inherit"
                      >
                        Evoluções
                      </Button>
                      <Button
                        component={Link}
                        to={`/resumo?paciente=${p.id}`}
                        size="small"
                        startIcon={<BarChart />}
                        color="inherit"
                      >
                        Resumo
                      </Button>
                    </CardActions>
                  </CardRow>
                </PacienteCard>
              );
            })
          )}
        </Stack>
      )}
    </Container>
  );
}
