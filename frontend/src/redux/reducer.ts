import { combineReducers } from '@reduxjs/toolkit';
import postSlice from './slices/postSlices';
import projectSlice from './slices/projectSlice';

const rootReducer = combineReducers({
  posts: postSlice,
  projects: projectSlice,
});

export default rootReducer;
