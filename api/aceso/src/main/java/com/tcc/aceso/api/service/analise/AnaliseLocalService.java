package com.tcc.aceso.api.service.analise;

import com.tcc.aceso.api.domain.*;
import com.tcc.aceso.api.enums.*;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.service.AlertaService;
import org.springframework.stereotype.Service;

import java.util.List;

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



    private Evolucao ultimaEvolucao(List<Evolucao> evolucoes) {
        return evolucoes.get(0);
    }

    private boolean possuiComportamentos(
            Evolucao evolucao,
            Comportamento... comportamentos) {

        for (Comportamento comportamento : comportamentos) {
            if (!evolucao.getComportamentos().contains(comportamento)) {
                return false;
            }
        }

        return true;
    }


    private boolean possuiSocializacao(List<Evolucao> evolucoes,
                                       Socializacao socializacao) {

        return evolucoes.stream()
                .anyMatch(e -> e.getSocializacao() == socializacao);
    }


    public RespostaIa gerarAnalise(Long idPaciente) {

        List<Evolucao> evolucoes =
                evolucaoRepository.findTop2ByPacienteIdOrderByDataHoraDesc(idPaciente);

        for (RegraAnalise regra : RegrasAnalise.REGRAS){

            if(regra.atende(evolucoes)){
                return regra.getResposta();
            }

        }

        return MensagensAlerta.SEM_ALERTAS;
    }
}
