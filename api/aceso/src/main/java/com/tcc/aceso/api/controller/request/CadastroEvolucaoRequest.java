package com.tcc.aceso.api.controller.request;

import com.tcc.aceso.api.enums.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CadastroEvolucaoRequest {
    private LocalDateTime dataHora;

    private String comentario;

    private List<Humor> humores;

    private List<Comportamento> comportamentos;

    private Socializacao socializacao;

    private NivelConsciencia nivelConsciencia;

    private Sono sono;

    private AceitacaoAlimentar aceitacaoAlimentar;

    private Double temperatura;

    private Integer frequenciaCardiaca;

    private Long usuarioId;
}
