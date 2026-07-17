package com.tcc.aceso.api.mapper;

import com.tcc.aceso.api.controller.response.EvolucaoResponse;
import com.tcc.aceso.api.domain.Evolucao;

public class EvolucaoMapper {

    public static EvolucaoResponse toResponse(Evolucao evolucao) {

        return EvolucaoResponse.builder()
                .id(evolucao.getId())
                .pacienteId(evolucao.getPaciente().getId())
                .pacienteNome(evolucao.getPaciente().getNome())
                .usuarioNome(evolucao.getUsuario().getNome())
                .dataHora(evolucao.getDataHora())
                .humores(evolucao.getHumores())
                .comportamentos(evolucao.getComportamentos())
                .socializacao(evolucao.getSocializacao())
                .nivelConsciencia(evolucao.getNivelConsciencia())
                .sono(evolucao.getSono())
                .aceitacaoAlimentar(evolucao.getAceitacaoAlimentar())
                .temperatura(evolucao.getTemperatura())
                .frequenciaCardiaca(evolucao.getFrequenciaCardiaca())
                .comentario(evolucao.getComentario())
                .build();
    }
}