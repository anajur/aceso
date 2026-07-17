package com.tcc.aceso.api.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.tcc.aceso.api.enums.Comportamento;
import com.tcc.aceso.api.enums.Humor;
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
    @Column(name = "humor")
    private List<Humor> humores = new ArrayList<>();

    @ElementCollection(targetClass = Comportamento.class)
    @CollectionTable(name = "evolucao_comportamentos", joinColumns = @JoinColumn(name = "evolucao_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "comportamento")
    private List<Comportamento> comportamentos = new ArrayList<>();

    @Column(length = 1000)
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String socializacao;
    private String nivelConsciencia;
    private String sono;
    private String aceitacaoAlimentar;
    private Double temperatura;
    private Integer frequenciaCardiaca;
    private LocalDateTime dataHora = LocalDateTime.now();
}