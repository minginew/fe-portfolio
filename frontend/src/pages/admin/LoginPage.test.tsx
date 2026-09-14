import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { renderWithProviders } from '@/test/render';
import LoginPage from '@pages/admin/LoginPage';

const renderLogin = () =>
  renderWithProviders(<LoginPage />, {
    route: '/signin',
    extraRoutes: <Route path='/admin' element={<div>admin home</div>} />,
  });

describe('LoginPage', () => {
  it('잘못된 자격 증명이면 실패 메시지를 보여준다', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByPlaceholderText('Email'), 'admin@test.dev');
    await user.type(screen.getByPlaceholderText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('로그인 실패');
  });

  it('Enter로 제출되고 성공 시 /admin으로 이동한다', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByPlaceholderText('Email'), 'admin@test.dev');
    await user.type(screen.getByPlaceholderText('Password'), 'correct{Enter}');
    expect(await screen.findByText('admin home')).toBeInTheDocument();
  });
});
