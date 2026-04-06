package com.rocha.aquaflow.aquaflow.Business;


import org.springframework.stereotype.Service;

@Service
public class HidratacaoService {
    public int metaDiaria = 0;
    public int consumido = 0;

    public void definirMeta(int metaDiaria){
        if (metaDiaria <= 0) {
            throw new IllegalArgumentException("A meta deve ser maior que 0!");
        }
        this.metaDiaria = metaDiaria;
    }

    public void adicionarConsumo(int consumido){
        if (consumido <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero!");
        }
        this.consumido += consumido;
    }

    // Garante que o valor nunca seja negativo
    public int calcularRestante() {
        if (metaDiaria == 0) {
            return 0;
        }
        return Math.max(metaDiaria - consumido, 0);
    }

    public boolean metaAtingida() {
        if (metaDiaria == 0) {
            return false;
        }
        return consumido >= metaDiaria;
    }

    public int getConsumido() {
        return consumido;
    }

    public int getMetaDiaria() {
        return metaDiaria;
    }
}

