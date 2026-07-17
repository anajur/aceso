export enum Sono {
  ADEQUADO = "ADEQUADO",
  INSONIA = "INSONIA",
  INTERROMPIDO = "INTERROMPIDO",
}

export const sonoLabels: Record<Sono, string> = {
  [Sono.ADEQUADO]: "Adequado",
  [Sono.INSONIA]: "Insônia",
  [Sono.INTERROMPIDO]: "Sono interrompido",
};