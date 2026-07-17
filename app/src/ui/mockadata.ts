import {
  AceitacaoAlimentar,
  Comportamento,
  Humor,
  NivelConsciencia,
  Socializacao,
  Sono,
} from "../enums";

export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  telefone: string;
  diagnostico: string;
  dataInternacao: string;
  leito: string;
  status: "ativo" | "alta" | "transferido";
}

export interface Evolucao {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  data: string;
  hora: string;
  dataHora: string;
  comentario: string;
  usuarioNome: string;
  texto: string;
  humores: Humor[];
  comportamentos: Comportamento[];
  socializacao: Socializacao;
  nivelConsciencia: NivelConsciencia;
  sono: Sono;
  aceitacaoAlimentar: AceitacaoAlimentar;
  temperatura: number;
  frequenciaCardiaca: number;
  tecnicoId: string;
  tecnicoNome: string;
}

export interface Tecnico {
  id: string;
  nome: string;
  coren: string;
  turno: "manhã" | "tarde" | "noite";
  telefone: string;
  email: string;
  status: "ativo" | "inativo";
}

export interface Alerta {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  tipo: "humor" | "comportamento" | "socializacao";
  mensagem: string;
  sugestao: string;
  data: string;
  lido: boolean;
  severidade: "baixa" | "media" | "alta";
}

export const pacientes: Paciente[] = [
  {
    id: "1",
    nome: "Maria Silva",
    dataNascimento: "1985-03-15",
    cpf: "123.456.789-00",
    telefone: "(11) 99999-1234",
    diagnostico: "Transtorno Bipolar",
    dataInternacao: "2024-01-10",
    leito: "A-101",
    status: "ativo",
  },
  {
    id: "2",
    nome: "João Santos",
    dataNascimento: "1972-07-22",
    cpf: "987.654.321-00",
    telefone: "(11) 98888-5678",
    diagnostico: "Esquizofrenia",
    dataInternacao: "2024-02-05",
    leito: "B-203",
    status: "ativo",
  },
  {
    id: "3",
    nome: "Ana Costa",
    dataNascimento: "1990-11-08",
    cpf: "456.789.123-00",
    telefone: "(11) 97777-9012",
    diagnostico: "Depressão Maior",
    dataInternacao: "2024-01-20",
    leito: "A-105",
    status: "ativo",
  },
  {
    id: "4",
    nome: "Pedro Oliveira",
    dataNascimento: "1968-05-30",
    cpf: "321.654.987-00",
    telefone: "(11) 96666-3456",
    diagnostico: "TOC",
    dataInternacao: "2024-03-01",
    leito: "C-302",
    status: "ativo",
  },
  {
    id: "5",
    nome: "Carla Mendes",
    dataNascimento: "1995-09-12",
    cpf: "654.321.987-00",
    telefone: "(11) 95555-7890",
    diagnostico: "Ansiedade Generalizada",
    dataInternacao: "2024-02-15",
    leito: "B-210",
    status: "alta",
  },
];
