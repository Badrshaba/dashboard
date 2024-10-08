import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const loginAsync = createAsyncThunk('user/login', async ({ email, password }, thunkApi) => {
  console.log("user");
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
    if (data?.data?.user.role == 1) {
      window.location = '/';
    } else if (data?.data?.user.role == 4) {
      window.location = '/categories';
    } else if (data?.data?.user.role == 5) {
      window.location = '/properites';
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
