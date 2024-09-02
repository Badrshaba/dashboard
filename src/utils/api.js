import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ai.w-manage.org/api',
  headers: {
    Accept: 'application/json',
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});

export const apiRegister = axios.create({
  baseURL: 'https://ai.w-manage.org/api',
  headers: {
    Accept: 'application/json',
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});
export const baseURL = axios.create({
  baseURL: 'https://ai.w-manage.org/api',
});

export const getUsersApi = axios.create({
  baseURL: 'https://ai.w-manage.org/api',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});

export const bannersApi = axios.create({
  baseURL: 'https://ai.w-manage.org/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});
