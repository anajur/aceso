package com.tcc.aceso.api.domain;

import java.time.LocalDateTime;

import com.tcc.aceso.api.enums.GrauUrgencia;
import com.tcc.aceso.api.enums.StatusAlerta;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "alertas")
public class Alerta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @Column(nullable = false, length = 1000)
    private String mensagem;

    @Enumerated(EnumType.STRING)
    @Column(name = "grau_urgencia", nullable = false)
    private GrauUrgencia grauUrgencia;

    @Column(name = "data_alerta", nullable = false)
    private LocalDateTime dataAlerta;

    @Column(name = "ultima_analise_ia", nullable = false)
    private LocalDateTime ultimaAnaliseIa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAlerta status;

}
