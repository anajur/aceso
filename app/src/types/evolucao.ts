import { AceitacaoAlimentar, Comportamento, Humor, NivelConsciencia, Socializacao, Sono } from "../enums";

export interface Evolucao {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  dataHora: string;
  comentario: string;
  humores: Humor[];
  comportamentos: Comportamento[];
  socializacao: Socializacao;
  nivelConsciencia: NivelConsciencia
  sono: Sono;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura: number;
  frequenciaCardiaca: number;
  tecnicoId: string;
  usuarioNome: string;
}