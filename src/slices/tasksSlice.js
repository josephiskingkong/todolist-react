import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIManager } from '../managers/APIManager';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await APIManager.fetchTasks();
  return tasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ title, description }) => {
  const newTask = await APIManager.addTask(title, description);
  return newTask;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await APIManager.deleteTask(id);
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, title, description }) => {
  await APIManager.updateTask(id, title, description);
  return { id, title, description };
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, title, description } = action.payload;
        const index = state.items.findIndex(task => task.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], title, description };
        }
      });
  }
});

export default tasksSlice.reducer;