import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../util/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ user: User | null; session: Session | null }, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            return { error: { message: '로그인 실패' } };
          }
          return { data };
        } catch (err) {
          return { error: { message: '서버 오류가 발생했습니다.' } };
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) return { error: { message: error.message } }; // ✅ error 객체 대신 error.message만 반환

        return { data: undefined };
      },
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation } = authApi;
