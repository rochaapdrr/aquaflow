import { useState } from 'react'

const PRESETS = [1500, 2000, 2500, 3000]

export default function MetaSetup({ onDefinirMeta, climaExtras }) {
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = parseInt(valor, 10)
    if (!num || num <= 0) {
      setErro('Digite uma meta válida em ml (ex: 2000)')
      return
    }
    setErro('')
    onDefinirMeta(num)
  }

  const handlePreset = (v) => {
    setValor(String(v))
    setErro('')
  }

  return (
    <div className="card meta-setup">
      <h2 className="card-title">Defina sua meta diária 🎯</h2>
      <p className="card-sub">
        A recomendação geral é de <strong>2.000 ml</strong> por dia.
        {climaExtras > 0 && (
          <span className="meta-tip"> Com o clima atual, considere +{climaExtras} ml.</span>
        )}
      </p>

      <div className="presets">
        {PRESETS.map((p) => (
          <button
            key={p}
            className={`btn btn-preset ${valor === String(p) ? 'btn-preset--active' : ''}`}
            onClick={() => handlePreset(p)}
            type="button"
          >
            {(p / 1000).toFixed(1)}L
          </button>
        ))}
      </div>

      {climaExtras > 0 && (
        <button
          className="btn btn-preset btn-preset--weather"
          onClick={() => handlePreset(2000 + climaExtras)}
          type="button"
        >
          ☀️ {((2000 + climaExtras) / 1000).toFixed(1)}L (recomendado p/ hoje)
        </button>
      )}

      <form onSubmit={handleSubmit} className="meta-form">
        <div className="input-group">
          <input
            type="number"
            className="input"
            placeholder="ou digite em ml..."
            value={valor}
            onChange={(e) => { setValor(e.target.value); setErro('') }}
            min="1"
          />
          <span className="input-unit">ml</span>
        </div>
        {erro && <p className="form-erro">{erro}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Começar o dia 🚀
        </button>
      </form>
    </div>
  )
}
