export function LatestTransmissionLoading() {
  return (
    <section className="transmission-panel" id="ultima-transmision" aria-labelledby="latest-loading-title">
      <div className="panel-header">
        <span>ÚLTIMA TRANSMISIÓN</span>
        <span className="frequency">BUSCANDO</span>
      </div>
      <h2 id="latest-loading-title">Sintonizando @elvaciofm</h2>
      <div className="video-frame">
        <div className="video-standby" role="status">
          <span>RASTREANDO SEÑAL</span>
          <strong>BUFFER ANALÓGICO</strong>
        </div>
      </div>
    </section>
  );
}
