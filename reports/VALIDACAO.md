# Validação do portfólio

- Suíte completa: **20 testes aprovados**, 0 falhas, 0 instáveis e 0 ignorados.
- Duração: 55.9 segundos.
- Início: 2026-10-22T04:16:03.519Z.
- Ambiente: Windows, Node 22.23.4, Chromium / Chrome 155.
- Viewports dos projetos: desktop 1440×1000 e mobile 390×844.
- Responsividade adicional: 320, 390, 768, 1024 e 1440 pixels.
- Build otimizado com HTML pré-renderizado e animações ativas; cenários específicos verificam movimento reduzido.

A suíte cobre navegação, conteúdo, imagens, filtros, catálogo público, ordenação, diálogos, teclado, restauração de foco, tema e persistência, cópia do e-mail e links disponíveis sem JavaScript. O resultado completo está em [e2e-results.json](e2e-results.json).

TypeScript e build concluíram sem erros. A instalação final registrou zero vulnerabilidades no npm audit. Esse resultado depende da data da consulta e não certifica segurança contínua.

Os 74 testes mencionados no card do Kurio são evidências daquele projeto, não deste portfólio.

Novas execuções geram HTML em playwright-report e traces de falhas em test-results; ambos são ignorados pelo Git. Auditorias experimentais locais não são apresentadas como medianas ou como resultados de produção.
