/* eslint-disable no-unused-vars */
// BACKEND INTEGRATION
// Replace each function body with the commented axios call once a real
// auth API exists. Keep the function names/signatures the same — authSlice
// imports them by name and doesn't need to change.
import { dbFindByCredentials, dbFindByEmail, dbInsertUser } from '../mock/mockDB';
// import { axiosClient } from './axiosClient';

const delay = (v, ms = 350) => new Promise((resolve, reject) => setTimeout(() => (v.error ? reject(v.error) : resolve(v.data)), ms));

export const authService = {
  // POST /auth/login  body: { email, password }  -> { user, token }
  login: async (email, password) => {
    // const { data } = await axiosClient.post('/auth/login', { email, password });
    // return data;
    const found = dbFindByCredentials(email, password);
    if (!found) return delay({ error: new Error('Invalid email or password') });
    const { password: _pw, ...user } = found;
    return delay({ data: { user, token: 'mock-token-' + user._id } });
  },

  // POST /auth/register  body: { name, email, password }  -> { user, token }
  register: async (name, email, password) => {
    // const { data } = await axiosClient.post('/auth/register', { name, email, password });
    // return data;
    if (dbFindByEmail(email)) return delay({ error: new Error('An account with this email already exists') });
    const created = dbInsertUser({ name, email, password });
    const { password: _pw, ...user } = created;
    return delay({ data: { user, token: 'mock-token-' + user._id } });
  },
};
