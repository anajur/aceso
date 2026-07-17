package com.tcc.aceso.api.controller;

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
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return usuarioRepository.findByLoginAndSenha(request.login(), request.senha())
                .<ResponseEntity<?>>map(usuario -> ResponseEntity.ok(toResponse(usuario)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login ou senha invalidos."));
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getCoren(), usuario.getLogin());
    }

    public record LoginRequest(String login, String senha) {
    }

    public record UsuarioResponse(Long id, String nome, String coren, String login) {
    }
}
