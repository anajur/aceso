import {
  AceitacaoAlimentar,
  Comportamento,
  Humor,
  Socializacao,
  Sono,
} from "../enums";

export interface Evolucao {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  dataHora: string;
  comentario: string;
  humores: Humor[];
  comportamentos: Comportamento[];
  socializacao: Socializacao;
  sono: Sono;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura: number;
  frequenciaCardiaca: number;
  tecnicoId: number;
  usuarioNome: string;
  pressaoArterial: string;
  saturacaoOxigenio: string;
}

export interface EvolucaoForm {
  pacienteId: number;
  usuarioId: number;
  dataHora: string;
  comentario: string;
  humores: Humor[];
  comportamentos: Comportamento[];
  socializacao: Socializacao;
  sono: Sono;
  pressaoArterial?: string;
  saturacaoOxigenio: string;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura?: number;
  frequenciaCardiaca?: number;
}
