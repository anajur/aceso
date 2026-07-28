package com.tcc.aceso.api.service.analise;

import com.tcc.aceso.api.domain.RespostaIa;
import com.tcc.aceso.api.enums.GrauUrgencia;

public class MensagensAlerta {

        private MensagensAlerta() {
        }

    public static final RespostaIa INSONIA =
            new RespostaIa(
                    "Paciente apresenta insônia persistente.",
                    GrauUrgencia.MEDIO,
                    "Monitorar o padrão de sono e avaliar possíveis fatores que estejam prejudicando o descanso."
            );

        public static final RespostaIa SONO_INTERROMPIDO =
                new RespostaIa(
                        "Paciente apresenta sono interrompido de forma persistente.",
                        GrauUrgencia.MEDIO,
                        "Monitorar a qualidade do sono e avaliar possíveis causas."
                );

        public static final RespostaIa ANSIEDADE_INSONIA =
                new RespostaIa(
                        "Paciente apresenta ansiedade e insônia.",
                        GrauUrgencia.ALTO,
                        "Estimular atividades de relaxamento durante o dia, como caminhadas. Reduzir estímulos no período noturno e avaliar necessidade de intervenção."
                );

        public static final RespostaIa IRRITABILIDADE_INSONIA =
                new RespostaIa(
                        "Paciente apresenta irritabilidade e insônia.",
                        GrauUrgencia.ALTO,
                        "Estimular atividades de relaxamento durante o dia, como caminhadas. Reduzir estímulos no período noturno, intensificar observação e avaliar fatores desencadeantes."
                );

        public static final RespostaIa AGITACAO_INSONIA =
                new RespostaIa(
                        "Paciente apresenta agitação e insônia.",
                        GrauUrgencia.ALTO,
                        "Incentivar atividade física, dança. Reduzir estímulos no período noturno."
                );

        public static final RespostaIa TRISTEZA_INSONIA =
                new RespostaIa(
                        "Paciente apresenta tristeza e insônia.",
                        GrauUrgencia.MEDIO,
                        "Conversas em grupo, música, pintura. Reforçar acompanhamento psicológico."
                );

        public static final RespostaIa RECUSA_ALIMENTAR =
                new RespostaIa(
                        "Paciente apresentou recusa alimentar persistente.",
                        GrauUrgencia.ALTO,
                        "Incentivar participação na horta e em atividades relacionadas ao preparo dos alimentos. Monitorar alimentação."
                );

        public static final RespostaIa TRISTE_ISOLADO =
                new RespostaIa(
                        "Paciente apresenta sinais persistentes de sofrimento emocional.",
                        GrauUrgencia.MEDIO,
                        "Reforçar acompanhamento psicológico e estimular atividades em grupo, jogos, passeio na cidade."
                );

        public static final RespostaIa AGRESSIVO_ISOLADO =
                new RespostaIa(
                        "Paciente apresenta isolamento e agressividade.",
                        GrauUrgencia.ALTO,
                        "Incentivar atividade física. Intensificar observação."
                );

        public static final RespostaIa AGITADO_ISOLADO =
                new RespostaIa(
                        "Paciente apresenta agitação e isolamento.",
                        GrauUrgencia.MEDIO,
                        "Incentivar caminhadas, conversas em grupo, dança."
                );

        public static final RespostaIa RECUSA_ALIMENTAR_ISOLADO =
                new RespostaIa(
                        "Paciente apresenta isolamento e recusa alimentar.",
                        GrauUrgencia.ALTO,
                        "Incentivar conversas em grupo, jogos, cuidado com a horta."
                );

        public static final RespostaIa ANSIOSO_ISOLADO =
                new RespostaIa(
                        "Paciente apresenta ansiedade e isolamento.",
                        GrauUrgencia.MEDIO,
                        "Estimular interação social, propor exercícios ao ar livre, jogos."
                );

        public static final RespostaIa IRRITADO_AGITADO =
                new RespostaIa(
                        "Paciente apresenta irritabilidade e agitação persistentes.",
                        GrauUrgencia.MEDIO,
                        "Reforçar monitoramento comportamental. Incentivar caminhadas."
                );

        public static final RespostaIa TRISTE_ANSIOSO =
                new RespostaIa(
                        "Paciente apresenta tristeza e ansiedade.",
                        GrauUrgencia.MEDIO,
                        "Avaliar necessidade de acompanhamento psicológico. Incentivar atividades com música, pintura, desenho, caminhadas."
                );

        public static final RespostaIa ANSIOSO_AGITADO =
                new RespostaIa(
                        "Paciente apresenta ansiedade e agitação.",
                        GrauUrgencia.MEDIO,
                        "Incentivar atividade física."
                );

        public static final RespostaIa IRRITADO_AGRESSIVO =
                new RespostaIa(
                        "Paciente apresenta irritabilidade e agressividade.",
                        GrauUrgencia.ALTO,
                        "Marcar avaliação imediata. Intensificar observação."
                );

        public static final RespostaIa TRISTE_RECUSA_ALIMENTAR =
                new RespostaIa(
                        "Paciente apresenta tristeza e recusa alimentar.",
                        GrauUrgencia.ALTO,
                        "Incentivar cuidado com a horta, atividades com música. Monitorar refeições."
                );

        public static final RespostaIa SEM_ALERTAS =
                new RespostaIa(
                        "Paciente sem alterações relevantes nas últimas evoluções registradas.",
                        GrauUrgencia.BAIXO,
                        "Continuar monitoramento e registrar novas evoluções."
                );
        public static final RespostaIa AGRESSIVO =
                new RespostaIa(
                        "Paciente apresentou comportamento agressivo persistente.",
                        GrauUrgencia.ALTO,
                        "Intensificar observação, garantir a segurança do paciente."
                );
    }

