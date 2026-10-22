export type IconName =
  | 'arrow'
  | 'down'
  | 'code'
  | 'layers'
  | 'check'
  | 'close'
  | 'mail'
  | 'copy'
  | 'location'
  | 'github'
  | 'play'
  | 'pause'
  | 'workflow'
  | 'sun'
  | 'moon';
const paths: Record<IconName, React.ReactNode> = {
  pause: <path d="M8 5v14M16 5v14" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
    </>
  ),
  moon: <path d="M20.6 13A9 9 0 0 1 11 3.4 9 9 0 1 0 20.6 13Z" />,
  arrow: (
    <>
      <path d="M7 17 17 7M7 7h10v10" />
    </>
  ),
  down: (
    <>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-16-2 22" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8zm-9 9 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3 3 0 0 0-.8-2.3C19 15.2 21 13.5 21 10a7 7 0 0 0-2-5c.2-1 .2-2-.3-3-2 0-3 1-4 2a14 14 0 0 0-5.4 0C8 3 7 2 5 2c-.5 1-.5 2-.3 3A7 7 0 0 0 3 10c0 3.5 2 5.2 6.8 5.7A3 3 0 0 0 9 18v4" />
    </>
  ),
  play: <path d="m8 4 13 8-13 8z" />,
  workflow: (
    <>
      <rect x="2" y="3" width="7" height="7" rx="2" />
      <rect x="15" y="14" width="7" height="7" rx="2" />
      <path d="M9 6h7a3 3 0 0 1 3 3v5M5 10v5a3 3 0 0 0 3 3h7" />
    </>
  ),
};
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
