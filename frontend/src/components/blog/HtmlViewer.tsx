import { useEffect, useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import { grammars } from '@util/grammars';

// 에디터(lowlight)와 같은 언어 집합을 highlight.js core에 등록 — 뷰어는 Tiptap 없이 저장 HTML을 그대로 그린다
for (const [name, fn] of Object.entries(grammars)) hljs.registerLanguage(name, fn);

// target은 DOMPurify 기본 허용 목록에 없어 추가. rel/style/class는 기본 허용
export const sanitize = (html: string) => DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });

const HtmlViewer = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const clean = useMemo(() => sanitize(html), [html]);

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('pre code').forEach((el) => hljs.highlightElement(el));
  }, [clean]);

  return <div ref={ref} className='tiptap' data-testid='html-viewer' dangerouslySetInnerHTML={{ __html: clean }} />;
};

export default HtmlViewer;
