import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../util/supabaseClient';
import { Post } from '../redux';

// READ: 프로젝트 목록 가져오기
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunksApi) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('postId:post_id, createAt:created_at, title, content, tags');
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
    console.log(posts);
    return posts;
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});

// CREATE: Post 생성
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: Omit<Post, 'postId' | 'createAt'>, thunksApi) => {
    try {
      const { data: newPost, error } = await supabase.from('posts').insert(post).select().single();
      if (error) {
        return thunksApi.rejectWithValue(error.message);
      }
      // 아직 쓸지 모름
      return newPost;
    } catch (error) {
      return thunksApi.rejectWithValue(error);
    }
  }
);

// UPDATE: Post 수정
export const updatePost = createAsyncThunk('posts/updatePost', async (post: Omit<Post, 'createAt'>, thunksApi) => {
  try {
    const { postId, ...updatePost } = post;
    const { error } = await supabase.from('posts').update(updatePost).eq('post_id', postId);
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});

// DELETE: 프로젝트 삭제
export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number, thunksApi) => {
  try {
    const { error } = await supabase.from('posts').delete().eq('post_id', postId);
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});
