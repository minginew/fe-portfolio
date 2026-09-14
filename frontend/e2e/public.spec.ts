import { expect, test } from '@playwright/test';

test.describe('공개 페이지', () => {
  test('포트폴리오 → 메뉴 → 글 목록 → 첫 글 상세 → 뒤로', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page.getByText('Frontend Portfolio')).toBeVisible();

    await page.getByRole('img', { name: 'menu' }).click();
    await page.getByRole('link', { name: 'POST', exact: true }).click();
    await expect(page).toHaveURL(/\/post$/);
    // 숨은 메뉴(aside)에도 'POST' 링크가 있으므로 main 안에서만 찾는다
    await expect(page.getByTestId('page-title')).toHaveText('POST');

    const firstCard = page.getByTestId('post-card').first();
    const firstTitle = await firstCard.getByTestId('post-card-title').innerText();
    await firstCard.click();
    await expect(page).toHaveURL(/\/post\/\d+$/);
    await expect(page.getByTestId('detail-title')).toContainText(firstTitle.trim());

    await page.goBack();
    await expect(page).toHaveURL(/\/post$/);
  });

  test('프로젝트 목록 → 상세', async ({ page }) => {
    await page.goto('/project');
    const firstCard = page.getByTestId('project-card').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    await expect(page).toHaveURL(/\/project\/\d+$/);
    await expect(page.getByTestId('detail-title')).not.toBeEmpty();
  });

  test('없는 경로는 404 화면', async ({ page }) => {
    await page.goto('/no-such-page');
    await expect(page.getByText('페이지를 찾을 수 없습니다.')).toBeVisible();
  });
});
