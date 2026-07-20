import api from "./axios";

const BASE_URL = "/pacientes";

function listarPacientes() {
  return api.get(BASE_URL);
}

export { listarPacientes };
