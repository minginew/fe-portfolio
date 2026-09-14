const url = () => process.env.VITE_SUPABASE_URL as string;
const key = () => process.env.VITE_SUPABASE_KEY as string;

export const E2E_PREFIX = '[e2e] ';

export async function signInAdmin(): Promise<string> {
  const res = await fetch(`${url()}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: key(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.E2E_ADMIN_EMAIL, password: process.env.E2E_ADMIN_PASSWORD }),
  });
  if (!res.ok) throw new Error(`admin sign-in failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

// 제목이 "[e2e] "로 시작하는 글을 모두 삭제하고 삭제 건수를 돌려준다
export async function deleteE2EPosts(token: string): Promise<number> {
  const pattern = encodeURIComponent(`${E2E_PREFIX}*`);
  const res = await fetch(`${url()}/rest/v1/posts?title=like.${pattern}`, {
    method: 'DELETE',
    headers: { apikey: key(), Authorization: `Bearer ${token}`, Prefer: 'return=representation' },
  });
  if (!res.ok) throw new Error(`cleanup failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as unknown[]).length;
}
