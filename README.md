# 💧 AquaFlow v2 – Gerenciador de Hidratação

> **🔗 Deploy:** [https://aquaflow.vercel.app](https://aquaflow.vercel.app) 

AquaFlow é um gerenciador de hidratação diária com **integração climática**. A aplicação consulta a temperatura atual da sua região e sugere um ajuste na meta de consumo de água para dias quentes.

---

## ✨ Funcionalidades

- **Definição de Meta Diária** – Presets rápidos (1,5L / 2L / 2,5L / 3L) ou valor personalizado
- **Integração Climática (Open-Meteo API)** – Sugere ml extras com base na temperatura local
- **Registro de Consumo** – Botões rápidos (+150ml, +200ml, +300ml, +500ml) ou valor livre
- **Progresso Visual** – Anel animado com percentual em tempo real
- **Histórico do Dia** – Log de todos os registros com horário
- **Interface Responsiva** – Funciona em desktop e mobile

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite |
| Lógica de negócio | JavaScript puro (sem dependências externas) |
| API Externa | [Open-Meteo](https://open-meteo.com/) (gratuita, sem chave) |
| Testes | Vitest + Testing Library |
| CI/CD | GitHub Actions |
| Deploy | Vercel |

---

## 🧪 Testes

O projeto possui **testes unitários** e **testes de integração**:

```bash
# Rodar todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Com relatório de cobertura
npm run test:coverage
```

### Cobertura de testes

| Arquivo | Tipo | Casos |
|---|---|---|
| `hidratacaoService.test.js` | Unitário | 11 casos (caminho feliz + erros + edge cases) |
| `weatherService.test.js` | **Integração** | 8 casos (mock HTTP, erros, validação de URL) |

---

## 🚀 Rodando localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/aquaflow.git
cd aquaflow

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse em http://localhost:5173
```

---

## 🔄 Pipeline CI/CD (GitHub Actions)

O arquivo `.github/workflows/ci.yml` executa automaticamente em cada push:

1. **🧪 Lint & Testes** – Roda todos os testes unitários e de integração + cobertura
2. **🏗️ Build** – Compila o projeto com Vite (garante que o build de produção não quebra)
3. **🚀 Deploy** – Publica automaticamente na Vercel quando mergeado na `main`

### Secrets necessários no GitHub

| Secret | Como obter |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `vercel env pull` na raiz do projeto |
| `VERCEL_PROJECT_ID` | `vercel env pull` na raiz do projeto |

---

## 📋 Entrega Intermediária – Checklist

- [x] Issue criada descrevendo a integração com a API Open-Meteo
- [x] Branch `entrega-intermediaria` criada a partir da `main`
- [x] Integração com API pública (Open-Meteo – temperatura e clima)
- [x] Testes de integração implementados (`weatherService.test.js`)
- [x] Deploy publicado na Vercel
- [x] README atualizado com link do deploy
- [x] Pull Request abrindo da `entrega-intermediaria` → `main` com `closes #1`

---

## 🌐 API Utilizada – Open-Meteo

- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Dados usados:** `temperature_2m` e `weathercode`
- **Documentação:** [open-meteo.com/en/docs](https://open-meteo.com/en/docs)

---

*Migrado de Java/Spring Boot para JavaScript/React como parte da Etapa Intermediária.*
