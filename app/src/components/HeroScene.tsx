import { useRef, useState } from 'react';
import { Icon } from './Icon';

// Perspectiva feita com CSS. O efeito só roda em ponteiros precisos;
// a preferência por movimento reduzido mantém a composição estática.
export function HeroScene() {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`hero-scene ${paused ? 'is-paused' : ''}`}
      ref={scene}
      onPointerMove={(event) => {
        if (
          !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches ||
          !scene.current
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        scene.current.style.setProperty(
          '--tilt-x',
          `${(event.clientY - box.top - box.height / 2) / -45}deg`,
        );
        scene.current.style.setProperty(
          '--tilt-y',
          `${(event.clientX - box.left - box.width / 2) / 45}deg`,
        );
      }}
      onPointerLeave={() => {
        scene.current?.style.setProperty('--tilt-x', '0deg');
        scene.current?.style.setProperty('--tilt-y', '0deg');
      }}
    >
      <div className="scene-glow" aria-hidden="true" />
      <div className="scene-grid" aria-hidden="true" />
      <div className="orbit-label">
        <span className="status-dot" /> CÓDIGO EM MOVIMENTO
      </div>
      <div className="scene-object" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="cube">
          <div className="cube-face front">
            <span>&lt;/&gt;</span>
          </div>
          <div className="cube-face back">
            <span>{'{ }'}</span>
          </div>
          <div className="cube-face right">
            <span>TS</span>
          </div>
          <div className="cube-face left">
            <span>JS</span>
          </div>
          <div className="cube-face top" />
          <div className="cube-face bottom" />
        </div>
        <div className="floating-token token-react">
          <span className="atom">⚛</span>
          <span>React</span>
        </div>
        <div className="floating-token token-ts">
          <b>TS</b>
          <span>TypeScript</span>
        </div>
        <div className="floating-token token-flow">
          <Icon name="workflow" />
          <span>Automação</span>
        </div>
        <div className="scene-coordinate">
          X 01.00
          <br />Y 02.26
          <br />Z → NEXT
        </div>
      </div>
      <div className="scene-bottom">
        <span>DA IDEIA À INTERFACE</span>
        <button
          type="button"
          className="motion-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? 'Retomar animação 3D' : 'Pausar animação 3D'}
        >
          <Icon name={paused ? 'play' : 'pause'} /> {paused ? 'Retomar' : 'Pausar'}
        </button>
      </div>
    </div>
  );
}
