package com.tcc.aceso.api.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Evolucao;

public interface EvolucaoRepository extends JpaRepository<Evolucao, Long> {
    Optional<Evolucao> findTopByPacienteIdOrderByDataHoraDesc(Long pacienteId);

    List<Evolucao> findByPacienteIdOrderByDataHoraDesc(Long pacienteId);

    List<Evolucao> findTop2ByPacienteIdOrderByDataHoraDesc(Long pacienteId);

    boolean existsByPacienteIdAndDataHoraBetween(
            Long pacienteId,
            LocalDateTime inicio,
            LocalDateTime fim
    );

    default boolean existsByPacienteIdAndData(Long pacienteId, LocalDate data) {
        return existsByPacienteIdAndDataHoraBetween(
                pacienteId,
                data.atStartOfDay(),
                data.plusDays(1).atStartOfDay()
        );
    }

    List<Evolucao> findAllByOrderByDataHoraDesc();

    List<Evolucao> findByPacienteIdAndDataHoraGreaterThanEqualOrderByDataHoraAsc(
            Long pacienteId,
            LocalDateTime data
    );}
