package com.tcc.aceso.api.controller;

import com.tcc.aceso.api.controller.request.LoginRequest;
import com.tcc.aceso.api.controller.response.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.aceso.api.domain.Usuario;
import com.tcc.aceso.api.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return usuarioRepository
                .findByEmailAndSenha(request.getEmail(), request.getSenha())
                .map(usuario -> ResponseEntity.ok(new LoginResponse(usuario.getId())))
                .orElse(ResponseEntity.status(401).build());
    }




}
