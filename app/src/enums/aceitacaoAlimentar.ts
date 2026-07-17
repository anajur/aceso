export enum AceitacaoAlimentar {
  ACEITOU_TOTALMENTE = "ACEITOU_TOTALMENTE",
  ACEITOU_PARCIALMENTE = "ACEITOU_PARCIALMENTE",
  RECUSOU = "RECUSOU",
}

export const aceitacaoAlimentarLabels: Record<AceitacaoAlimentar, string> = {
  [AceitacaoAlimentar.ACEITOU_TOTALMENTE]: "Aceitou totalmente",
  [AceitacaoAlimentar.ACEITOU_PARCIALMENTE]: "Aceitou parcialmente",
  [AceitacaoAlimentar.RECUSOU]: "Recusou",
};