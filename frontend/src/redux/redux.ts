import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from './store';

// 타입스크립트 적용 hook start
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export const useAddDispatch = () => useDispatch<AddDispatch>();
export const useAddSelector: TypedUseSelectorHook<RootState> = useSelector;

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
}

export interface Projects {
  projects: Project[];
  status: string;
  error: string;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  tags: string[];
  createAt: string;
}

export interface Posts {
  posts: Post[];
  status: string;
  error: string;
}
