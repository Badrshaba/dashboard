import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';


export const loginAsync = createAsyncThunk('user/login', async ({email, password}) => {
  try {
    const res = await api.post(
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
    
      localStorage.setItem('user', JSON.stringify(res.data.data?.user));
      localStorage.setItem('userToken', JSON.stringify(res.data.data?.token));
      
      window.location = '/';
    
      return res.data.data;
    
    
  } catch (error) {
    return error
  }
});
