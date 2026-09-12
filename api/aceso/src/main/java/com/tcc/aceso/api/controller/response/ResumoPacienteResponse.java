package com.tcc.aceso.api.controller.response;

import com.tcc.aceso.api.domain.Alerta;
import com.tcc.aceso.api.enums.StatusPaciente;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResumoPacienteResponse {

    private Long id;
    private String nome;
    private StatusPaciente status;

    private String remediosUsoContinuo;
    private String pontosAtencao;

    private List<GraficoHumorResponse> graficoHumor;
    private List<GraficoComportamentoResponse> graficoComportamento;
    private List<Alerta> alertas;
}
