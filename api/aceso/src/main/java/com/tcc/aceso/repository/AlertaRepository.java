package com.tcc.aceso.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.domain.Alerta;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {

    List<Alerta> findByPacienteIdOrderByDataAlertaDesc(Long pacienteId);

    List<Alerta> findByStatusIgnoreCaseOrderByDataAlertaDesc(String status);
}
