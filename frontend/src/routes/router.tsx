import { createBrowserRouter, Navigate } from 'react-router-dom';
import PortfolioPage from '../pages/user/PortfolioPage';
import ProjectPage from '../pages/user/ProjectPage';
import PostPage from '../pages/user/PostPage';
import ProjectList from '../components/project/ProjectList';
import PostList from '../components/post/PostList';
import PostDetail from '../components/post/PostDetail';
import ProjectDetail from '../components/project/ProjectDetail';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/admin/LoginPage';
import AdminPage from '../pages/admin/AdminPage';
import AdminProjectList from '../components/admin/AdminProjectList';
import AdminProjectDetail from '../components/admin/AdminProjectDetail';
import AdminPostList from '../components/admin/AdminPostList';
import AdminPostDetail from '../components/admin/AdminPostDetail';

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
        path: '/project',
        element: <ProjectPage />,
        children: [
          {
            path: '',
            element: <ProjectList />,
          },
          {
            path: ':id',
            element: <ProjectDetail />,
          },
        ],
      },
      {
        path: '/post',
        element: <PostPage />,
        children: [
          {
            path: '',
            element: <PostList />,
          },
          {
            path: ':id',
            element: <PostDetail />,
          },
        ],
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
        path: 'post',
        element: <AdminPostList />,
      },
      {
        path: 'post/:id',
        element: <AdminPostDetail />,
      },
    ],
  },
]);

export default router;
