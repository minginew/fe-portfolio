import { describe, expect, it } from 'vitest';
import { getText } from '@util/parser';

describe('getText', () => {
  it('문단 텍스트를 이어 붙인다', () => {
    expect(getText('<p>안녕</p><p>세상</p>')).toBe('안녕세상');
  });

  it('중첩 태그와 코드 블록의 텍스트를 포함한다', () => {
    expect(
      getText('<h1>제목</h1><pre><code class="language-js">const a = 1;</code></pre><p><strong>굵게</strong> 보통</p>')
    ).toBe('제목const a = 1;굵게 보통');
  });

  it('이미지만 있으면 빈 문자열', () => {
    expect(getText('<img src="https://example.com/a.png">')).toBe('');
  });

  it('빈 문자열이면 빈 문자열', () => {
    expect(getText('')).toBe('');
  });
});
