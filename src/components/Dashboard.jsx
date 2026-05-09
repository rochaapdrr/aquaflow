import { useState } from 'react'

const QUICK_AMOUNTS = [150, 200, 300, 500]

function ProgressRing({ progresso }) {
  const r = 80
  const circ = 2 * Math.PI * r
  const offset = circ - (progresso / 100) * circ

  return (
    <svg className="progress-ring" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r={r} className="ring-bg" />
      <circle
        cx="100" cy="100" r={r}
        className="ring-fill"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="100" y="95" textAnchor="middle" className="ring-pct">
        {Math.round(progresso)}%
      </text>
      <text x="100" y="118" textAnchor="middle" className="ring-label">
        concluído
      </text>
    </svg>
  )
}

export default function Dashboard({
  meta, consumido, restante, progresso, metaAtingida,
  registros, climaExtras, onAdicionarConsumo, onReset,
}) {
  const [inputQtd, setInputQtd] = useState('')
  const [erro, setErro] = useState('')
  const [lastAdded, setLastAdded] = useState(null)

  const adicionar = (qtd) => {
    const num = typeof qtd === 'number' ? qtd : parseInt(inputQtd, 10)
    if (!num || num <= 0) {
      setErro('Digite uma quantidade válida em ml')
      return
    }
    setErro('')
    onAdicionarConsumo(num)
    setLastAdded(num)
    setInputQtd('')
    setTimeout(() => setLastAdded(null), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    adicionar()
  }

  return (
    <div className="dashboard">
      {/* ── Status cards ── */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{consumido.toLocaleString('pt-BR')}</span>
          <span className="stat-label">ml consumidos</span>
        </div>
        <div className="stat-card stat-card--accent">
          <ProgressRing progresso={progresso} />
        </div>
        <div className="stat-card">
          <span className="stat-value">{restante.toLocaleString('pt-BR')}</span>
          <span className="stat-label">ml restantes</span>
        </div>
      </div>

      {/* ── Meta atingida ── */}
      {metaAtingida && (
        <div className="success-banner">
          🎉 Parabéns! Você atingiu sua meta de {meta.toLocaleString('pt-BR')} ml hoje!
        </div>
      )}

      {/* ── Dica de clima ── */}
      {climaExtras > 0 && !metaAtingida && (
        <div className="info-banner">
          ☀️ Por conta do calor, tente adicionar mais <strong>{climaExtras} ml</strong> à sua meta.
        </div>
      )}

      {/* ── Registrar consumo ── */}
      <div className="card">
        <h3 className="card-title">Registrar consumo 💧</h3>

        <div className="quick-btns">
          {QUICK_AMOUNTS.map((q) => (
            <button key={q} className="btn btn-quick" onClick={() => adicionar(q)}>
              +{q} ml
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="meta-form">
          <div className="input-group">
            <input
              type="number"
              className="input"
              placeholder="quantidade personalizada..."
              value={inputQtd}
              onChange={(e) => { setInputQtd(e.target.value); setErro('') }}
              min="1"
            />
            <span className="input-unit">ml</span>
          </div>
          {erro && <p className="form-erro">{erro}</p>}
          {lastAdded && <p className="form-ok">✅ +{lastAdded} ml registrados!</p>}
          <button type="submit" className="btn btn-primary btn-block">
            Adicionar
          </button>
        </form>
      </div>

      {/* ── Histórico ── */}
      {registros.length > 0 && (
        <div className="card">
          <div className="card-header-row">
            <h3 className="card-title">Histórico do dia 📋</h3>
            <button className="btn btn-sm btn-danger" onClick={onReset}>
              Resetar dia
            </button>
          </div>
          <ul className="history-list">
            {[...registros].reverse().map((r, i) => (
              <li key={i} className="history-item">
                <span className="history-hora">{r.hora}</span>
                <span className="history-qtd">+{r.quantidade} ml</span>
              </li>
            ))}
          </ul>
          <div className="history-total">
            Total: <strong>{consumido.toLocaleString('pt-BR')} ml</strong> em {registros.length} registro(s)
          </div>
        </div>
      )}
    </div>
  )
}
