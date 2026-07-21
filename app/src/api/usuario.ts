import { UsuarioForm } from "../types/usuario";
import api from "./axios";

function cadastrarUsuario(data: UsuarioForm) {
  return api.post("/usuarios", data);
}
export { cadastrarUsuario };
