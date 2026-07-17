package com.tcc.aceso.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
