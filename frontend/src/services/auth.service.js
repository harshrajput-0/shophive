import { dbFindByCredentials, dbFindByEmail, dbInsertUser } from '../mock/mockDB';
import { axiosClient } from './axiosClient.js';


const delay = (v, ms = 350) => new Promise((resolve, reject) => setTimeout(() => (v.error ? reject(v.error) : resolve(v.data)), ms));

export const authService = {
  // POST /auth/login  body: { email, password }  -> { user, token }
  login: async (email, password) => {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    return data;
  },

  // POST /auth/register  body: { name, email, password }  -> { user, token }
  register: async (name, email, password) => {
    const { data } = await axiosClient.post('/auth/register', { name, email, password });
    return data;
  },
};
