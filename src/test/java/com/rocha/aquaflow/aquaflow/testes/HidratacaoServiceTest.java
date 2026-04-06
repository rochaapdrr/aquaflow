package com.rocha.aquaflow.aquaflow.testes;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rocha.aquaflow.aquaflow.business.HidratacaoService;
import org.junit.jupiter.api.Test;

class HidratacaoServiceTest {

    @Test
    void deveRegistrarConsumoCaminhoFeliz() {
        HidratacaoService service = new HidratacaoService();

        service.definirMeta(2000);
        service.adicionarConsumo(500);

        assertEquals(1500, service.calcularRestante(), "Deveria faltar 1500ml");
        assertFalse(service.metaAtingida());
    }

    @Test
    void deveLancarExcecaoParaEntradaInvalida() {
        HidratacaoService service = new HidratacaoService();

        service.definirMeta(2000);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.adicionarConsumo(-100);
        });

        assertEquals("A quantidade deve ser maior que zero!", exception.getMessage());
    }

    @Test
    void deveAtingirMetaExata() {
        HidratacaoService service = new HidratacaoService();

        service.definirMeta(2000);
        service.adicionarConsumo(2000);

        assertEquals(0, service.calcularRestante());
        assertTrue(service.metaAtingida(), "A meta deveria constar como atingida");
    }
}