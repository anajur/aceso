package com.tcc.aceso.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Evolucao;

public interface EvolucaoRepository extends JpaRepository<Evolucao, Long> {

    List<Evolucao> findByPacienteIdOrderByDataHoraDesc(Long pacienteId);
}
