package com.tcc.aceso.api.service;

import com.tcc.aceso.api.controller.request.CadastroPacienteRequest;
import com.tcc.aceso.api.controller.response.GraficoComportamentoResponse;
import com.tcc.aceso.api.controller.response.GraficoHumorResponse;
import com.tcc.aceso.api.controller.response.PacienteListaResponse;
import com.tcc.aceso.api.controller.response.ResumoPacienteResponse;
import com.tcc.aceso.api.domain.Alerta;
import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.Paciente;
import com.tcc.aceso.api.enums.Comportamento;
import com.tcc.aceso.api.enums.Humor;
import com.tcc.aceso.api.enums.StatusPaciente;
import com.tcc.aceso.api.repository.AlertaRepository;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.repository.PacienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final EvolucaoRepository evolucaoRepository;
private final AlertaRepository alertaRepository;

    public PacienteService(
            PacienteRepository pacienteRepository,
            EvolucaoRepository evolucaoRepository, AlertaRepository alertaRepository) {
        this.pacienteRepository = pacienteRepository;
        this.evolucaoRepository = evolucaoRepository;
        this.alertaRepository = alertaRepository;
    }

    public List<PacienteListaResponse> listar() {
        LocalDate hoje = LocalDate.now();

        return pacienteRepository.findAll()
                .stream()
                .sorted(
                        Comparator
                                .comparing((Paciente p) -> p.getStatus() != StatusPaciente.ATIVO)
                                .thenComparing(Paciente::getNome)
                )
                .map(paciente -> {

                    boolean possuiEvolucaoHoje =
                            evolucaoRepository.existsByPacienteIdAndData(
                                    paciente.getId(),
                                    hoje);

                    return new PacienteListaResponse(
                            paciente.getId(),
                            paciente.getNome(),
                            possuiEvolucaoHoje,
                            paciente.getStatus()
                            );
                })
                .toList();
    }


    public void cadastrar(CadastroPacienteRequest request) {

        Paciente paciente = new Paciente();

        paciente.setNome(request.getNome());
        paciente.setRemediosUsoContinuo(request.getRemediosUsoContinuo());
        paciente.setPontosAtencao(request.getPontosAtencao());

        pacienteRepository.save(paciente);
    }

    public ResumoPacienteResponse buscarResumo(Long pacienteId) {

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow();

        LocalDateTime inicio = LocalDate.now()
                .minusDays(30)
                .atStartOfDay();

        List<Evolucao> evolucoes =
                evolucaoRepository
                        .findByPacienteIdAndDataHoraGreaterThanEqualOrderByDataHoraAsc(
                                pacienteId,
                                inicio
                        );
        List<Alerta> alertas =
                alertaRepository
                        .findTop3ByPacienteIdOrderByDataAlertaDesc(pacienteId);
        return ResumoPacienteResponse.builder()
                .id(paciente.getId())
                .nome(paciente.getNome())
                .status(paciente.getStatus())
                .remediosUsoContinuo(paciente.getRemediosUsoContinuo())
                .pontosAtencao(paciente.getPontosAtencao())
                .graficoHumor(montarGraficoHumor(evolucoes))
                .alertas(alertas)
                .graficoComportamento(montarGraficoComportamento(evolucoes))
                .build();
    }

    private List<GraficoHumorResponse> montarGraficoHumor(List<Evolucao> evolucoes) {

        return evolucoes.stream()
                .map(e -> {

                    double media =
                            e.getHumores()
                                    .stream()
                                    .mapToInt(this::valorHumor)
                                    .average()
                                    .orElse(0);

                    return new GraficoHumorResponse(
                            e.getDataHora().toLocalDate().toString(),
                            media
                    );

                }).toList();
    }

    private int valorHumor(Humor humor) {

        return switch (humor) {
            case FELIZ -> 5;
            case NEUTRO -> 4;
            case ANSIOSO -> 3;
            case TRISTE -> 2;
            case IRRITADO -> 1;
        };
    }
    private List<GraficoComportamentoResponse> montarGraficoComportamento(List<Evolucao> evolucoes) {

        Map<Comportamento, Integer> mapa = new HashMap<>();

        for (Evolucao evolucao : evolucoes) {

            for (Comportamento comportamento : evolucao.getComportamentos()) {

                mapa.merge(comportamento, 1, Integer::sum);

            }
        }

        return mapa.entrySet()
                .stream()
                .map(e -> new GraficoComportamentoResponse(
                        e.getKey().name(),
                        e.getValue()))
                .toList();
    }

    @Transactional
    public void atualizarStatus(Long id, StatusPaciente status) {

        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

        paciente.setStatus(status);

        pacienteRepository.save(paciente);
    }
}
