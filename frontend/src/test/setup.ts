import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach } from 'vitest';
import { server } from './msw/server';

// vitest.config.ts가 globals:true를 켜지 않아 @testing-library/react의 자동
// afterEach(cleanup) 등록(typeof afterEach === 'function' 전역 체크)이 동작하지
// 않는다 — 렌더된 DOM이 테스트 간에 누적돼 getBy*가 중복 엘리먼트를 찾는다. 명시 등록.
// supabase-js가 로그인 성공 시 세션을 localStorage에 저장하므로 테스트 간 초기화
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// beforeAll(() => server.listen(...))이 아니라 여기서 즉시 호출한다: supabaseClient.ts가
// 모듈 스코프에서 createClient()를 실행하며 PostgrestClient/GoTrueClient가 그 시점의
// 전역 fetch 참조를 캡처한다(postgrest-js PostgrestClient.js:34 `this.fetch = fetch`).
// setupFiles는 테스트 파일의 import보다 먼저 실행되므로, listen()을 setup 모듈
// 최상단에서 동기 호출해야 supabaseClient import 시점에 이미 MSW가 patch한
// fetch가 캡처된다. beforeAll 안에 두면 테스트 파일이 이미 원본 fetch를 캡처한
// 뒤에 listen()이 실행돼 실제 프로덕션 Supabase(VITE_SUPABASE_URL)로 요청이
// 새는데, onUnhandledRequest:'error'도 잡지 못한다(캡처된 원본 fetch가 MSW의
// 패치를 아예 거치지 않기 때문).
server.listen({ onUnhandledRequest: 'error' });

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
