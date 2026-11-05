import { expect, test } from '@playwright/test';

test('apresentação, formação atual e projetos carregam sem erros de hidratação', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(page).toHaveTitle('Thiago Gomes — Portfolio');
  await expect(page.locator('.brand')).toHaveAccessibleName(/thiago gomes/i);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('come to life');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.locator('.journey-details > summary').click();
  await expect(page.locator('.current-education')).toContainText('Software Engineering');
  await expect(page.locator('.current-education')).toContainText('UNINTER');
  await expect(page.locator('.current-education')).toContainText('IN PROGRESS');
  // Lazy-loaded images must enter the viewport before checking their state.
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            (element as HTMLImageElement).complete &&
            (element as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
});

test('filtros de projetos mostram grupos distintos e restauram todos', async ({ page }) => {
  await page.goto('/#projetos');
  await page.getByRole('button', { name: 'Automation', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.locator('#projeto-central-compras')).toBeVisible();
  await expect(page.locator('#projeto-fiscalguard')).toBeVisible();
  await expect(page.locator('#projeto-kurio')).toHaveCount(0);
  await page.getByRole('button', { name: 'Web apps', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await expect(page.locator('#projeto-kurio')).toBeVisible();
  await page.getByRole('button', { name: 'All', exact: false }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
});

test('detalhes de cada projeto abrem conteúdo próprio, com limites e links reais', async ({
  page,
}) => {
  await page.goto('/#projetos');
  for (const name of [
    'Central de Estudos',
    'Central de Compras',
    'Kurio',
    'FiscalGuard',
    'Caixinha Financeira',
    'Ritmo Lab',
  ]) {
    const trigger = page.getByRole('button', {
      name: `Project details: ${name}`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(name);
    await expect(dialog.locator('.scope-note')).not.toBeEmpty();
    await expect(dialog.locator('a').first()).toHaveAttribute('href', /^https:\/\//);
    if (name === 'Kurio') {
      await expect(dialog).toContainText('74 end-to-end tests');
      await expect(dialog.getByRole('link', { name: 'Open demo' })).toHaveAttribute(
        'href',
        'https://frontend-challenge-kurio-thiago-gomes-projects1.vercel.app/',
      );
    }
    await dialog.getByRole('button', { name: 'Close details' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test('teclado mantém o foco no diálogo, fecha por Escape e devolve ao acionador', async ({
  page,
}) => {
  await page.goto('/#projeto-kurio');
  const trigger = page.getByRole('button', { name: 'Project details: Kurio', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const close = page.getByRole('button', { name: 'Close details' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('dialog').locator('a').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('catálogo inclui todos os 13 repositórios públicos e permite busca, linguagem e ordenação', async ({
  page,
}) => {
  await page.goto('/#repositorios');
  await page.locator('.catalog-details > summary').click();
  await expect(page.locator('.repo-card')).toHaveCount(13);
  const search = page.getByRole('searchbox', { name: 'Search repositories' });
  await search.fill('kurio');
  await expect(page.locator('.repo-card')).toHaveCount(1);
  await expect(page.locator('.repo-card h3')).toHaveText('frontend-challenge-kurio');
  await search.fill('');
  await page.getByLabel('Language', { exact: true }).selectOption('Python');
  await expect(page.locator('.repo-card')).toHaveCount(1);
  await expect(page.locator('.repo-card h3')).toHaveText('Projetos-Python');
  await search.fill('nãoexiste123');
  await expect(page.getByRole('heading', { name: 'No repositories found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.repo-card')).toHaveCount(13);
  await page.getByLabel('Sort', { exact: true }).selectOption('name');
  const names = await page.locator('.repo-card h3').allTextContents();
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
});

test('animação pode ser pausada e respeita movimento reduzido', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause 3D animation' }).click();
  await expect(page.getByRole('button', { name: 'Resume 3D animation' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(
    await page
      .locator('.sculpture')
      .evaluate((element) => getComputedStyle(element).animationPlayState),
  ).toBe('paused');
  await page.getByRole('button', { name: 'Resume 3D animation' }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page.locator('.sculpture').evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  await expect(page.locator('.motion-toggle')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('tema escuro é o padrão e a escolha de tema claro persiste após recarregar', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Project details: Kurio', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('contato copia o e-mail e preserva destinos de LinkedIn e WhatsApp', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contato');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.locator('.copy-feedback')).toHaveText('Email copied!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('thigogo3@gmail.com');
  await expect(
    page.locator('.contact-links').getByRole('link', { name: 'LinkedIn', exact: true }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/thiago-gomes-9a85a4268/');
  await expect(
    page.locator('.contact-links').getByRole('link', { name: 'WhatsApp', exact: true }),
  ).toHaveAttribute('href', 'https://wa.me/5511958179439');
});

test('layouts de 320 a 1440 pixels não têm rolagem horizontal ou cards fora da tela', async ({
  page,
}) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const bounds = await page.locator('.project-card,.repo-card').evaluateAll((elements) =>
      elements.map((e) => {
        const box = e.getBoundingClientRect();
        return { left: box.left, right: box.right };
      }),
    );
    expect(bounds.every((b) => b.left >= 0 && b.right <= width)).toBe(true);
  }
});

test('conteúdo, formação e links permanecem disponíveis sem JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('come to life');
  await expect(page.locator('.project-card')).toHaveCount(6);
  await expect(page.locator('.repo-card')).toHaveCount(13);
  await expect(page.locator('.current-education')).toContainText('UNINTER');
  await expect(
    page.getByRole('link', { name: 'Open Kurio demo', exact: true }),
  ).toHaveAttribute('href', 'https://frontend-challenge-kurio-thiago-gomes-projects1.vercel.app/');
  await context.close();
});
