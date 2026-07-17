package com.tcc.aceso.api.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.aceso.api.domain.Alerta;
import com.tcc.aceso.api.repository.AlertaRepository;
import com.tcc.aceso.api.repository.PacienteRepository;

@RestController
@RequestMapping("/api")
public class AlertaController {

    private final AlertaRepository alertaRepository;
    private final PacienteRepository pacienteRepository;

    public AlertaController(AlertaRepository alertaRepository, PacienteRepository pacienteRepository) {
        this.alertaRepository = alertaRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @GetMapping("/alertas")
    public List<Alerta> listar(@RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return alertaRepository.findByStatusIgnoreCaseOrderByDataAlertaDesc(status);
        }

        return alertaRepository.findAll();
    }

    @GetMapping("/pacientes/{pacienteId}/alertas")
    public List<Alerta> listarPorPaciente(@PathVariable Long pacienteId) {
        return alertaRepository.findByPacienteIdOrderByDataAlertaDesc(pacienteId);
    }

    @GetMapping("/alertas/{id}")
    public ResponseEntity<Alerta> buscarPorId(@PathVariable Long id) {
        return alertaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/pacientes/{pacienteId}/alertas")
    public ResponseEntity<Alerta> cadastrar(@PathVariable Long pacienteId, @RequestBody Alerta alerta) {
        return pacienteRepository.findById(pacienteId)
                .map(paciente -> {
                    alerta.setPaciente(paciente);
                    if (alerta.getDataAlerta() == null) {
                        alerta.setDataAlerta(LocalDateTime.now());
                    }
                    if (alerta.getAnalisadoPelaIa() == null) {
                        alerta.setAnalisadoPelaIa(false);
                    }
                    return ResponseEntity.status(HttpStatus.CREATED).body(alertaRepository.save(alerta));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/alertas/{id}")
    public ResponseEntity<Alerta> atualizar(@PathVariable Long id, @RequestBody Alerta dados) {
        return alertaRepository.findById(id)
                .map(alerta -> {
                    copiarCampos(dados, alerta);
                    return ResponseEntity.ok(alertaRepository.save(alerta));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/alertas/{id}/resolver")
    public ResponseEntity<Alerta> resolver(@PathVariable Long id) {
        return alertaRepository.findById(id)
                .map(alerta -> {
                    alerta.setStatus("RESOLVIDO");
                    return ResponseEntity.ok(alertaRepository.save(alerta));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/alertas/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!alertaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        alertaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void copiarCampos(Alerta origem, Alerta destino) {
        destino.setMensagem(origem.getMensagem());
        destino.setGrauUrgencia(origem.getGrauUrgencia());
        destino.setStatus(origem.getStatus());
        destino.setDataAlerta(origem.getDataAlerta());
        destino.setAnalisadoPelaIa(origem.getAnalisadoPelaIa());
    }
}
