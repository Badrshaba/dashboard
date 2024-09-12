import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});

export const apiRegister = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});
export const baseURL = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getUsersApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});

export const bannersApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
    APP_KEY: import.meta.env.VITE_APP_KEY,
  },
});
