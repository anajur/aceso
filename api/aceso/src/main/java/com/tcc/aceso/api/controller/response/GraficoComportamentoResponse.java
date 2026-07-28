package com.tcc.aceso.api.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraficoComportamentoResponse {
    private String nome;
    private Integer quantidade;
}
