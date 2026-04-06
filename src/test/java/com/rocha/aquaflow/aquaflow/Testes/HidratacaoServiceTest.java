package com.rocha.aquaflow.aquaflow.Testes;
import static org.junit.jupiter.api.Assertions.*;
import com.rocha.aquaflow.aquaflow.Business.HidratacaoService;
import org.junit.jupiter.api.Test;

class HidratacaoServiceTest {

    @Test
    void deveRegistrarConsumoCaminhoFeliz() {
        HidratacaoService service = new HidratacaoService();

        service.definirMeta(2000);
        service.adicionarConsumo(500);

        assertEquals(1500, service.calcularRestante(), "Deveria faltar 1500ml");
        assertFalse(service.metaAtingida());
        System.out.println("Meta: " + service.getMetaDiaria());
        System.out.println("Consumido: " + service.getConsumido());
        System.out.println("Atingiu: " + service.metaAtingida());
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
