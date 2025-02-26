import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../util/supabaseClient';
import { Project } from '../redux';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    // READ: Project 목록 가져오기
    getProjects: builder.query<Project[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase.from('projects_view').select('*');
          if (error) {
            return { error };
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ projectId }) => ({ type: 'Projects' as const, id: projectId.toString() })),
              { type: 'Projects', id: 'LIST' },
            ]
          : [{ type: 'Projects', id: 'LIST' }],
    }),

    getProjectById: builder.query<Project, number>({
      queryFn: async (projectId) => {
        try {
          const { data, error } = await supabase.from('projects_view').select('*').eq('projectId', projectId).single();
          if (error) {
            return { error };
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) => [{ type: 'Projects', id: result?.projectId }],
    }),

    // CREATE: Project 생성
    createProject: builder.mutation<number, Omit<Project, 'projectId'>>({
      queryFn: async (project) => {
        try {
          const { status, error } = await supabase.from('projects').insert(project).select().single();
          if (error) {
            return { error };
          }
          return { data: status };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Projects'],
    }),

    // UPDATE: Project 수정
    updateProject: builder.mutation<number, Project>({
      queryFn: async (project) => {
        const { projectId, ...updateProject } = project;
        const { status } = await supabase.from('posts').update(updateProject).eq('project_id', projectId);
        return { data: status };
      },
      invalidatesTags: ['Projects'],
    }),

    // DELETE: Project 삭제
    deleteProject: builder.mutation<number, number>({
      queryFn: async (projectId) => {
        const { status } = await supabase.from('projects').delete().eq('project_id', projectId);
        return { data: status };
      },
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
