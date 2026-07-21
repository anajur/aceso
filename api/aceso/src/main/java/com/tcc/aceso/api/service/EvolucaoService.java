package com.tcc.aceso.api.service;

import com.tcc.aceso.api.controller.request.CadastroEvolucaoRequest;
import com.tcc.aceso.api.controller.response.EvolucaoResponse;
import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.Paciente;
import com.tcc.aceso.api.domain.Usuario;
import com.tcc.aceso.api.mapper.EvolucaoMapper;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import com.tcc.aceso.api.repository.PacienteRepository;
import com.tcc.aceso.api.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvolucaoService {
    private final EvolucaoRepository evolucaoRepository;
    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    public EvolucaoService(EvolucaoRepository evolucaoRepository, PacienteRepository pacienteRepository, UsuarioRepository usuarioRepository) {
        this.evolucaoRepository = evolucaoRepository;
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<EvolucaoResponse> listar() {
        return evolucaoRepository.findAll()
                .stream()
                .map(EvolucaoMapper::toResponse)
                .toList();
    }

    public EvolucaoResponse cadastrar(Long pacienteId, CadastroEvolucaoRequest request) {

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow();

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow();

        Evolucao evolucao = new Evolucao();

        evolucao.setPaciente(paciente);
        evolucao.setUsuario(usuario);
        evolucao.setDataHora(request.getDataHora());
        evolucao.setComentario(request.getComentario());
        evolucao.setHumores(request.getHumores());
        evolucao.setComportamentos(request.getComportamentos());
        evolucao.setSocializacao(request.getSocializacao());
        evolucao.setNivelConsciencia(request.getNivelConsciencia());
        evolucao.setSono(request.getSono());
        evolucao.setAceitacaoAlimentar(request.getAceitacaoAlimentar());
        evolucao.setTemperatura(request.getTemperatura());
        evolucao.setFrequenciaCardiaca(request.getFrequenciaCardiaca());

        evolucaoRepository.save(evolucao);

        return EvolucaoMapper.toResponse(evolucao);
    }
}