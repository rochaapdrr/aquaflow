export default function WeatherBanner({ clima, loading, erro, onBuscar }) {
  return (
    <div className="weather-banner">
      {!clima && !loading && !erro && (
        <div className="weather-prompt">
          <span className="weather-icon">🌡️</span>
          <p>Quer uma meta personalizada para o clima atual?</p>
          <button className="btn btn-weather" onClick={onBuscar}>
            Usar minha localização
          </button>
        </div>
      )}

      {loading && (
        <div className="weather-loading">
          <span className="spin">🌀</span> Buscando clima...
        </div>
      )}

      {erro && (
        <div className="weather-erro">
          <span>⚠️ {erro}</span>
          <button className="btn btn-sm" onClick={onBuscar}>Tentar novamente</button>
        </div>
      )}

      {clima && !loading && (
        <div className="weather-result">
          <div className="weather-info">
            <span className="weather-temp">{clima.temperatura}°C</span>
            <span className="weather-desc">{clima.descricao}</span>
          </div>
          {clima.extras_ml > 0 && (
            <div className="weather-tip">
              🔥 Calor intenso! Recomendamos <strong>+{clima.extras_ml} ml</strong> extras hoje.
            </div>
          )}
          {clima.extras_ml === 0 && (
            <div className="weather-tip weather-tip--ok">
              ✅ Temperatura agradável. Meta padrão é suficiente.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
