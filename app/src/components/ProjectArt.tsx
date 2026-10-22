import { Icon } from './Icon';

export function WorkflowArt() {
  return (
    <div
      className="workflow-art"
      role="img"
      aria-label="Esquema ilustrativo: solicitação, catálogo, aprovação e integração com ERP"
    >
      <div className="art-caption">
        <span className="status-dot" /> FLUXO INTEGRADO <Icon name="workflow" />
      </div>
      <div className="flow-item">
        <span className="flow-number">01</span>
        <span>
          Solicitação de compra<small>Um ponto de entrada</small>
        </span>
        <Icon name="check" />
      </div>
      <div className="flow-line" />
      <div className="flow-item active">
        <span className="flow-number">02</span>
        <span>
          Catálogo & carrinho<small>Escolher. Organizar. Enviar.</small>
        </span>
        <Icon name="layers" />
      </div>
      <div className="flow-line" />
      <div className="flow-item">
        <span className="flow-number">03</span>
        <span>
          Integração com ERP<small>Histórico e acompanhamento</small>
        </span>
        <Icon name="arrow" />
      </div>
      <div className="art-footer">
        <span>Microsoft Entra ID</span>
        <span>ERP Sienge ↗</span>
      </div>
    </div>
  );
}

export function RhythmArt() {
  return (
    <div
      className="rhythm-art"
      role="img"
      aria-label="Ilustração do Ritmo Lab: notas musicais sobre uma pauta e sequência de batidas"
    >
      <div className="rhythm-heading">
        <span>RITMO LAB</span>
        <span>4 / 4</span>
      </div>
      <svg viewBox="0 0 480 150" aria-hidden="true" className="staff">
        <g stroke="currentColor" strokeWidth="1" opacity=".25">
          {[30, 50, 70, 90, 110].map((y) => (
            <path key={y} d={`M20 ${y}h440`} />
          ))}
        </g>
        <g fill="currentColor">
          <ellipse cx="90" cy="90" rx="12" ry="8" transform="rotate(-20 90 90)" />
          <ellipse cx="190" cy="70" rx="12" ry="8" transform="rotate(-20 190 70)" />
          <ellipse cx="290" cy="80" rx="12" ry="8" transform="rotate(-20 290 80)" />
          <ellipse cx="390" cy="50" rx="12" ry="8" transform="rotate(-20 390 50)" />
        </g>
        <g stroke="currentColor" strokeWidth="3">
          <path d="M101 90V25m100 45V5m100 75V15m100 35V0" />
        </g>
      </svg>
      <div className="beats">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={i === 0 || i === 4 ? 'beat strong' : 'beat'} />
        ))}
      </div>
      <div className="rhythm-footer">
        <span>COMPOSIÇÃO · ESCUTA · PRÁTICA</span>
        <span className="play-symbol">
          <Icon name="play" />
        </span>
      </div>
    </div>
  );
}
