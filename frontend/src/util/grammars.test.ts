import { describe, expect, it } from 'vitest';
import { createLowlight } from 'lowlight';
import { grammars } from './grammars';

describe('grammars', () => {
  const lowlight = createLowlight(grammars);
  it('실사용 언어만 등록한다', () => {
    expect([...lowlight.listLanguages()].sort()).toEqual([...Object.keys(grammars)].sort());
    expect(lowlight.listLanguages().length).toBeLessThan(20);
  });
  it('등록 언어를 하이라이트한다', () => {
    const tree = lowlight.highlight('javascript', 'const a = 1;');
    expect(tree.children.length).toBeGreaterThan(0);
  });
  it('미등록 언어는 registered=false', () => {
    expect(lowlight.registered('fortran')).toBe(false);
  });
});
