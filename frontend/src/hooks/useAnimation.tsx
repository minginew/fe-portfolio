import { useEffect } from 'react';

export function useFadeAnimation(targetRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    targetRef.current?.classList.add('transition-all', 'duration-700');
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
      threshold: 0.3, // 50% 이상 보일 때 트리거
    });

    // targetRef로 전달된 요소 감시 시작
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (targetRef.current) {
        targetRef.current?.classList.remove('transition-all', 'duration-1000');
        observer.unobserve(targetRef.current);
      }
    };
  }, []);
}
