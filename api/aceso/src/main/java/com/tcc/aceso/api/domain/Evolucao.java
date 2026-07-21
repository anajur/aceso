package com.tcc.aceso.api.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.tcc.aceso.api.enums.*;
import jakarta.persistence.*;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "evolucoes")
public class Evolucao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ElementCollection(targetClass = Humor.class)
    @CollectionTable(name = "evolucao_humores", joinColumns = @JoinColumn(name = "evolucao_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "humor", length = 1000)
    private List<Humor> humores = new ArrayList<>();

    @ElementCollection(targetClass = Comportamento.class)
    @CollectionTable(name = "evolucao_comportamentos", joinColumns = @JoinColumn(name = "evolucao_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "comportamento", length = 1000)
    private List<Comportamento> comportamentos = new ArrayList<>();

    @Column(length = 1000)
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private Double temperatura;
    private Integer frequenciaCardiaca;

    @Enumerated(EnumType.STRING)
    private Socializacao socializacao;

    @Enumerated(EnumType.STRING)
    private NivelConsciencia nivelConsciencia;

    @Enumerated(EnumType.STRING)
    private Sono sono;

    @Enumerated(EnumType.STRING)
    private AceitacaoAlimentar aceitacaoAlimentar;
    private LocalDateTime dataHora = LocalDateTime.now();
}