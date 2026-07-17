package com.tcc.aceso.api.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "alertas")
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @Column(nullable = false)
    private String mensagem;

    @Column(name = "grau_urgencia", nullable = false)
    private String grauUrgencia;

    @Column(nullable = false)
    private String status;

    @Column(name = "data_alerta", nullable = false)
    private LocalDateTime dataAlerta = LocalDateTime.now();

    @Column(name = "analisado_pela_ia", nullable = false)
    private Boolean analisadoPelaIa = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getGrauUrgencia() {
        return grauUrgencia;
    }

    public void setGrauUrgencia(String grauUrgencia) {
        this.grauUrgencia = grauUrgencia;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataAlerta() {
        return dataAlerta;
    }

    public void setDataAlerta(LocalDateTime dataAlerta) {
        this.dataAlerta = dataAlerta;
    }

    public Boolean getAnalisadoPelaIa() {
        return analisadoPelaIa;
    }

    public void setAnalisadoPelaIa(Boolean analisadoPelaIa) {
        this.analisadoPelaIa = analisadoPelaIa;
    }
}
