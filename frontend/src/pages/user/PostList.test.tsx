import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { Route } from 'react-router-dom';
import { renderWithProviders } from '@/test/render';
import { server } from '@/test/msw/server';
import PostList from '@pages/user/PostList';

describe('PostList', () => {
  it('글 목록을 제목·날짜·본문 미리보기·태그로 렌더한다', async () => {
    renderWithProviders(<PostList />, { route: '/post' });
    expect(await screen.findByText('Tree')).toBeInTheDocument();
    expect(screen.getByText('Disjoint Set, 크루스칼')).toBeInTheDocument();
    expect(screen.getByText('2025-09-01')).toBeInTheDocument();
    expect(screen.getByText('트리 자료구조 정리const root = null;')).toBeInTheDocument();
    expect(screen.getAllByText('#알고리즘')).toHaveLength(2);
  });

  it('글이 없으면 안내 문구를 보여준다', async () => {
    server.use(http.get('*/rest/v1/posts', () => HttpResponse.json([])));
    renderWithProviders(<PostList />, { route: '/post' });
    expect(await screen.findByText('작성된 게시글이 없습니다.')).toBeInTheDocument();
  });

  it('글을 클릭하면 상세 경로로 이동한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostList />, {
      route: '/post',
      extraRoutes: <Route path='/post/:id' element={<div>detail page</div>} />,
    });
    await user.click(await screen.findByText('Tree'));
    expect(await screen.findByText('detail page')).toBeInTheDocument();
  });
});
