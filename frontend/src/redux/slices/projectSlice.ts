import { createSlice } from '@reduxjs/toolkit';
import { fetchProjects } from '../thunks/projectThunks';
import { Projects } from '../redux';

const initialState: Projects = {
  projects: [],
  status: '',
  error: '',
};
const projectSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = 'succese';
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || '';
      });
  },
});

export default projectSlice;
