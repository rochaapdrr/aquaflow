package com.rocha.aquaflow.aquaflow.cli;

import com.rocha.aquaflow.aquaflow.business.HidratacaoService;
import java.util.Scanner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class ConsoleApp implements CommandLineRunner {
    private final HidratacaoService service;

    public ConsoleApp(HidratacaoService service) {
        this.service = service;
    }

    @Override
    public void run(String... args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== AQUAFLOW ===");
        System.out.print("Defina sua meta diária de água (ml): ");

        int meta = scanner.nextInt();
        service.definirMeta(meta);

        while (true) {
            System.out.println("\nEscolha uma opção:");
            System.out.println("1 - Registrar consumo de água");
            System.out.println("2 - Ver status");
            System.out.println("0 - Sair");

            int opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.print("Quantidade consumida (ml): ");
                    int consumido = scanner.nextInt();
                    service.adicionarConsumo(consumido);
                    break;
                case 2:
                    System.out.println("\n--- STATUS ---");
                    System.out.println("Consumido: " + service.getConsumido() + " ml");
                    System.out.println("Meta: " + service.getMetaDiaria() + " ml");
                    System.out.println("Restante: " + service.calcularRestante() + " ml");

                    if (service.metaAtingida()) {
                        System.out.println(" Parabéns! Meta atingida!");
                    } else {
                        System.out.println(" Continue! Você está no caminho.");
                    }
                    break;
                case 0:
                    System.out.println("Encerrando...");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Opção inválida.");
            }
        }
    }
}