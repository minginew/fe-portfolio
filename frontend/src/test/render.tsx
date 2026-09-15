import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { makeStore } from '@redux/store';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  /** 초기 URL (기본 '/') */
  route?: string;
  /** 추가 라우트 — 이동 결과를 검증할 때 사용 */
  extraRoutes?: ReactNode;
  /** ui를 붙일 path (기본 route와 동일) */
  path?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', path = route, extraRoutes, ...options }: Options = {}
) {
  const store = makeStore();
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
          {extraRoutes}
        </Routes>
      </MemoryRouter>
    </Provider>,
    options
  );
  return { store, ...result };
}
