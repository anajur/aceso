package com.tcc.aceso.api.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraficoHumorResponse {
    private String data;
    private Double valor;
}
