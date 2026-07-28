package com.tcc.aceso.api.domain;

import com.tcc.aceso.api.enums.StatusPaciente;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pacientes")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "remedios_uso_continuo", columnDefinition = "TEXT")
    private String remediosUsoContinuo;

    @Column(name = "pontos_atencao", columnDefinition = "TEXT")
    private String pontosAtencao;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusPaciente status = StatusPaciente.ATIVO;
}
