import { EvolucaoForm } from "../types/evolucao";
import api from "./axios";

const BASE_URL = "/evolucoes";

function listarEvolucoes() {
  return api.get(BASE_URL);
}

function salvarEvolucao(evolucao: EvolucaoForm) {
  const { pacienteId, ...body } = evolucao;

  return api.post(`/pacientes/${pacienteId}${BASE_URL}`, body);
}

export { listarEvolucoes, salvarEvolucao };
