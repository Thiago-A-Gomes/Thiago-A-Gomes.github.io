import kurio from '../../../img/kurio-interface.webp';
import fiscalguard from '../../../img/fiscalguard-case.svg';
import caixinha from '../../../img/caixinha-interface.webp';
import centralEstudos from '../../../img/central-estudos-interface.jpg';
import centralEstudosVideo from '../../../img/central-estudos-apresentacao.mp4';

export type Category = 'Todos' | 'Aplicações web' | 'Automação';
export interface Project {
  id: string;
  name: string;
  label: string;
  category: Exclude<Category, 'Todos'>;
  status: string;
  description: string;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  demo?: string;
  repository?: string;
  access?: 'private';
  video?: string;
  context: string;
  solution: string;
  highlights: string[];
  limitation: string;
}

export const projects: Project[] = [
  {
    id: 'central-estudos',
    name: 'Central de Estudos',
    label: 'Personalized learning',
    category: 'Aplicações web',
    status: 'Public access',
    description:
      'A personal hub for practicing JavaScript, logic, English, and other subjects, with mastery-based progression.',
    technologies: ['JavaScript', 'ES Modules', 'Web Workers', 'HTML / CSS', 'localStorage'],
    image: centralEstudos,
    imageAlt: 'Thiago Gomes’s publicly accessible Study Portal with its own visual identity',
    video: centralEstudosVideo,
    demo: 'https://objetos-lab-thiago.thiagogogomes.chatgpt.site',
    context:
      'Organize class topics and turn recurring questions into a personal practice and review path.',
    solution:
      'A hub with 91 JavaScript challenges, an editor, executable tests, and 26 exercises in English, mathematics, Portuguese, data, and security. Progress and notes remain in the browser.',
    highlights: [
      '272 behavior checks in the JavaScript lab',
      'Code execution in a Web Worker with a two-second timeout',
      'Activities unlock progressively after tests pass',
      'Distinct visual identity and responsive interface',
    ],
    limitation:
      'Public access with 60 original logic exercises and mastery-based progression. Data and progress remain in the browser. Text exercises use reference answers without AI semantic grading.',
  },
  {
    id: 'central-compras',
    name: 'Central de Compras',
    label: 'Systems integration',
    category: 'Automação',
    status: 'In production',
    description:
      'From request to ERP in one workflow. A portal that organizes purchasing and replaces email and spreadsheet requests.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Entra ID', 'SQLite', 'Docker'],
    repository: 'https://github.com/Thiago-A-Gomes/Central-de-compras',
    context:
      'Requests spread across emails and spreadsheets make the purchasing process difficult to track.',
    solution:
      'A portal integrated with Sienge ERP, featuring Microsoft authentication, a catalog, cart, and purchase history.',
    highlights: [
      'Microsoft authentication with Entra ID',
      'Catalog and cart integrated into the purchasing workflow',
      'History for tracking requests',
    ],
    limitation:
      'Documentation is public; operational code is private. The repository presents the case study.',
  },
  {
    id: 'kurio',
    name: 'Kurio',
    label: 'Digital art marketplace',
    category: 'Aplicações web',
    status: 'Front-end challenge',
    description:
      'From catalog to receipt: an NFT marketplace with accounts, favorites, a cart, and checkout error recovery.',
    technologies: ['React', 'TypeScript', 'TanStack Query', 'MSW', 'Socket.IO', 'Playwright'],
    image: kurio,
    imageAlt: 'Kurio NFT catalog with search and filters',
    demo: 'https://frontend-challenge-kurio-thiago-gomes-projects1.vercel.app/',
    repository: 'https://github.com/Thiago-A-Gomes/frontend-challenge-kurio',
    context:
      'A front-end challenge integrating catalog, account, and purchasing flows, including error states and real-time updates.',
    solution:
      'React and TypeScript with TanStack Router/Query, Axios, and a simulated REST API using MSW. Events use the Socket.IO client, and purchase confirmation depends on the simulated response.',
    highlights: [
      '74 end-to-end tests passed in the last complete local desktop and mobile run',
      'Filters preserved in the URL and browser history',
      'Timeout recovery for the same order',
      'Visual regression, keyboard support, and isolation between users',
    ],
    limitation:
      'Data and payments are fictional; no financial transactions or blockchain integration occur. The mobile homepage scored a median of 89 in local performance audits, below the target of 90. Creator and Learn pages are marked “Coming soon.”',
  },
  {
    id: 'fiscalguard',
    name: 'FiscalGuard',
    label: 'Document automation',
    category: 'Automação',
    status: 'Technical case study',
    description:
      'Preventive screening of Brazilian electronic invoice XML files with explainable validations, CSV export, and an audit trail.',
    technologies: ['React', 'TypeScript', 'Vite', 'Node.js', 'Vitest'],
    image: fiscalguard,
    imageAlt: 'Illustrative FiscalGuard dashboard showing electronic invoice XML validations',
    repository: 'https://github.com/Thiago-A-Gomes/fiscalguard',
    context:
      'Repeated checks of tax documents can be time-consuming and make inconsistencies harder to identify.',
    solution:
      'A preventive screening tool for electronic invoice XML files, with explainable results, protected access, and result export.',
    highlights: [
      'Explainable validations',
      'CSV export',
      'Protected access and audit trail',
    ],
    limitation:
      'Demos use synthetic XML files. Screening is preventive, and rules must be adapted to each operation.',
  },
  {
    id: 'caixinha',
    name: 'Caixinha Financeira',
    label: 'Personal finance',
    category: 'Aplicações web',
    status: 'PWA',
    description:
      'Accounts, savings, and goals organized into buckets, with offline support and encrypted local data.',
    technologies: ['JavaScript', 'Web Crypto', 'PWA', 'ES Modules'],
    image: caixinha,
    imageAlt: 'Caixinha Financeira sign-in screen',
    repository: 'https://github.com/Thiago-A-Gomes/caixinha-financeira',
    context:
      'Separating accounts, savings, and goals helps clarify where money goes day to day.',
    solution:
      'A financial organization app using buckets, browser storage, and offline support.',
    highlights: [
      'Organization by accounts, savings, and goals',
      'Offline support',
      'Data encrypted locally with Web Crypto',
    ],
    limitation:
      'Data remains in the browser. The app does not offer banking integration or financial advice.',
  },
  {
    id: 'ritmo-lab',
    name: 'Ritmo Lab',
    label: 'Music education',
    category: 'Aplicações web',
    status: 'Web app',
    description:
      'A lab for composing rhythms, listening to the result, and training musical perception with a metronome.',
    technologies: ['JavaScript', 'Web Audio API', 'SVG', 'HTML / CSS'],
    demo: 'https://ritmo-lab-theta.vercel.app/',
    repository: 'https://github.com/Thiago-A-Gomes?tab=repositories',
    context:
      'A space to practice musical dictation and develop rhythmic perception with visual and audio guidance.',
    solution:
      'An editor with notes, rests, and ties, composition playback, and a continuous metronome with looping and independent volume controls.',
    highlights: [
      'Visual rhythm editor',
      'Playback using the Web Audio API',
      'Metronome with independent controls',
    ],
    limitation:
      'Original exercises and rhythms are saved in the browser. The code link leads to the public repository list.',
  },
];
