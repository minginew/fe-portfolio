import { useEffect } from 'react';

export function useFadeAnimation(targetRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    // IntersectionObserver 콜백 함수
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetElement = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // 요소가 50% 이상 보일 때 페이드 인
          targetElement.classList.add('opacity-100', 'translate-y-0');
          targetElement.classList.remove('opacity-0', 'translate-y-20');
        } else if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
          // 요소가 50% 미만일 때 원래 상태로 돌아감
          targetElement.classList.add('opacity-0', 'translate-y-20');
          targetElement.classList.remove('opacity-100', 'translate-y-0');
        }
      });
    };

    // IntersectionObserver 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // 50% 이상 보일 때 트리거
    });

    const element = targetRef.current;
    // targetRef의 자식 요소들 감시 시작
    if (element) {
      const childNodes = element.children;
      Array.from(childNodes).forEach((child) => {
        child.classList.add('transition-all', 'duration-700');
        observer.observe(child);
      });
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (element) {
        element?.classList.remove('transition-all', 'duration-1000');
        const childNodes = element.children;
        Array.from(childNodes).forEach((child) => {
          child.classList.add('transition-all', 'duration-700');
          observer.unobserve(child);
        });
      }
    };
  }, []);
}

// Ref에서 실행되는 애니메이션이 끝났을 때 실행할 함수 등록
export function useAnimationEnd(targetRef: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const element = targetRef.current;
    if (element) {
      element.addEventListener('animationend', callback);
    }
    return () => {
      if (element) {
        element.removeEventListener('animationend', callback);
      }
    };
  }, []);
}
