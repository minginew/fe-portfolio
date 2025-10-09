import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

import PortfolioPage from '@pages/user/PortfolioPage';
import ProjectList from '@pages/user/ProjectList';
import PostList from '@pages/user/PostList';
import MainPage from '@pages/user/MainPage';
import LoginPage from '@pages/admin/LoginPage';
import AdminPage from '@pages/admin/AdminPage';
import AdminProjectList from '@pages/admin/AdminProjectList';
import AdminPostList from '@pages/admin/AdminPostList';
import DetailSkeleton from '@/components/common/DetailSkeleton';

const ProjectDetail = React.lazy(() => import('@pages/user/ProjectDetail'));
const PostDetail = React.lazy(() => import('@pages/user/PostDetail'));
const AdminProjectDetail = React.lazy(() => import('@pages/admin/AdminProjectDetail'));
const AdminPostDetail = React.lazy(() => import('@pages/admin/AdminPostDetail'));
const AdminProjectEdit = React.lazy(() => import('@pages/admin/AdminProjectEdit'));
const AdminPostEdit = React.lazy(() => import('@pages/admin/AdminPostEdit'));

export const ROUTES = {
  PROJECT_EDIT: '/admin/project/edit',
  POST_EDIT: '/admin/post/edit',
  PORTFOLIO: '/portfolio',
  PROJECT: '/project',
  POST: '/post',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <PortfolioPage />,
      },
      {
        path: '/portfolio',
        element: <PortfolioPage />,
      },
      {
        path: '/project',
        element: <ProjectList />,
      },
      {
        path: '/project/:id',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <ProjectDetail />
          </Suspense>
        ),
      },

      {
        path: '/post',
        element: <PostList />,
      },
      {
        path: '/post/:id',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <PostDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        path: '',
        element: <Navigate to='project' replace />,
      },
      {
        path: 'project',
        element: <AdminProjectList />,
      },
      {
        path: 'project/:id',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <AdminProjectDetail />
          </Suspense>
        ),
      },
      {
        path: 'project/edit/:id?',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <AdminProjectEdit />
          </Suspense>
        ),
      },
      {
        path: 'post',
        element: <AdminPostList />,
      },
      {
        path: 'post/:id',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <AdminPostDetail />
          </Suspense>
        ),
      },
      {
        path: 'post/edit/:id?',
        element: (
          <Suspense fallback={<DetailSkeleton />}>
            <AdminPostEdit />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
