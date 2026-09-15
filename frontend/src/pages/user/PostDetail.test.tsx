import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import PostDetail from '@pages/user/PostDetail';

describe('PostDetail', () => {
  it('글 제목·날짜·태그를 렌더하고 본문을 에디터에 넣는다', async () => {
    const { container } = renderWithProviders(<PostDetail />, { route: '/post/97', path: '/post/:id' });
    expect(await screen.findByText('Tree')).toBeInTheDocument();
    expect(screen.getByText('2025-09-01')).toBeInTheDocument();
    expect(screen.getByText('#자료구조')).toBeInTheDocument();
    expect(screen.getByText('#알고리즘')).toBeInTheDocument();
    expect(screen.getByText('트리 자료구조 정리')).toBeInTheDocument();
    expect(container.querySelector('pre code.hljs .hljs-keyword')).toHaveTextContent('const');
  });

  it('데이터 로드 중에는 스켈레톤을 보이고 로드 후 글을 렌더한다', async () => {
    renderWithProviders(<PostDetail />, { route: '/post/97', path: '/post/:id' });
    expect(screen.getByTestId('detail-skeleton')).toBeInTheDocument();
    expect(await screen.findByText('Tree')).toBeInTheDocument();
    expect(screen.queryByTestId('detail-skeleton')).not.toBeInTheDocument();
  });
});
