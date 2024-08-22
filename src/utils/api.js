import axios from "axios";

 export const api = axios.create({
    baseURL: 'https://ai.w-manage.org/api'
  });