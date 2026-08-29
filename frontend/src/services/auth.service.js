import { axiosClient } from './axiosClient.js';

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

  // PUT /auth/profile  body: { name?, avatar?, description? }  -> updated user (no token)
  updateProfile: async (payload) => {
    const { data } = await axiosClient.put('/auth/profile', payload);
    return data;
  },
};