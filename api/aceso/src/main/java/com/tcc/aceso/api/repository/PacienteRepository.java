package com.tcc.aceso.api.repository;

import com.tcc.aceso.api.enums.StatusPaciente;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Paciente;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByStatusOrderByNome(StatusPaciente status);
}
