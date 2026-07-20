import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </AuthContext.Provider>
  );
}
