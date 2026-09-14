import { expect, test } from '@playwright/test';
import { E2E_PREFIX, deleteE2EPosts, signInAdmin } from './support/supabase';

const hasCreds = Boolean(process.env.E2E_ADMIN_EMAIL && process.env.E2E_ADMIN_PASSWORD);

test.describe('관리자', () => {
  test.skip(!hasCreds, 'E2E_ADMIN_EMAIL/PASSWORD 없음 — 관리자 E2E 건너뜀');
  test.skip(({ isMobile }) => Boolean(isMobile), '관리자 E2E는 desktop만');

  let token = '';
  test.beforeAll(async () => {
    token = await signInAdmin();
    await deleteE2EPosts(token); // 이전 실행이 남긴 글 정리
  });
  test.afterAll(async () => {
    if (token) await deleteE2EPosts(token);
  });

  test('로그인 → 글 작성 → 목록에 반영', async ({ page }) => {
    const title = `${E2E_PREFIX}${Date.now()}`;

    await page.goto('/signin');
    await page.getByPlaceholder('Email').fill(process.env.E2E_ADMIN_EMAIL as string);
    await page.getByPlaceholder('Password').fill(process.env.E2E_ADMIN_PASSWORD as string);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/admin\/project$/);

    await page.goto('/admin/post');
    await page.getByRole('button', { name: '작성하기' }).click();
    await expect(page).toHaveURL(/\/admin\/post\/edit$/);

    await page.getByPlaceholder('포스트명을 입력하세요.').fill(title);
    await page.getByPlaceholder(/포스팅 태그/).fill('e2e');
    await page.getByPlaceholder(/포스팅 태그/).press('Enter');
    await page.locator('.tiptap').click();
    await page.keyboard.type('E2E 테스트 본문');
    await page.getByRole('button', { name: '작성하기' }).click();

    await expect(page).toHaveURL(/\/admin\/post$/);
    await expect(page.getByText(title)).toBeVisible();
  });

  test('로그인 실패 메시지', async ({ page }) => {
    await page.goto('/signin');
    await page.getByPlaceholder('Email').fill(process.env.E2E_ADMIN_EMAIL as string);
    await page.getByPlaceholder('Password').fill('definitely-wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('alert')).toHaveText('로그인 실패');
  });
});
