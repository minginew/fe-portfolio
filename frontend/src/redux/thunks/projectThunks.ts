import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../util/supabaseClient';
import { Project } from '../redux';

// READ: Project 목록 가져오기
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, thunksApi) => {
  try {
    //.select('projectId:project_id, title, content, roles, techstack, summary, thumbnail, startDate, endDate')
    const { data: projects, error } = await supabase.from('projects_view').select('*');
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
    console.log(projects);
    return projects;
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});

// CREATE: Project 생성
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project: Omit<Project, 'projectId'>, thunksApi) => {
    try {
      const { data: newProject, error } = await supabase.from('posts').insert(project).select().single();
      if (error) {
        return thunksApi.rejectWithValue(error.message);
      }
      // 아직 쓸지 모름
      return newProject;
    } catch (error) {
      return thunksApi.rejectWithValue(error);
    }
  }
);

// UPDATE: Project 수정
export const updateProject = createAsyncThunk('projects/updateProject', async (project: Project, thunksApi) => {
  try {
    const { projectId, ...updateProject } = project;
    const { error } = await supabase.from('posts').update(updateProject).eq('project_id', projectId);
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});

// DELETE: Project 삭제
export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number, thunksApi) => {
  try {
    const { error } = await supabase.from('posts').delete().eq('post_id', projectId);
    if (error) {
      return thunksApi.rejectWithValue(error.message);
    }
  } catch (error) {
    return thunksApi.rejectWithValue(error);
  }
});
