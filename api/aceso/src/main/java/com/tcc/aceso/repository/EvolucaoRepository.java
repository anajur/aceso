package com.tcc.aceso.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.domain.Evolucao;

public interface EvolucaoRepository extends JpaRepository<Evolucao, Long> {

    List<Evolucao> findByPacienteIdOrderByDataHoraDesc(Long pacienteId);
}
