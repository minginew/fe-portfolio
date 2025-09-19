import { useEffect } from 'react';

export function useFadeAnimation(targetRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    // IntersectionObserver 콜백 함수
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetElement = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // 요소가 40% 이상 보일 때 페이드 인
          targetElement.classList.add('opacity-100', 'translate-y-0');
          targetElement.classList.remove('opacity-0', 'translate-y-20');
        } else if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
          // 요소가 40% 미만일 때 원래 상태로 돌아감
          targetElement.classList.add('opacity-0', 'translate-y-20');
          targetElement.classList.remove('opacity-100', 'translate-y-0');
        }
      });
    };

    // IntersectionObserver 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.4, // 40% 이상 보일 때 트리거
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
        const childNodes = element.children;
        Array.from(childNodes).forEach((child) => {
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

export function useScrollFadeAnimation(
  parentRef: React.RefObject<HTMLDivElement>,
  scrollRef: React.RefObject<HTMLDivElement>
) {
  //부모의 감지 + 부모의 top이 0보다 크면 숨기기
  useEffect(() => {
    // IntersectionObserver 콜백 함수
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const scrollElement = scrollRef.current;
      entries.forEach((entry) => {
        console.log(entry.boundingClientRect.top);
        if (entry.boundingClientRect.top > 0) {
          //부모의 감지 + 부모의 top이 0보다 크면 숨기기
          scrollElement?.classList.add('opacity-0', 'pointer-events-none');
          scrollElement?.classList.remove('opacity-100');
        } else if (entry.boundingClientRect.top <= 0) {
          //부모의 감지 + 부모의 top 값이 0보다 작아질때 숨김을 풀어주기
          scrollElement?.classList.add('opacity-100');
          scrollElement?.classList.remove('opacity-0', 'pointer-events-none');
        }
      });
    };

    // IntersectionObserver 인스턴스 생성
    // Observer 감시 시점
    // 1. 처음 설정 영역에 threshold 만큼 들어왔을 때
    // 2. 설정 영역에 threshold 만큼 남기고 나갈때
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0,
      rootMargin: '0px 0px -100% 0px',
    });

    const element = parentRef.current;

    if (element) {
      observer.observe(element);
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
}
