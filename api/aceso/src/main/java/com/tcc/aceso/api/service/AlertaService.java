package com.tcc.aceso.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tcc.aceso.api.domain.Alerta;
import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.Paciente;
import com.tcc.aceso.api.domain.RespostaIa;
import com.tcc.aceso.api.enums.StatusAlerta;
import com.tcc.aceso.api.enums.StatusPaciente;
import com.tcc.aceso.api.repository.AlertaRepository;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AlertaService {
    private final PacienteRepository pacienteRepository;
    private final AlertaRepository alertaRepository;
    private final GeminiService geminiService;
    private final EvolucaoRepository evolucaoRepository;
    private final ConcurrentHashMap<Long, Object> locks = new ConcurrentHashMap();
    private final AnaliseLocalService analiseLocalService;
    
    public AlertaService(PacienteRepository pacienteRepository, AlertaRepository alertaRepository, GeminiService geminiService, EvolucaoRepository evolucaoRepository, AnaliseLocalService analiseLocalService) {
        this.pacienteRepository = pacienteRepository;
        this.alertaRepository = alertaRepository;
        this.geminiService = geminiService;
        this.evolucaoRepository = evolucaoRepository;
        this.analiseLocalService = analiseLocalService;
    }

    public void gerarAlertasDoDia() throws JsonProcessingException {

        List<Paciente> pacientes =
                pacienteRepository.findByStatusOrderByNome(StatusPaciente.ATIVO);

        for (Paciente paciente : pacientes) {

            Object lock = locks.computeIfAbsent(paciente.getId(), id -> new Object());

            synchronized (lock) {

                if (!precisaAnalisar(paciente.getId())) {
                    continue;
                }

                analisarPaciente(paciente);
            }
        }
    }

    private boolean precisaAnalisar(Long pacienteId) {

        Optional<Alerta> alerta =
                alertaRepository.findByPacienteId(pacienteId);

        if (alerta.isEmpty()) {
            return true;
        }

        Optional<Evolucao> ultimaEvolucao =
                evolucaoRepository.findTopByPacienteIdOrderByDataHoraDesc(pacienteId);

        if (ultimaEvolucao.isEmpty()) {
            return false;
        }

        return ultimaEvolucao.get()
                .getDataHora()
                .isAfter(alerta.get().getUltimaAnaliseIa());
    }

    private void analisarPaciente(Paciente paciente) throws JsonProcessingException {

        try {

          //     RespostaIa respostaIa =
          //  geminiService.gerarAnalise(paciente.getId());

          //      salvarOuAtualizarAlerta(paciente, respostaIa);

        } catch (Exception e) {
            RespostaIa respostaIa = analiseLocalService.gerarAnalise(paciente.getId());
            salvarOuAtualizarAlerta(paciente, respostaIa);

        }
    }

    private void salvarOuAtualizarAlerta(Paciente paciente,
                                         RespostaIa resposta) {

        Alerta alerta = alertaRepository
                .findByPacienteId(paciente.getId())
                .orElse(new Alerta());

        alerta.setPaciente(paciente);
        alerta.setResumo(resposta.getResumo());
        alerta.setSugestao(resposta.getSugestao());
        alerta.setGrauUrgencia(resposta.getRisco());
        alerta.setStatus(StatusAlerta.PENDENTE);
        alerta.setDataAlerta(LocalDateTime.now());
        alerta.setUltimaAnaliseIa(LocalDateTime.now());

        alertaRepository.save(alerta);
    }

    public void marcarComoLido(Long id) {

        Alerta alerta = alertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado."));

        alerta.setStatus(StatusAlerta.LIDO);
        alertaRepository.save(alerta);
    }
}
