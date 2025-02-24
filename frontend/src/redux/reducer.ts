import { combineReducers } from '@reduxjs/toolkit';
import postSlice from './slices/postSlices';
import projectSlice from './slices/projectSlice';
import { authApi } from './api/authApi';
import { postsApi } from './api/postApi';
import { projectsApi } from './api/projectApi';

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  projects: projectSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
});

export default rootReducer;
