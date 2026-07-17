package com.tcc.aceso.api.service.evolucao;

import com.tcc.aceso.api.controller.response.EvolucaoResponse;
import com.tcc.aceso.api.mapper.EvolucaoMapper;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvolucaoService {
    private final EvolucaoRepository evolucaoRepository;

    public EvolucaoService(EvolucaoRepository evolucaoRepository) {
        this.evolucaoRepository = evolucaoRepository;
    }

    public List<EvolucaoResponse> listar() {
        return evolucaoRepository.findAll()
                .stream()
                .map(EvolucaoMapper::toResponse)
                .toList();
    }
}