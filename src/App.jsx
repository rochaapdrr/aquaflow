import { useState, useCallback } from 'react'
import { HidratacaoService } from './services/hidratacaoService.js'
import { fetchClimaAtual, obterLocalizacao } from './services/weatherService.js'
import Header from './components/Header.jsx'
import MetaSetup from './components/MetaSetup.jsx'
import Dashboard from './components/Dashboard.jsx'
import WeatherBanner from './components/WeatherBanner.jsx'
import './App.css'

export default function App() {
  const [service] = useState(() => new HidratacaoService())
  const [meta, setMeta] = useState(0)
  const [consumido, setConsumido] = useState(0)
  const [registros, setRegistros] = useState([])
  const [clima, setClima] = useState(null)
  const [climaLoading, setClimaLoading] = useState(false)
  const [climaErro, setClimaErro] = useState(null)

  const handleDefinirMeta = useCallback((novasMeta) => {
    service.definirMeta(novasMeta)
    setMeta(novasMeta)
  }, [service])

  const handleAdicionarConsumo = useCallback((quantidade) => {
    service.adicionarConsumo(quantidade)
    setConsumido(service.getConsumido())
    setRegistros(service.getRegistros())
  }, [service])

  const handleReset = useCallback(() => {
    service.resetar()
    setConsumido(0)
    setRegistros([])
  }, [service])

  const handleBuscarClima = useCallback(async () => {
    setClimaLoading(true)
    setClimaErro(null)
    try {
      const { latitude, longitude } = await obterLocalizacao()
      const dadosClima = await fetchClimaAtual(latitude, longitude)
      setClima(dadosClima)
    } catch (err) {
      setClimaErro(err.message)
    } finally {
      setClimaLoading(false)
    }
  }, [])

  const progresso = meta > 0 ? Math.min((consumido / meta) * 100, 100) : 0
  const restante = meta > 0 ? Math.max(meta - consumido, 0) : 0
  const metaAtingida = meta > 0 && consumido >= meta

  return (
    <div className="app">
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="container">
        <Header />

        <WeatherBanner
          clima={clima}
          loading={climaLoading}
          erro={climaErro}
          onBuscar={handleBuscarClima}
        />

        {meta === 0 ? (
          <MetaSetup onDefinirMeta={handleDefinirMeta} climaExtras={clima?.extras_ml ?? 0} />
        ) : (
          <Dashboard
            meta={meta}
            consumido={consumido}
            restante={restante}
            progresso={progresso}
            metaAtingida={metaAtingida}
            registros={registros}
            climaExtras={clima?.extras_ml ?? 0}
            onAdicionarConsumo={handleAdicionarConsumo}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}
