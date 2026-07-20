package com.tcc.aceso.api.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteListaResponse {

    private Long id;
    private String nome;
    private boolean possuiEvolucaoHoje;
}