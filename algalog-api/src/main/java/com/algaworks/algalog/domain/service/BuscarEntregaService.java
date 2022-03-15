package com.algaworks.algalog.domain.service;

import com.algaworks.algalog.domain.exception.NegocioException;
import com.algaworks.algalog.domain.model.Entrega;
import com.algaworks.algalog.domain.repository.EntregaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BuscarEntregaService {

    private EntregaRepository entregaRepository;

    public Entrega buscar (Long entregaId){
        return entregaRepository.findById(entregaId)
                .orElseThrow(() -> new NegocioException("Entrega não encontrada"));
    }

}
