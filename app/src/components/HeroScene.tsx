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
        <span>TECHNOLOGY × CREATIVITY</span>
        <button
          type="button"
          className="motion-toggle"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume 3D animation' : 'Pause 3D animation'}
        >
          <Icon name={paused ? 'play' : 'pause'} /> {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
