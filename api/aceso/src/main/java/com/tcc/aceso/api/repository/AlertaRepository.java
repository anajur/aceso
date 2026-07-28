package com.tcc.aceso.api.repository;

import java.util.List;
import java.util.Optional;

import com.tcc.aceso.api.enums.StatusAlerta;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Alerta;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    Optional<Alerta> findByPacienteId(Long pacienteId);

    List<Alerta> findByPacienteIdOrderByDataAlertaDesc(Long pacienteId);

    List<Alerta> findAllByOrderByStatusDescDataAlertaDesc();
}
