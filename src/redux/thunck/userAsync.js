import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const loginAsync = createAsyncThunk('user/login', async ({ email, password }, thunkApi) => {
  try {
    const { data } = await api.post(
      '/login',
      {
        email,
        password,
      },
      {
        headers: {
          Accept: 'application/json',
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      }
    );
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data.data?.user));
    localStorage.setItem('userToken', JSON.stringify(data.data?.token));
    if (data?.data?.user.role == 'broker') {
      window.location = '/broker';
    } else if (data?.data?.user.role == 'admin') {
      window.location = '/';
    }

    return data.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.clear();
  window.location = '/login';
});
