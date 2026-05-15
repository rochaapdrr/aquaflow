import { describe, it, expect, beforeEach } from 'vitest'
import { HidratacaoService } from '../services/hidratacaoService.js'

describe('HidratacaoService - Testes Unitários', () => {
  let service

  beforeEach(() => {
    service = new HidratacaoService()
  })

  // ─── Caminho feliz ───────────────────────────────────────────────────────────

  it('deve registrar consumo e calcular restante corretamente', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(500)

    expect(service.calcularRestante()).toBe(1500)
    expect(service.metaAtingida()).toBe(false)
  })

  it('deve atingir a meta exata', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(2000)

    expect(service.calcularRestante()).toBe(0)
    expect(service.metaAtingida()).toBe(true)
  })

  it('deve acumular múltiplos registros de consumo', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(300)
    service.adicionarConsumo(700)
    service.adicionarConsumo(500)

    expect(service.getConsumido()).toBe(1500)
    expect(service.calcularRestante()).toBe(500)
  })

  it('deve calcular progresso percentual corretamente', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(1000)

    expect(service.getProgresso()).toBe(50)
  })

  it('progresso não deve ultrapassar 100% mesmo com excesso', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(3000)

    expect(service.getProgresso()).toBe(100)
    expect(service.calcularRestante()).toBe(0)
  })

  it('deve guardar histórico de registros', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(250)
    service.adicionarConsumo(500)

    const registros = service.getRegistros()
    expect(registros).toHaveLength(2)
    expect(registros[0].quantidade).toBe(250)
    expect(registros[1].quantidade).toBe(500)
  })

  it('deve resetar o consumo mas manter a meta', () => {
    service.definirMeta(2000)
    service.adicionarConsumo(1000)
    service.resetar()

    expect(service.getConsumido()).toBe(0)
    expect(service.getMetaDiaria()).toBe(2000)
    expect(service.getRegistros()).toHaveLength(0)
  })

  // ─── Entradas inválidas ──────────────────────────────────────────────────────

  it('deve lançar exceção para meta inválida (zero)', () => {
    expect(() => service.definirMeta(0)).toThrow('A meta deve ser maior que 0!')
  })

  it('deve lançar exceção para meta negativa', () => {
    expect(() => service.definirMeta(-500)).toThrow('A meta deve ser maior que 0!')
  })

  it('deve lançar exceção para consumo negativo', () => {
    service.definirMeta(2000)
    expect(() => service.adicionarConsumo(-100)).toThrow('A quantidade deve ser maior que zero!')
  })

  it('deve lançar exceção para consumo zero', () => {
    service.definirMeta(2000)
    expect(() => service.adicionarConsumo(0)).toThrow('A quantidade deve ser maior que zero!')
  })

  // ─── Estado inicial ──────────────────────────────────────────────────────────

  it('deve retornar 0 no progresso quando meta não foi definida', () => {
    expect(service.getProgresso()).toBe(0)
    expect(service.calcularRestante()).toBe(0)
    expect(service.metaAtingida()).toBe(false)
  })
})
