package com.tcc.aceso.api.controller.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String senha;
}
