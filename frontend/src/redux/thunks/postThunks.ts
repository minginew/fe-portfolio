import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../redux';
import axios from 'axios';

// READ: 프로젝트 목록 가져오기
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (thunksApi) => {
  try {
    const response = await axios.get('');
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// CREATE: 프로젝트 생성
export const createPost = createAsyncThunk('posts/createPost', async (newPost: Post, thunksApi) => {
  try {
    const response = await axios.post('');
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// UPDATE: 프로젝트 수정
export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost: Post, thunksApi) => {
  try {
    const response = await axios.put(``, updatedPost);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// DELETE: 프로젝트 삭제
export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number, thunksApi) => {
  try {
    await axios.delete(``);
    return postId;
  } catch (error: any) {
    return error.message;
  }
});
