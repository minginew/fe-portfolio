import { Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import PortfolioPage from '@pages/user/PortfolioPage';
import ProjectList from '@pages/user/ProjectList';
import PostList from '@pages/user/PostList';
import MainPage from '@pages/user/MainPage';
import LoginPage from '@pages/admin/LoginPage';
import AdminPage from '@pages/admin/AdminPage';
import AdminProjectList from '@pages/admin/AdminProjectList';
import AdminPostList from '@pages/admin/AdminPostList';
import ErrorPage from '@pages/errors/ErrorPage';
import DetailSkeleton from '@components/common/DetailSkeleton';

// Tiptap·lowlight를 쓰는 페이지만 분리 — 목록/포트폴리오 초기 JS에서 제외
const PostDetail = lazy(() => import('@pages/user/PostDetail'));
const ProjectDetail = lazy(() => import('@pages/user/ProjectDetail'));
const AdminProjectDetail = lazy(() => import('@pages/admin/AdminProjectDetail'));
const AdminPostDetail = lazy(() => import('@pages/admin/AdminPostDetail'));
const AdminProjectEdit = lazy(() => import('@pages/admin/AdminProjectEdit'));
const AdminPostEdit = lazy(() => import('@pages/admin/AdminPostEdit'));

const withSkeleton = (el: ReactNode) => (
  <Suspense
    fallback={
      <div className='relative flex min-h-screen w-full max-w-6xl flex-col px-8 py-5'>
        <DetailSkeleton />
      </div>
    }
  >
    {el}
  </Suspense>
);

export const ROUTES = {
  PROJECT_EDIT: '/admin/project/edit',
  POST_EDIT: '/admin/post/edit',
  PORTFOLIO: '/portfolio',
  PROJECT: '/project',
  POST: '/post',
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <PortfolioPage /> },
      { path: '/portfolio', element: <PortfolioPage /> },
      { path: '/project', element: <ProjectList /> },
      { path: '/project/:id', element: withSkeleton(<ProjectDetail />) },
      { path: '/post', element: <PostList /> },
      { path: '/post/:id', element: withSkeleton(<PostDetail />) },
    ],
  },
  { path: '/signin', element: <LoginPage />, errorElement: <ErrorPage /> },
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Navigate to='project' replace /> },
      { path: 'project', element: <AdminProjectList /> },
      { path: 'project/:id', element: withSkeleton(<AdminProjectDetail />) },
      { path: 'project/edit/:id?', element: withSkeleton(<AdminProjectEdit />) },
      { path: 'post', element: <AdminPostList /> },
      { path: 'post/:id', element: withSkeleton(<AdminPostDetail />) },
      { path: 'post/edit/:id?', element: withSkeleton(<AdminPostEdit />) },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
