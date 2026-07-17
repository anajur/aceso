export enum NivelConsciencia {
  CONSCIENTE = "CONSCIENTE",
  SONOLENTO = "SONOLENTO",
  CONFUSO = "CONFUSO",
  INCONSCIENTE = "INCONSCIENTE",
}

export const nivelConscienciaLabels: Record<NivelConsciencia, string> = {
  [NivelConsciencia.CONSCIENTE]: "Consciente",
  [NivelConsciencia.SONOLENTO]: "Sonolento",
  [NivelConsciencia.CONFUSO]: "Confuso",
  [NivelConsciencia.INCONSCIENTE]: "Inconsciente",
};