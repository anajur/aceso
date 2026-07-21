package com.tcc.aceso.api.controller;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tcc.aceso.api.enums.StatusAlerta;
import com.tcc.aceso.api.service.AlertaService;
import com.tcc.aceso.api.service.GeminiService;
import lombok.RequiredArgsConstructor;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AlertaController {

    private final AlertaRepository alertaRepository;
    private final PacienteRepository pacienteRepository;
    private final GeminiService geminiService;
    private final AlertaService alertaService;

    @PostMapping("/alertas/atualizar")
    public ResponseEntity<Void> gerarAlertas() throws JsonProcessingException {
        alertaService.gerarAlertasDoDia();
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/alertas/{id}/lido")
    public ResponseEntity<Void> marcarComoLido(@PathVariable Long id) {

        alertaService.marcarComoLido(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/alertas")
    public List<Alerta> listar() {
        return alertaRepository.findAllByOrderByStatusDescDataAlertaDesc();
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

    @DeleteMapping("/alertas/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!alertaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        alertaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
