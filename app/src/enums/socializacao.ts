export enum Socializacao {
  BOA = "BOA",
  REGULAR = "REGULAR",
  ISOLADO = "ISOLADO",
  PARTICIPATIVO = "PARTICIPATIVO",
}

export const socializacaoLabels: Record<Socializacao, string> = {
  [Socializacao.BOA]: "Boa",
  [Socializacao.REGULAR]: "Regular",
  [Socializacao.ISOLADO]: "Isolado",
  [Socializacao.PARTICIPATIVO]: "Participativo",
};