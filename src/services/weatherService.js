/**
 * WeatherService
 * Integração com a API Open-Meteo (gratuita, sem chave de API).
 * Busca temperatura atual para sugerir ajuste na meta de hidratação.
 * Docs: https://open-meteo.com/
 */

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast'

/**
 * Busca clima atual a partir de coordenadas geográficas.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ temperatura: number, descricao: string, extras_ml: number }>}
 */
export async function fetchClimaAtual(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    current: 'temperature_2m,weathercode',
    timezone: 'auto',
  })

  const url = `${OPEN_METEO_BASE}?${params}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro ao buscar clima: HTTP ${response.status}`)
  }

  const data = await response.json()

  const temperatura = data.current?.temperature_2m
  const weatherCode = data.current?.weathercode

  if (temperatura === undefined || weatherCode === undefined) {
    throw new Error('Resposta da API inválida: campos ausentes')
  }

  return {
    temperatura,
    descricao: interpretarWeatherCode(weatherCode),
    extras_ml: calcularExtrasHidratacao(temperatura),
  }
}

/**
 * Calcula quantos ml a mais o usuário deve beber com base na temperatura.
 * Referência: cada grau acima de 25°C → +100ml sugeridos.
 */
export function calcularExtrasHidratacao(temperatura) {
  if (temperatura <= 25) return 0
  return Math.round((temperatura - 25) * 100)
}

/**
 * Retorna descrição em português do código WMO de tempo meteorológico.
 */
export function interpretarWeatherCode(code) {
  if (code === 0) return 'Céu limpo ☀️'
  if (code <= 3) return 'Parcialmente nublado ⛅'
  if (code <= 49) return 'Neblina / névoa 🌫️'
  if (code <= 67) return 'Chuva 🌧️'
  if (code <= 77) return 'Neve ❄️'
  if (code <= 82) return 'Pancadas de chuva 🌦️'
  if (code <= 99) return 'Tempestade ⛈️'
  return 'Clima desconhecido'
}

/**
 * Busca coordenadas do usuário via Geolocation API do browser.
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function obterLocalizacao() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada neste browser'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => reject(new Error('Permissão de localização negada')),
      { timeout: 8000 }
    )
  })
}
