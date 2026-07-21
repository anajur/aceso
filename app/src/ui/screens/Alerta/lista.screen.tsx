import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import { Warning, CheckCircle, LightbulbOutlined } from "@mui/icons-material";
import {
  atualizarAlertas,
  listarAlertas,
  marcarAlertaComoLido,
} from "../../../api/alerta";
import { toast } from "sonner";
import { Alerta } from "../../../types/alerta";
import { GrauUrgencia, grauUrgenciaLabels } from "../../../enums/grauUrgencia";

const sevColor: Record<GrauUrgencia, "error" | "warning" | "success"> = {
  [GrauUrgencia.ALTO]: "error",
  [GrauUrgencia.MEDIO]: "warning",
  [GrauUrgencia.BAIXO]: "success",
};

export default function ListaAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  async function carregarAlertas() {
    try {
      const { data } = await listarAlertas();

      setAlertas(data);
      try {
        await atualizarAlertas();
      } catch (error) {
        console.error("Erro ao atualizar alertas:", error);
        toast.warning("Não foi possível atualizar os alertas.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao carregar alertas.");
    }
  }

  const marcarLido = async (id: number) => {
    try {
      await marcarAlertaComoLido(id);

      setAlertas((alertas) =>
        alertas.map((a) => (a.id === id ? { ...a, lido: true } : a)),
      );

      toast.success("Alerta marcado como lido.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erro ao atualizar alerta.");
    }
  };
  useEffect(() => {
    carregarAlertas();
  }, []);
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
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Alertas
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {alertas.map((a) => (
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
                    <Typography fontWeight={600}>{a.paciente.nome}</Typography>
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
              {a.status === "PENDENTE" && (
                <Button
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => marcarLido(a.id)}
                >
                  Marcar como lido
                </Button>
              )}
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
      </Stack>
    </Box>
  );
}
