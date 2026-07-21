import api from "./axios";

const BASE_URL = "/alertas";

function atualizarAlertas() {
  return api.post(`${BASE_URL}/atualizar`);
}

function listarAlertas() {
  return api.get(`${BASE_URL}`);
}

function marcarAlertaComoLido(id: number) {
  return api.patch(`${BASE_URL}/${id}/lido`);
}

export { atualizarAlertas, listarAlertas, marcarAlertaComoLido };
