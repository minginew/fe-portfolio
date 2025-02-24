import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../util/supabaseClient';
import { Post } from '../redux';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('postId:post_id, createAt:created_at, title, content, tags');
          if (error) {
            return { error };
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ postId }) => ({ type: 'Posts' as const, id: postId.toString() })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostById: builder.query<Post, number>({
      queryFn: async (postId) => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('postId:post_id, createAt:created_at, title, content, tags')
            .eq('post_id', postId)
            .single();
          if (error) {
            return { error };
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) => [{ type: 'Posts', id: result?.postId }],
    }),
    createPost: builder.mutation<number, Omit<Post, 'postId' | 'createAt'>>({
      queryFn: async (post) => {
        try {
          const { status, error } = await supabase.from('posts').insert(post).select().single();
          if (error) {
            return { error };
          }
          return { data: status };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation<number, Omit<Post, 'createAt'>>({
      queryFn: async (post) => {
        const { postId, ...updatePost } = post;
        const { status } = await supabase.from('posts').update(updatePost).eq('post_id', postId);
        return { data: status };
      },
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<number, number>({
      queryFn: async (postId) => {
        const { status } = await supabase.from('posts').delete().eq('post_id', postId);
        return { data: status };
      },
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
