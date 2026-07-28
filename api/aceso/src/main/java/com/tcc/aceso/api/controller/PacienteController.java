package com.tcc.aceso.api.controller;

import java.util.List;

import com.tcc.aceso.api.controller.request.AtualizarStatusPacienteRequest;
import com.tcc.aceso.api.controller.request.CadastroPacienteRequest;
import com.tcc.aceso.api.controller.response.PacienteListaResponse;
import com.tcc.aceso.api.controller.response.ResumoPacienteResponse;
import com.tcc.aceso.api.service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tcc.aceso.api.domain.Paciente;
import com.tcc.aceso.api.repository.PacienteRepository;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteRepository pacienteRepository;
    private final PacienteService pacienteService;

    public PacienteController(PacienteRepository pacienteRepository, PacienteService pacienteService) {
        this.pacienteRepository = pacienteRepository;
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public List<PacienteListaResponse> listar() {
        return pacienteService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void cadastrar(@RequestBody CadastroPacienteRequest request) {
        pacienteService.cadastrar(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> atualizar(@PathVariable Long id, @RequestBody Paciente dados) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    paciente.setNome(dados.getNome());
                    return ResponseEntity.ok(pacienteRepository.save(paciente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!pacienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        pacienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/resumo")
    public ResumoPacienteResponse buscarResumo(@PathVariable Long id) {
        return pacienteService.buscarResumo(id);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(
            @PathVariable Long id,
            @RequestBody AtualizarStatusPacienteRequest request
    ) {
        pacienteService.atualizarStatus(id, request.getStatus());
        return ResponseEntity.ok().build();
    }
}
