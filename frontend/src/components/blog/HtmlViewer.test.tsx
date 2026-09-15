import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HtmlViewer, { sanitize } from './HtmlViewer';

describe('sanitize', () => {
  it('script·이벤트 핸들러를 제거한다', () => {
    const out = sanitize('<p>a</p><script>alert(1)</script><img src="x" onerror="alert(1)">');
    expect(out).not.toContain('<script');
    expect(out).not.toContain('onerror');
    expect(out).toContain('<img src="x">');
  });
  it('에디터가 저장하는 속성은 유지한다', () => {
    const out = sanitize(
      '<a href="https://x.dev" target="_blank" rel="noopener noreferrer">x</a><img src="y" style="width: 300px; height: auto; cursor: pointer;">'
    );
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
    expect(out).toContain('width: 300px');
  });
  it('javascript: 링크를 제거한다', () => {
    const out = sanitize('<a href="javascript:alert(1)">x</a>');
    expect(out).not.toContain('javascript:');
  });
});

describe('HtmlViewer', () => {
  it('본문을 렌더하고 코드 블록을 하이라이트한다', () => {
    const { container } = render(
      <HtmlViewer html='<p>트리 자료구조 정리</p><pre><code class="language-js">const root = null;</code></pre>' />
    );
    expect(screen.getByText('트리 자료구조 정리')).toBeInTheDocument();
    const code = container.querySelector('pre code')!;
    expect(code).toHaveClass('hljs');
    expect(code.querySelector('.hljs-keyword')).toHaveTextContent('const');
    expect(screen.getByTestId('html-viewer')).toHaveClass('tiptap');
  });
});
