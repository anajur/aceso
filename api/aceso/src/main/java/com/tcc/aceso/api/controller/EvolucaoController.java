package com.tcc.aceso.api.controller;

import java.time.LocalDateTime;
import java.util.List;

import com.tcc.aceso.api.controller.response.EvolucaoResponse;
import com.tcc.aceso.api.service.evolucao.EvolucaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.repository.PacienteRepository;

@RestController
@RequestMapping("/api")
public class EvolucaoController {

    private final EvolucaoRepository evolucaoRepository;
    private final PacienteRepository pacienteRepository;
    private final EvolucaoService evolucaoService;

    public EvolucaoController(EvolucaoRepository evolucaoRepository, PacienteRepository pacienteRepository, EvolucaoService evolucaoService) {
        this.evolucaoRepository = evolucaoRepository;
        this.pacienteRepository = pacienteRepository;
        this.evolucaoService = evolucaoService;
    }

    @GetMapping("/evolucoes")
    public List<EvolucaoResponse> listarTodas() {
        return evolucaoService.listar();
    }

    @GetMapping("/pacientes/{pacienteId}/evolucoes")
    public List<Evolucao> listarPorPaciente(@PathVariable Long pacienteId) {
        return evolucaoRepository.findByPacienteIdOrderByDataHoraDesc(pacienteId);
    }

    @GetMapping("/evolucoes/{id}")
    public ResponseEntity<Evolucao> buscarPorId(@PathVariable Long id) {
        return evolucaoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/pacientes/{pacienteId}/evolucoes")
    public ResponseEntity<Evolucao> cadastrar(@PathVariable Long pacienteId, @RequestBody Evolucao evolucao) {
        return pacienteRepository.findById(pacienteId)
                .map(paciente -> {
                    evolucao.setPaciente(paciente);
                    if (evolucao.getDataHora() == null) {
                        evolucao.setDataHora(LocalDateTime.now());
                    }
                    return ResponseEntity.status(HttpStatus.CREATED).body(evolucaoRepository.save(evolucao));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/evolucoes/{id}")
    public ResponseEntity<Evolucao> atualizar(@PathVariable Long id, @RequestBody Evolucao dados) {
        return evolucaoRepository.findById(id)
                .map(evolucao -> {
                    copiarCampos(dados, evolucao);
                    return ResponseEntity.ok(evolucaoRepository.save(evolucao));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/evolucoes/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!evolucaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        evolucaoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void copiarCampos(Evolucao origem, Evolucao destino) {
        destino.setDataHora(origem.getDataHora());
        destino.setHumores(origem.getHumores());
        destino.setComportamentos(origem.getComportamentos());
        destino.setSocializacao(origem.getSocializacao());
        destino.setNivelConsciencia(origem.getNivelConsciencia());
        destino.setSono(origem.getSono());
        destino.setAceitacaoAlimentar(origem.getAceitacaoAlimentar());
        destino.setTemperatura(origem.getTemperatura());
        destino.setFrequenciaCardiaca(origem.getFrequenciaCardiaca());
    }
}
