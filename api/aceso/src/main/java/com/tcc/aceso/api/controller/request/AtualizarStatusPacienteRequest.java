package com.tcc.aceso.api.controller.request;

import com.tcc.aceso.api.enums.StatusPaciente;
import lombok.Data;

@Data
public class AtualizarStatusPacienteRequest {

    private StatusPaciente status;

}