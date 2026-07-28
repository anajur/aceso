package com.tcc.aceso.api.controller.request;

import lombok.Data;

@Data
public class CadastroPacienteRequest {
    private String nome;

    private String remediosUsoContinuo;

    private String pontosAtencao;
}
