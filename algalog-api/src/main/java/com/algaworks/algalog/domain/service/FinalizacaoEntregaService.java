package com.algaworks.algalog.domain.service;

import com.algaworks.algalog.domain.repository.EntregaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class FinalizacaoEntregaService {

    private EntregaRepository entregaRepository;
    private BuscarEntregaService buscarEntregaService;

    @Transactional
    public void finalizar(Long entregaId){
        var entrega = buscarEntregaService.buscar(entregaId);

        entrega.finalizar();

        entregaRepository.save(entrega);
    }

}
