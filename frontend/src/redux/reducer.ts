import { combineReducers } from '@reduxjs/toolkit';
import postSlice from '@redux/slices/postSlices';
import projectSlice from '@redux/slices/projectSlice';
import { authApi } from '@redux/api/authApi';
import { postsApi } from '@redux/api/postApi';
import { projectsApi } from '@redux/api/projectApi';
import { storageApi } from '@redux/api/storageApi';

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  projects: projectSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
});

export default rootReducer;
