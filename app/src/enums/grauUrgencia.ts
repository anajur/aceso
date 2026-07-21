export enum GrauUrgencia {
  BAIXO = "BAIXO",
  MEDIO = "MEDIO",
  ALTO = "ALTO",
}

export const grauUrgenciaLabels: Record<GrauUrgencia, string> = {
  [GrauUrgencia.BAIXO]: "Baixo",
  [GrauUrgencia.MEDIO]: "Medio",
  [GrauUrgencia.ALTO]: "Alto",
};
