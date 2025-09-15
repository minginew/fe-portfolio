export const useGetText = (elementString: string) => {
  const domParser = new DOMParser();
  let textContent: string = '';
  const startElements = Array.from(domParser.parseFromString(elementString, 'text/html').body.childNodes);

  const textParser = (element: ChildNode[]) => {
    for (var node of element) {
      // 노드가 텍스트 노드인 경우 텍스트를 추출하여 결과에 추가합니다.
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
      // 노드가 요소 노드인 경우 재귀적으로 해당 요소의 텍스트 콘텐츠를 추출합니다.
      else if (node.nodeType === Node.ELEMENT_NODE) {
        textParser(Array.from(node.childNodes));
      }
    }
    return textContent;
  };
  return textParser(startElements);
};

export const useResetInlineStyles = (elementString: string) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(elementString, 'text/html');

  const imgParser = (nodes: NodeListOf<ChildNode>) => {
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;

        if (el.tagName === 'IMG' && el.hasAttribute('style')) {
          const width = el.style.width;

          if (width) {
            // 기존 width 제거
            el.className = '';
            el.style.removeProperty('width');
            el.style.removeProperty('max-width');
          }
        }

        if (el.childNodes.length > 0) {
          imgParser(el.childNodes);
        }
      }
    });
  };

  imgParser(doc.body.childNodes);

  const htmlString = Array.from(doc.body.childNodes)
    .map((node) => (node as HTMLElement).outerHTML)
    .join('');
  console.log(htmlString);
  return htmlString;
};
