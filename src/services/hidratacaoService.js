/**
 * HidratacaoService
 * Core business logic for the AquaFlow hydration tracker.
 * Ported from Java/Spring Boot to plain JavaScript.
 */
export class HidratacaoService {
  constructor() {
    this.metaDiaria = 0
    this.consumido = 0
    this.registros = []
  }

  definirMeta(metaDiaria) {
    if (!Number.isFinite(metaDiaria) || metaDiaria <= 0) {
      throw new Error('A meta deve ser maior que 0!')
    }
    this.metaDiaria = metaDiaria
  }

  adicionarConsumo(quantidade) {
    if (!Number.isFinite(quantidade) || quantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero!')
    }
    this.consumido += quantidade
    this.registros.push({
      quantidade,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    })
  }

  calcularRestante() {
    if (this.metaDiaria === 0) return 0
    return Math.max(this.metaDiaria - this.consumido, 0)
  }

  metaAtingida() {
    if (this.metaDiaria === 0) return false
    return this.consumido >= this.metaDiaria
  }

  getProgresso() {
    if (this.metaDiaria === 0) return 0
    return Math.min((this.consumido / this.metaDiaria) * 100, 100)
  }

  resetar() {
    this.consumido = 0
    this.registros = []
  }

  getConsumido() { return this.consumido }
  getMetaDiaria() { return this.metaDiaria }
  getRegistros() { return [...this.registros] }
}

// Singleton para uso no React (estado persiste durante a sessão)
export const hidratacaoService = new HidratacaoService()
