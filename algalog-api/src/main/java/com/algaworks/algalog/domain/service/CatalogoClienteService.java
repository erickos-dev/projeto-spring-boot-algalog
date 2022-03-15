package com.algaworks.algalog.domain.service;

import com.algaworks.algalog.domain.exception.NegocioException;
import com.algaworks.algalog.domain.model.Cliente;
import com.algaworks.algalog.domain.repository.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class CatalogoClienteService {

    private ClienteRepository clienteRepository;

    public Cliente buscar(Long clienteId){
        var cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new NegocioException("Cliente não encontrado"));
        return cliente;
    }

    @Transactional
    public Cliente salvar(Cliente cliente){
        boolean emailEmUso = clienteRepository.findByEmail(cliente.getEmail())
                .stream().anyMatch(cliente1 -> !cliente1.equals(cliente));

        if (emailEmUso){
            throw new NegocioException("Cliente Já cadastrado com esse e-mail");
        }
        return clienteRepository.save(cliente);
    }

    @Transactional
    public void excluir (Long clienteId){
        clienteRepository.deleteById(clienteId);
    }
}
