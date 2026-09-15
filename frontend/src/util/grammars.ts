// 실제 글에서 쓰는 코드블록 언어만 등록 — highlight.js 전체(190+) 대신
// 실사용 언어 조사(Step 1, [실측]): posts에서 language-js(18), language-jsx(15), language-java(2), language-json(1)
// js/jsx는 highlight.js javascript 모듈의 alias(aliases: ['js', 'jsx', 'mjs', 'cjs'])로 별도 등록 불필요
// xml은 항상 포함 [근거] highlight.js: html은 xml 언어의 alias, HTML/JSX 하이라이트에 필요
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';

export const grammars = { javascript, java, json, xml };
