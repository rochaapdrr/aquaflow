# 💧 AquaFlow - Gerenciador de Hidratação

O **AquaFlow** é uma aplicação Java baseada em Spring Boot projetada para ajudar usuários a monitorarem seu consumo diário de água. Através de uma interface de linha de comando (CLI), o sistema permite definir metas personalizadas e registrar o consumo ao longo do dia.

---

##  Funcionalidades Atuais

- **Definição de Meta:** Permite configurar quantos ml de água o usuário deseja beber por dia.
- **Registro de Consumo:** Adiciona a quantidade de água ingerida.
- **Status em Tempo Real:** Mostra quanto foi consumido, quanto falta para a meta e valida se a meta foi atingida.
- **Integração Contínua (CI):** Pipeline configurada no GitHub Actions com:
    - Análise estática de código (Checkstyle - Padrão Google).
    - Execução de testes automatizados (JUnit 5).

---

##  Tecnologias Utilizadas

- **Java 21** 
- **Spring Boot**
- **Maven** (Gerenciador de dependências)
- **JUnit 5** (Testes unitários)
- **Checkstyle** (Qualidade de código)
- **GitHub Actions** (CI/CD)

---

##  Como Rodar o Projeto

### Pré-requisitos
- Java 17+ instalado.
- Maven instalado (opcional, pode usar o wrapper `./mvnw`).

### Passos
1. Clone o repositório:
   ```bash
    git clone [https://github.com/SEU_USUARIO/aquaflow.git](https://github.com/SEU_USUARIO/aquaflow.git)

2. Entre na pasta:

    ```Bash
   cd aquaflow

3. Compile e rode os testes:

    ```Bash
    ./mvnw clean test

4.  Execute a aplicação:

    ```Bash
    ./mvnw spring-boot:run

---

## Testes Automatizados

O projeto conta com uma suíte de testes unitários para garantir que a lógica de negócio (`HidratacaoService`) funcione corretamente, cobrindo casos de sucesso e tratamento de erros (entradas inválidas). Para rodar os testes manualmente, basta executar:

```bash
./mvnw test
```

---

## Passos Futuros (Backlog)

O AquaFlow está em sua versão primária, contando apenas com uma interface CLI, porém em constante evolução. Os próximos marcos de desenvolvimento incluem:

- [ ] **Interface Front-end:** Criação de uma interface web moderna utilizando React ou Angular.
- [ ] **Integração com Banco de Dados:** Implementação de persistência de dados utilizando Spring Data JPA e PostgreSQL/H2, permitindo histórico de consumo de dias anteriores.
- [ ] **API RESTful:** Exposição de endpoints para que outras aplicações possam consumir os dados de hidratação.
- [ ] **Notificações:** Envio de lembretes para o usuário beber água em intervalos regulares.
- [ ] **Perfil de Usuário:** Cálculo automático de meta sugerida com base no peso e idade do usuário.

---

Obrigado pela sua atenção, agradeceria o feedback!
