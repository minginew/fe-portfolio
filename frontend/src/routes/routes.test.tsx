import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { makeStore } from '@redux/store';
import { routes } from './router';

describe('routes', () => {
  it('/post/:id는 스켈레톤을 먼저 보이고 lazy 청크 로드 후 글을 렌더한다', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/post/97'] });
    render(
      <Provider store={makeStore()}>
        <RouterProvider router={router} />
      </Provider>
    );
    expect(await screen.findByTestId('detail-skeleton')).toBeInTheDocument();
    // findByTestId는 요소가 DOM에 나타나는 즉시(내용이 채워지기 전) resolve되므로
    // RTK Query 응답 반영까지 waitFor로 재시도한다.
    await waitFor(() => {
      expect(screen.getByTestId('detail-title')).toHaveTextContent('Tree');
    });
    expect(screen.queryByTestId('detail-skeleton')).not.toBeInTheDocument();
  });
});
