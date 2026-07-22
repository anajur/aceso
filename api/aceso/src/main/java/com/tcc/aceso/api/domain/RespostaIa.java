package com.tcc.aceso.api.domain;

import com.tcc.aceso.api.enums.GrauUrgencia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RespostaIa {
    private String resumo;

    private GrauUrgencia risco;

    private String sugestao;
}
