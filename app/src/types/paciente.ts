import { StatusPaciente } from "../enums/statusPaciente";

export interface Paciente {
  nome: string;
  id: number;
  possuiEvolucaoHoje: boolean;
  status: StatusPaciente;
}

export interface PacienteForm {
  nome: string;
  remediosUsoContinuo?: string;
  pontosAtencao?: string;
}

export interface Resumo {
  id: number;
  nome: string;
  status: StatusPaciente;
  pontosAtencao?: string;
  remediosUsoContinuo?: string;
  graficoHumor: GraficoHumor[];
  graficoComportamento: GraficoComportamento[];
}

export interface GraficoHumor {
  data: string;
  valor: number;
}

export interface GraficoComportamento {
  nome: string;
  quantidade: number;
}
