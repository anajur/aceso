package com.tcc.aceso.api.service;

import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.RespostaIa;
import com.tcc.aceso.api.enums.*;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tcc.aceso.api.enums.Comportamento.AGRESSIVO;

@Service
public class AnaliseLocalService {
    private final EvolucaoRepository evolucaoRepository;

    public AnaliseLocalService(EvolucaoRepository evolucaoRepository) {
        this.evolucaoRepository = evolucaoRepository;
    }

    private boolean possuiComportamento(List<Evolucao> evolucoes,
                                        Comportamento comportamento) {

        return evolucoes.stream()
                .anyMatch(e -> e.getComportamentos().contains(comportamento));
    }

    private boolean possuiHumor(List<Evolucao> evolucoes,
                                Humor humor) {

        return evolucoes.stream()
                .anyMatch(e -> e.getHumores().contains(humor));
    }

    private boolean possuiSocializacao(List<Evolucao> evolucoes,
                                       Socializacao socializacao) {

        return evolucoes.stream()
                .anyMatch(e -> e.getSocializacao() == socializacao);
    }


    RespostaIa gerarAnalise(Long idPaciente) {

        List<Evolucao> evolucoes =
                evolucaoRepository.findTop2ByPacienteIdOrderByDataHoraDesc(idPaciente);

        if (possuiComportamento(evolucoes, AGRESSIVO)) {

            return new RespostaIa(
                    "Paciente apresentou comportamento agressivo.",
                    GrauUrgencia.ALTO,
                    "Intensificar observação."
            );
        }


        if (possuiHumor(evolucoes, Humor.TRISTE)
                && possuiSocializacao(evolucoes, Socializacao.ISOLADO)) {

            return new RespostaIa(
                    "Paciente apresentou sinais persistentes de sofrimento emocional.",
                    GrauUrgencia.MEDIO,
                    "Reforçar acompanhamento psicológico e incetivar atividades em grupo."
            );
        }

        return new RespostaIa(
                "Paciente sem alterações relevantes nas últimas evoluções registradas.",
                GrauUrgencia.BAIXO,
                "Continuar monitoramento e registrar novas evoluções."
                );
    }
}
