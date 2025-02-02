import { createBrowserRouter } from 'react-router-dom';
import PortfolioPage from '../pages/user/PortfolioPage';
import ProjectPage from '../pages/user/ProjectPage';
import PostPage from '../pages/user/PostPage';
import ProjectList from '../components/project/ProjectList';
import PostList from '../components/post/PostList';
import PostDetail from '../components/post/PostDetail';
import ProjectDetail from '../components/project/ProjectDetail';
import MainPage from '../pages/MainPage';

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
]);

export default router;
