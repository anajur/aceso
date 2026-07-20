import {
  AceitacaoAlimentar,
  Comportamento,
  Humor,
  NivelConsciencia,
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
  nivelConsciencia: NivelConsciencia;
  sono: Sono;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura: number;
  frequenciaCardiaca: number;
  tecnicoId: number;
  usuarioNome: string;
}

export interface EvolucaoForm {
  pacienteId: number;
  dataHora: string;
  comentario: string;
  humores: Humor[];
  comportamentos: Comportamento[];
  socializacao: Socializacao;
  nivelConsciencia: NivelConsciencia;
  sono: Sono;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura?: number;
  frequenciaCardiaca?: number;
}
