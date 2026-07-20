import api from "./axios";

function login(email: string, senha: string) {
  return api.post("/auth/login", {
    email,
    senha,
  });
}

export { login };
