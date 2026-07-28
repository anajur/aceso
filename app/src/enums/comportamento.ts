export enum Comportamento {
  CALMO = "CALMO",
  AGITADO = "AGITADO",
  AGRESSIVO = "AGRESSIVO",
  COLABORATIVO = "COLABORATIVO",
}

export const comportamentoLabels: Record<Comportamento, string> = {
  [Comportamento.CALMO]: "Calmo",
  [Comportamento.AGITADO]: "Agitado",
  [Comportamento.AGRESSIVO]: "Agressivo",
  [Comportamento.COLABORATIVO]: "Colaborativo",
};
