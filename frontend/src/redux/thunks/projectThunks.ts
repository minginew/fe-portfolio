import { createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../redux';
import axios from 'axios';

// READ: 프로젝트 목록 가져오기
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (thunksApi) => {
  try {
    const response = await axios.get('');
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// CREATE: 프로젝트 생성
export const createProject = createAsyncThunk('projects/createProject', async (newProject: Project, thunksApi) => {
  try {
    const response = await axios.post('');
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// UPDATE: 프로젝트 수정
export const updateProject = createAsyncThunk('projects/updateProject', async (updatedProject: Project, thunksApi) => {
  try {
    const response = await axios.put(``, updatedProject);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

// DELETE: 프로젝트 삭제
export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number, thunksApi) => {
  try {
    await axios.delete(``);
    return projectId;
  } catch (error: any) {
    return error.message;
  }
});
