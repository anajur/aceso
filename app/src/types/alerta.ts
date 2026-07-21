import { GrauUrgencia } from "../enums/grauUrgencia";

export interface Alerta {
  id: number;
  grauUrgencia: GrauUrgencia;
  lido: boolean;
  pacienteNome: string;
  tipo: string;
  resumo: string;
  dataAlerta: string;
  sugestao: string;
  paciente: { nome: string };
  status: string;
}
