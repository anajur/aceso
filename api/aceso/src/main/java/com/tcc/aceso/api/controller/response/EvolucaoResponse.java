package com.tcc.aceso.api.controller.response;

import com.tcc.aceso.api.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvolucaoResponse {

    private Long id;
    private Long pacienteId;
    private Long usuarioId;
    private String pacienteNome;
    private String usuarioNome;
    private LocalDateTime dataHora;
    private List<Humor> humores;
    private List<Comportamento> comportamentos;
    private Socializacao socializacao;
    private NivelConsciencia nivelConsciencia;
    private Sono sono;
    private AceitacaoAlimentar aceitacaoAlimentar;
    private Double temperatura;
    private Integer frequenciaCardiaca;
    private String comentario;
}