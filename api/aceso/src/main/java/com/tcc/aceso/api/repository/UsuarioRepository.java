package com.tcc.aceso.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByLogin(String login);

    Optional<Usuario> findByLoginAndSenha(String login, String senha);

    boolean existsByLogin(String login);
}
