import { createBrowserRouter, Navigate } from 'react-router-dom';
import PortfolioPage from '../pages/user/PortfolioPage';
import ProjectList from '../pages/user/ProjectList';
import PostList from '../pages/user/PostList';
import PostDetail from '../pages/user/PostDetail';
import ProjectDetail from '../pages/user/ProjectDetail';
import MainPage from '../pages/user/MainPage';
import LoginPage from '../pages/admin/LoginPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminProjectList from '../pages/admin/AdminProjectList';
import AdminProjectDetail from '../pages/admin/AdminProjectDetail';
import AdminPostList from '../pages/admin/AdminPostList';
import AdminPostDetail from '../pages/admin/AdminPostDetail';
import AdminProjectEdit from '../pages/admin/AdminProjectEdit';
import AdminPostEdit from '@/pages/admin/AdminPostEdit';

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
        element: <ProjectDetail />,
      },

      {
        path: '/post',
        element: <PostList />,
      },
      {
        path: '/post/:id',
        element: <PostDetail />,
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
        element: <AdminProjectDetail />,
      },
      {
        path: 'project/edit/:id?',
        element: <AdminProjectEdit />,
      },
      {
        path: 'post',
        element: <AdminPostList />,
      },
      {
        path: 'post/:id',
        element: <AdminPostDetail />,
      },
      {
        path: 'post/edit/:id?',
        element: <AdminPostEdit />,
      },
    ],
  },
]);

export default router;
