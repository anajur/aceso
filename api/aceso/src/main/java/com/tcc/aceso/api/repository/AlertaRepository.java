package com.tcc.aceso.api.repository;

import java.util.List;
import java.util.Optional;

import com.tcc.aceso.api.enums.StatusAlerta;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc.aceso.api.domain.Alerta;
import org.springframework.data.jpa.repository.Query;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    Optional<Alerta> findByPacienteId(Long pacienteId);

    List<Alerta> findByPacienteIdOrderByDataAlertaDesc(Long pacienteId);

    @Query("""
    SELECT a
    FROM Alerta a
    ORDER BY
        CASE a.grauUrgencia
            WHEN com.tcc.aceso.api.enums.GrauUrgencia.ALTO THEN 1
            WHEN com.tcc.aceso.api.enums.GrauUrgencia.MEDIO THEN 2
            WHEN com.tcc.aceso.api.enums.GrauUrgencia.BAIXO THEN 3
        END,
        a.dataAlerta DESC
""")
    List<Alerta> findAllOrdenadosPorUrgencia();

    List<Alerta> findTop3ByPacienteIdOrderByDataAlertaDesc(Long pacienteId);

}
