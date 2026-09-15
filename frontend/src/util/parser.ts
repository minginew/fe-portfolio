// HTML 문자열에서 텍스트만 추출한다 (목록 미리보기용)
export function getText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
}
