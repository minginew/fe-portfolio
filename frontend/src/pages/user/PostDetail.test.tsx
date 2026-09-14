import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import PostDetail from '@pages/user/PostDetail';

const { setContent } = vi.hoisted(() => ({ setContent: vi.fn() }));
vi.mock('@tiptap/react', () => ({
  useEditor: () => ({ commands: { setContent } }),
  EditorContent: () => <div data-testid='editor-content' />,
}));

describe('PostDetail', () => {
  it('글 제목·날짜·태그를 렌더하고 본문을 에디터에 넣는다', async () => {
    renderWithProviders(<PostDetail />, { route: '/post/97', path: '/post/:id' });
    expect(await screen.findByText('Tree')).toBeInTheDocument();
    expect(screen.getByText('2025-09-01')).toBeInTheDocument();
    expect(screen.getByText('#자료구조')).toBeInTheDocument();
    expect(screen.getByText('#알고리즘')).toBeInTheDocument();
    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    expect(setContent).toHaveBeenCalledWith(expect.stringContaining('트리 자료구조 정리'));
  });
});
