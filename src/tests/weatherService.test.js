import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fetchClimaAtual,
  calcularExtrasHidratacao,
  interpretarWeatherCode,
} from '../services/weatherService.js'

// ─── Testes de Integração – WeatherService ────────────────────────────────────
//
// Esses testes validam o FLUXO COMPLETO de comunicação com a API Open-Meteo,
// simulando (mockando) as respostas HTTP para que os testes sejam determinísticos
// e não dependam de conexão real com a internet na pipeline de CI.
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_RESPONSE_QUENTE = {
  current: {
    temperature_2m: 32,
    weathercode: 0,
  },
}

const MOCK_RESPONSE_FRIO = {
  current: {
    temperature_2m: 18,
    weathercode: 61,
  },
}

describe('WeatherService - Testes de Integração', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  // ─── fetchClimaAtual ─────────────────────────────────────────────────────────

  it('deve retornar temperatura, descrição e extras_ml a partir da resposta da API', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_RESPONSE_QUENTE,
    })

    const resultado = await fetchClimaAtual(-23.5505, -46.6333)

    expect(resultado.temperatura).toBe(32)
    expect(resultado.descricao).toBe('Céu limpo ☀️')
    expect(resultado.extras_ml).toBe(700) // (32 - 25) * 100
  })

  it('deve retornar extras_ml = 0 quando temperatura for menor ou igual a 25°C', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_RESPONSE_FRIO,
    })

    const resultado = await fetchClimaAtual(-15.7801, -47.9292)

    expect(resultado.temperatura).toBe(18)
    expect(resultado.extras_ml).toBe(0)
    expect(resultado.descricao).toBe('Chuva 🌧️')
  })

  it('deve lançar erro quando a API retornar status HTTP de falha', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
    })

    await expect(fetchClimaAtual(-23.5505, -46.6333)).rejects.toThrow(
      'Erro ao buscar clima: HTTP 503'
    )
  })

  it('deve lançar erro quando a resposta da API não contiver os campos esperados', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ current: {} }), // campos ausentes
    })

    await expect(fetchClimaAtual(-23.5505, -46.6333)).rejects.toThrow(
      'Resposta da API inválida: campos ausentes'
    )
  })

  it('deve construir a URL correta com as coordenadas fornecidas', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_RESPONSE_QUENTE,
    })

    await fetchClimaAtual(-23.5505, -46.6333)

    const chamadaUrl = fetch.mock.calls[0][0]
    expect(chamadaUrl).toContain('latitude=-23.5505')
    expect(chamadaUrl).toContain('longitude=-46.6333')
    // URLSearchParams encodes vírgula como %2C
    expect(decodeURIComponent(chamadaUrl)).toContain('current=temperature_2m,weathercode')
  })

  // ─── calcularExtrasHidratacao ────────────────────────────────────────────────

  it('calcularExtrasHidratacao deve retornar 0 para temperatura <= 25', () => {
    expect(calcularExtrasHidratacao(25)).toBe(0)
    expect(calcularExtrasHidratacao(20)).toBe(0)
    expect(calcularExtrasHidratacao(10)).toBe(0)
  })

  it('calcularExtrasHidratacao deve calcular corretamente para temperatura alta', () => {
    expect(calcularExtrasHidratacao(30)).toBe(500)
    expect(calcularExtrasHidratacao(35)).toBe(1000)
    expect(calcularExtrasHidratacao(40)).toBe(1500)
  })

  // ─── interpretarWeatherCode ──────────────────────────────────────────────────

  it('deve interpretar códigos WMO corretamente', () => {
    expect(interpretarWeatherCode(0)).toBe('Céu limpo ☀️')
    expect(interpretarWeatherCode(2)).toBe('Parcialmente nublado ⛅')
    expect(interpretarWeatherCode(61)).toBe('Chuva 🌧️')
    expect(interpretarWeatherCode(71)).toBe('Neve ❄️')
    expect(interpretarWeatherCode(95)).toBe('Tempestade ⛈️')
  })
})
