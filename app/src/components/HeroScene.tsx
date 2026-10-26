import { useState } from 'react';
import orbit from '../../../img/creative-orbit.jpg';
import { Icon } from './Icon';

export function HeroScene() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`hero-scene creative-scene ${paused ? 'is-paused' : ''}`}>
      <div className="sculpture">
        <img src={orbit} alt="" width="1536" height="1024" fetchPriority="high" />
      </div>
      <div className="scene-bottom">
        <span>TECNOLOGIA × CRIATIVIDADE</span>
        <button
          type="button"
          className="motion-toggle"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          aria-label={paused ? 'Retomar animação 3D' : 'Pausar animação 3D'}
        >
          <Icon name={paused ? 'play' : 'pause'} /> {paused ? 'Retomar' : 'Pausar'}
        </button>
      </div>
    </div>
  );
}
