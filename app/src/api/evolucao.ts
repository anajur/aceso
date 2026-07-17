import { Evolucao } from "../ui/mockadata";
import api from "./axios";

export const listarEvolucoes = async (): Promise<Evolucao[]> => {
  const { data } = await api.get("/evolucoes");
  return data;
};

export const buscarEvolucaoPorId = async (id: number): Promise<Evolucao> => {
  const { data } = await api.get(`/evolucoes/${id}`);
  return data;
};

export const cadastrarEvolucao = async (evolucao: Evolucao) => {
  const { data } = await api.post("/evolucoes", evolucao);
  return data;
};

export const atualizarEvolucao = async (
  id: number,
  evolucao: Evolucao
) => {
  const { data } = await api.put(`/evolucoes/${id}`, evolucao);
  return data;
};

export const excluirEvolucao = async (id: number) => {
  await api.delete(`/evolucoes/${id}`);
};