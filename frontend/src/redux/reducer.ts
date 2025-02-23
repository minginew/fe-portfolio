import { combineReducers } from '@reduxjs/toolkit';
import postSlice from './slices/postSlices';
import projectSlice from './slices/projectSlice';
import { authApi } from './api/authApi';

const rootReducer = combineReducers({
  posts: postSlice.reducer,
  projects: projectSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
