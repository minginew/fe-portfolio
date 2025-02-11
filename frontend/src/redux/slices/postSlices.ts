import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../thunks/postThunks'; // fetchPosts만 임포트
import { Posts } from '../redux'; // Posts 타입 임포트

const initialState: Posts = {
  posts: [],
  status: '',
  error: '',
};

const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || '';
      });
  },
});

export default postSlice;
