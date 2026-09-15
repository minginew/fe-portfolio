import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@redux/api/authApi';
import { postsApi } from '@redux/api/postApi';
import { projectsApi } from '@redux/api/projectApi';
import { storageApi } from '@redux/api/storageApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [postsApi.reducerPath]: postsApi.reducer,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [storageApi.reducerPath]: storageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        postsApi.middleware,
        projectsApi.middleware,
        storageApi.middleware
      ),
  });

export const store = makeStore();

export default store;
