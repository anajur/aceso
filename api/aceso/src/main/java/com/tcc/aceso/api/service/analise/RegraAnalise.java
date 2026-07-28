package com.tcc.aceso.api.service.analise;

import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.RespostaIa;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.function.Predicate;

@AllArgsConstructor
@Data
public class RegraAnalise {

    private Predicate<List<Evolucao>> condicao;
    private RespostaIa resposta;



    public boolean atende(List<Evolucao> evolucoes) {
        return condicao.test(evolucoes);
    }

    public RespostaIa getResposta() {
        return resposta;
    }
}
