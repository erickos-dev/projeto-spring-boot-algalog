package com.algaworks.algalog.api.model.input;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Getter@Setter
public class DestinatarioInput {

    @NotBlank
    private String nome;

    @NotBlank
    private String lagradouro;

    @NotBlank
    private String numero;

    @NotBlank
    private String complemento;

    @NotBlank
    private String bairro;
}
