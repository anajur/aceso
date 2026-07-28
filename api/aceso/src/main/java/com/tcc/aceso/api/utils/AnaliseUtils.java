package com.tcc.aceso.api.utils;

import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.enums.*;

import java.util.List;

public class AnaliseUtils {
    public static boolean possuiSonoNasUltimas2(
            List<Evolucao> evolucoes,
            Sono sono) {

        if (evolucoes.size() < 2) {
            return false;
        }

        return evolucoes.get(0).getSono() == sono
                && evolucoes.get(1).getSono() == sono;
    }
    public static boolean possuiAceitacaoAlimentarNasUltimas2(
            List<Evolucao> evolucoes,
            AceitacaoAlimentar aceitacaoAlimentar) {

        if (evolucoes.size() < 2) {
            return false;
        }

        return evolucoes.get(0).getAceitacaoAlimentar() == aceitacaoAlimentar
                && evolucoes.get(1).getAceitacaoAlimentar() == aceitacaoAlimentar;
    }

    public static boolean possuiHumores(
            Evolucao evolucao,
            Humor... humores) {

        for (Humor humor : humores) {
            if (!evolucao.getHumores().contains(humor)) {
                return false;
            }
        }

        return true;
    }

    public static boolean possuiComportamentoNasUltimas2(
            List<Evolucao> evolucoes,
            Comportamento comportamento) {

        if (evolucoes.size() < 2) {
            return false;
        }

        return evolucoes.get(0).getComportamentos().contains(comportamento)
                && evolucoes.get(1).getComportamentos().contains(comportamento);
    }

    public static boolean possuiHumorNasUltimas2(
            List<Evolucao> evolucoes,
            Humor humor) {

        if (evolucoes.size() < 2) {
            return false;
        }

        return evolucoes.get(0).getHumores().contains(humor)
                && evolucoes.get(1).getHumores().contains(humor);
    }

    public  static boolean possuiSocializacaoNasUltimas2(
            List<Evolucao> evolucoes,
            Socializacao socializacao) {

        if (evolucoes.size() < 2) {
            return false;
        }

        return evolucoes.get(0).getSocializacao() == socializacao
                && evolucoes.get(1).getSocializacao() == socializacao;
    }
}
