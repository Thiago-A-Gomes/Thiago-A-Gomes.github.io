# Thiago Gomes · Portfólio

**[Abrir portfólio](https://thiago-a-gomes.github.io/)**

Portfólio pessoal com projetos selecionados, catálogo dos repositórios públicos, trajetória, formação e contato. Reconstruído com **React 19, TypeScript, Vite e Tailwind CSS**.

## Interface

- Tema escuro como padrão, com alternância para claro e preferência salva no navegador.
- Composição 3D feita com CSS, com perspectiva ao mover o ponteiro e controle de pausa.
- Preferência por movimento reduzido respeitada em animações e rolagem.
- Cards com alturas alinhadas, imagens proporcionais e filtros por categoria.
- Detalhes dos projetos em diálogo, navegação por teclado e restauração do foco.
- Catálogo dos repositórios públicos com busca, filtro por linguagem e ordenação.
- Contato por e-mail, LinkedIn, GitHub e WhatsApp; botão para copiar o e-mail.
- HTML pré-renderizado: conteúdo, formação e links dos projetos disponíveis antes do JavaScript.

## Executar

Requer Node.js **22.19+ da linha 22** e npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Testes

```sh
npx playwright install chromium
npm run test:e2e -- --workers=1
npm run test:report
```

Para Chrome já instalado no Windows, defina `$env:PLAYWRIGHT_CHANNEL = 'chrome'` antes da execução.

A suíte verifica filtros, busca e ordenação, conteúdo dos projetos, diálogos, foco, cópia do e-mail, movimento reduzido, ausência de erros de hidratação, imagens e responsividade entre 320 e 1440 pixels. Cada teste usa um contexto isolado. Relatórios HTML e traces de falhas são gerados localmente pelo Playwright; resultados estão em [reports](reports).

Os **74 testes mencionados no card do Kurio pertencem ao Kurio**. A suíte deste portfólio é separada.

## Organização

```text
app/
  index.html              Template de entrada
  src/
    App.tsx               Composição da página
    components/           Cena 3D, cards, diálogo e catálogo
    data/                 Projetos e snapshot público do GitHub
    styles.css            Tokens, componentes e responsividade
scripts/
  prerender.mjs           HTML estático a partir da aplicação React
  export-pages.mjs        Exportação para a publicação existente
  sync-repositories.mjs   Atualização do catálogo público
tests/                    Testes Playwright
img/                      Imagens originais usadas pelo build
assets/                   Arquivos gerados da publicação
index.html                HTML gerado para o GitHub Pages
```

Edite o template em `app/index.html` e os componentes em `app/src`. O `index.html` da raiz é gerado; não deve ser editado manualmente.

## Projetos e dados

Os cinco projetos em destaque são descritos em `app/src/data/projects.ts`. Demonstrações, estudos e aplicações em operação têm escopo identificado. O catálogo é um snapshot dos repositórios públicos, não depende de token nem de requisições ao GitHub durante a visita.

Para atualizar:

```sh
node scripts/sync-repositories.mjs
npm run build
```

O script consulta apenas a API pública e preserva o catálogo anterior se houver erro. Revise os dados antes de publicar. O Ritmo Lab aparece como demonstração já pública; o catálogo de repositórios inclui somente repositórios públicos.

Formação atual: **Engenharia de Software na UNINTER, em andamento**. ADS na CEUNSP permanece como graduação concluída.

## Publicação

O GitHub Pages deste repositório publica a raiz de `main`. Para manter esse endereço e a configuração existente, o HTML pré-renderizado e seus assets ficam versionados junto do código-fonte:

```sh
npm run build
npm run test:e2e -- --workers=1
npm run export:pages
git add app scripts tests package.json package-lock.json vite.config.ts tsconfig.json postcss.config.js playwright.config.ts index.html assets
git commit -m "feat: update portfolio"
git push
```

`export:pages` copia somente o build para `index.html` e `assets/`, sem apagar diretórios. `.nojekyll` evita o processamento do site pelo Jekyll. A publicação usa o workflow padrão já configurado no GitHub Pages.

## Escopo

O portfólio tem dados estáticos e interações locais. Não coleta inscrições, não implementa pagamentos ou autenticação e não exige API própria. Os links dos projetos levam a aplicações com seus próprios limites, documentados nos detalhes e nos repositórios correspondentes.
