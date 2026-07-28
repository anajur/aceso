import { PacienteForm } from "../types/paciente";
import api from "./axios";

const BASE_URL = "/pacientes";

function listarPacientes() {
  return api.get(BASE_URL);
}

function salvarPaciente(paciente: PacienteForm) {
  return api.post(`${BASE_URL}`, paciente);
}

function buscarResumoPaciente(id: number) {
  return api.get(`${BASE_URL}/${id}/resumo`);
}

function atualizarStatusPaciente(id: number, status: string) {
  return api.patch(`${BASE_URL}/${id}/status`, { status });
}

export {
  listarPacientes,
  salvarPaciente,
  buscarResumoPaciente,
  atualizarStatusPaciente,
};
