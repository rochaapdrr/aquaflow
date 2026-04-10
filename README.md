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
## Vizualização do projeto no terminal:

<img width="460" height="283" alt="auaflow - image 3" src="https://github.com/user-attachments/assets/4431e26c-7bc8-4cfd-b990-e806a3128219" />  

<img width="368" height="145" alt="aquaflow - image 2" src="https://github.com/user-attachments/assets/dde9cefd-d711-4629-8210-99d23e97aee7" />  

<img width="538" height="245" alt="aquaflow - image" src="https://github.com/user-attachments/assets/b138810e-69a6-4e75-9186-2933e8b07357" />  



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
    git clone [https://github.com/rochaapdrr/aquaflow.git](https://github.com/rochaapdrr/aquaflow.git)

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


## Passos Futuros (Backlog)

O AquaFlow está em sua versão primária, contando apenas com uma interface CLI, porém em constante evolução. Os próximos marcos de desenvolvimento incluem:

- [ ] **Interface Front-end:** Criação de uma interface web moderna utilizando React ou Angular.
- [ ] **Integração com Banco de Dados:** Implementação de persistência de dados utilizando Spring Data JPA e PostgreSQL/H2, permitindo histórico de consumo de dias anteriores.
- [ ] **API RESTful:** Exposição de endpoints para que outras aplicações possam consumir os dados de hidratação.
- [ ] **Notificações:** Envio de lembretes para o usuário beber água em intervalos regulares.
- [ ] **Perfil de Usuário:** Cálculo automático de meta sugerida com base no peso e idade do usuário.
- [ ] **Dockerfile:** Utilização do Docker para fácil compactação da aplicação
---

Obrigado pela sua atenção, agradeceria o feedback!
