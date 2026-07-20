import { createContext } from "react";

export type AuthContextType = {
  usuarioId: number | null;
  setUsuarioId: (id: number | null) => void;
};

export const AuthContext = createContext({} as AuthContextType);
