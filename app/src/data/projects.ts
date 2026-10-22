import kurio from '../../../img/kurio-interface.webp';
import fiscalguard from '../../../img/fiscalguard-case.svg';
import caixinha from '../../../img/caixinha-interface.webp';

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
  repository: string;
  context: string;
  solution: string;
  highlights: string[];
  limitation: string;
}

export const projects: Project[] = [
  {
    id: 'central-compras',
    name: 'Central de Compras',
    label: 'Integração de sistemas',
    category: 'Automação',
    status: 'Em produção',
    description:
      'Da solicitação ao ERP, em um só fluxo. Um portal para organizar compras e substituir pedidos por e-mail e planilhas.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Entra ID', 'SQLite', 'Docker'],
    repository: 'https://github.com/Thiago-A-Gomes/Central-de-compras',
    context:
      'Solicitações distribuídas entre e-mails e planilhas dificultam acompanhar o processo de compra.',
    solution:
      'Portal integrado ao ERP Sienge, com autenticação Microsoft, catálogo, carrinho e histórico de compras.',
    highlights: [
      'Autenticação Microsoft com Entra ID',
      'Catálogo e carrinho integrados ao processo de compras',
      'Histórico para acompanhar solicitações',
    ],
    limitation:
      'Documentação pública; o código da operação é privado. O repositório apresenta o estudo de caso.',
  },
  {
    id: 'kurio',
    name: 'Kurio',
    label: 'Marketplace de arte digital',
    category: 'Aplicações web',
    status: 'Desafio frontend',
    description:
      'Do catálogo ao recibo: marketplace de NFTs com conta, favoritos, carrinho e recuperação de erros no checkout.',
    technologies: ['React', 'TypeScript', 'TanStack Query', 'MSW', 'Socket.IO', 'Playwright'],
    image: kurio,
    imageAlt: 'Catálogo do Kurio com NFTs, busca e filtros',
    demo: 'https://frontend-challenge-kurio-thiago-gomes-projects1.vercel.app/',
    repository: 'https://github.com/Thiago-A-Gomes/frontend-challenge-kurio',
    context:
      'Um desafio frontend para integrar catálogo, conta e compra, incluindo estados de erro e atualizações em tempo real.',
    solution:
      'React e TypeScript com TanStack Router/Query, Axios e REST simulado via MSW. Eventos passam pelo cliente Socket.IO e a confirmação da compra depende da resposta da simulação.',
    highlights: [
      '74 testes E2E aprovados na última suíte local completa, em desktop e mobile',
      'Filtros preservados na URL e no histórico',
      'Timeout com recuperação do mesmo pedido',
      'Regressão visual, teclado e isolamento entre usuários',
    ],
    limitation:
      'Dados e pagamentos fictícios, sem transação financeira ou integração blockchain. O início mobile teve desempenho mediano 89 nas auditorias locais, abaixo da meta 90. Criadores e Aprenda têm telas “Em breve”.',
  },
  {
    id: 'fiscalguard',
    name: 'FiscalGuard',
    label: 'Automação de documentos',
    category: 'Automação',
    status: 'Case técnico',
    description:
      'Triagem preventiva de XMLs de NF-e com validações explicáveis, exportação CSV e trilha de auditoria.',
    technologies: ['React', 'TypeScript', 'Vite', 'Node.js', 'Vitest'],
    image: fiscalguard,
    imageAlt: 'Painel ilustrativo do FiscalGuard com validações de XML de NF-e',
    repository: 'https://github.com/Thiago-A-Gomes/fiscalguard',
    context:
      'Conferências repetitivas de documentos fiscais podem consumir tempo e dificultar a identificação de inconsistências.',
    solution:
      'Uma ferramenta de triagem preventiva de XMLs de NF-e, com resultados explicáveis, acesso protegido e exportação dos resultados.',
    highlights: [
      'Validações explicáveis',
      'Exportação CSV',
      'Acesso protegido e trilha de auditoria',
    ],
    limitation:
      'As demonstrações usam XMLs sintéticos. A triagem é preventiva e as regras precisam ser adequadas a cada operação.',
  },
  {
    id: 'caixinha',
    name: 'Caixinha Financeira',
    label: 'Finanças pessoais',
    category: 'Aplicações web',
    status: 'PWA',
    description:
      'Contas, reservas e metas em caixinhas. Organização financeira com funcionamento offline e dados locais criptografados.',
    technologies: ['JavaScript', 'Web Crypto', 'PWA', 'ES Modules'],
    image: caixinha,
    imageAlt: 'Tela de acesso da Caixinha Financeira',
    repository: 'https://github.com/Thiago-A-Gomes/caixinha-financeira',
    context:
      'Separar contas, reservas e metas ajuda a visualizar o destino do dinheiro no dia a dia.',
    solution:
      'Uma aplicação de organização financeira em caixinhas, com armazenamento no navegador e suporte ao uso offline.',
    highlights: [
      'Organização por contas, reservas e metas',
      'Funcionamento offline',
      'Dados criptografados localmente com Web Crypto',
    ],
    limitation:
      'Os dados ficam no navegador. A aplicação não oferece integração bancária ou aconselhamento financeiro.',
  },
  {
    id: 'ritmo-lab',
    name: 'Ritmo Lab',
    label: 'Educação musical',
    category: 'Aplicações web',
    status: 'Aplicativo web',
    description:
      'Um laboratório para compor ritmos, ouvir o resultado e treinar a percepção musical com um metrônomo.',
    technologies: ['JavaScript', 'Web Audio API', 'SVG', 'HTML / CSS'],
    demo: 'https://ritmo-lab-theta.vercel.app/',
    repository: 'https://github.com/Thiago-A-Gomes?tab=repositories',
    context:
      'Um espaço para praticar ditado musical e desenvolver a percepção rítmica com apoio visual e sonoro.',
    solution:
      'Editor com notas, pausas e ligaduras, reprodução da composição e metrônomo contínuo com repetição e volumes independentes.',
    highlights: [
      'Editor visual de ritmos',
      'Reprodução com Web Audio API',
      'Metrônomo com controles independentes',
    ],
    limitation:
      'Exercícios originais e ritmos salvos no próprio navegador. O link de código leva à lista pública de repositórios.',
  },
];
