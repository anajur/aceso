package com.tcc.aceso.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.domain.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
