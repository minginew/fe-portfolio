import { store } from '@redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Project {
  projectId: number;
  title: string;
  content: string;
  roles: string[];
  techstack: string[];
  summary: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  gitHub: string;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  tags: string[];
  createAt: string;
}
