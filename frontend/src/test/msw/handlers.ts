import { http, HttpResponse } from 'msw';
import type { Post } from '@redux/redux';

export const posts: Post[] = [
  {
    postId: 97,
    title: 'Tree',
    content: '<p>트리 자료구조 정리</p><pre><code class="language-js">const root = null;</code></pre>',
    tags: ['#자료구조', '#알고리즘'],
    createAt: '2025-09-01T03:00:00+00:00',
  },
  {
    postId: 96,
    title: 'Disjoint Set, 크루스칼',
    content: '<p>유니온 파인드</p>',
    tags: ['#알고리즘'],
    createAt: '2025-08-20T03:00:00+00:00',
  },
];

// Supabase REST: /rest/v1/posts — 목록은 배열, post_id=eq.N 은 단건 객체
export const handlers = [
  http.get('*/rest/v1/posts', ({ request }) => {
    const url = new URL(request.url);
    const eq = url.searchParams.get('post_id');
    if (eq) {
      const id = Number(eq.replace('eq.', ''));
      const found = posts.find((p) => p.postId === id);
      return found
        ? HttpResponse.json(found)
        : HttpResponse.json({ code: 'PGRST116', message: 'The result contains 0 rows' }, { status: 406 });
    }
    return HttpResponse.json(posts);
  }),

  // Supabase Auth: 비밀번호 로그인
  http.post('*/auth/v1/token', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === 'admin@test.dev' && body.password === 'correct') {
      return HttpResponse.json({
        access_token: 'test-access-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: 'test-refresh-token',
        user: {
          id: '00000000-0000-0000-0000-000000000001',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'admin@test.dev',
          last_sign_in_at: new Date().toISOString(),
          app_metadata: { provider: 'email' },
          user_metadata: {},
          created_at: '2025-01-01T00:00:00Z',
        },
      });
    }
    return HttpResponse.json(
      { code: 400, error_code: 'invalid_credentials', msg: 'Invalid login credentials' },
      { status: 400 }
    );
  }),
];
