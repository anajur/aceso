package com.tcc.aceso.api.service;

import com.tcc.aceso.api.controller.response.PacienteListaResponse;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final EvolucaoRepository evolucaoRepository;

    public PacienteService(
            PacienteRepository pacienteRepository,
            EvolucaoRepository evolucaoRepository) {
        this.pacienteRepository = pacienteRepository;
        this.evolucaoRepository = evolucaoRepository;
    }

    public List<PacienteListaResponse> listar() {
        LocalDate hoje = LocalDate.now();

        return pacienteRepository.findAll()
                .stream()
                .map(paciente -> {

                    boolean possuiEvolucaoHoje =
                            evolucaoRepository.existsByPacienteIdAndData(
                                    paciente.getId(),
                                    hoje);

                    return new PacienteListaResponse(
                            paciente.getId(),
                            paciente.getNome(),
                            possuiEvolucaoHoje
                    );
                })
                .toList();
    }
}
