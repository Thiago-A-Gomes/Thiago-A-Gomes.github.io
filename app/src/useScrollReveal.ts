import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate)
        return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || seen.has(entry.target)) continue;
            seen.add(entry.target);
            // O conteúdo continua visível sem JavaScript ou sem suporte à animação.
            const animation = entry.target.animate(
              [
                { opacity: 0.65, transform: 'translateY(14px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' },
            );
            animations.add(animation);
            animation.onfinish = animation.oncancel = () => animations.delete(animation);
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll('.section-heading,.project-card,.repo-card,.about-grid,.journey-grid')
        .forEach((element) => {
          if (!seen.has(element)) observer?.observe(element);
        });
    };
    setup();
    preference.addEventListener('change', setup);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', setup);
    };
  }, []);
}
