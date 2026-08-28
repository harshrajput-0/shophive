
import { axiosClient } from './axiosClient';

const errorMessage = (err) => err.response?.data?.message || err.message || 'Something went wrong';

export const userService = {
  // GET /auth/users  (admin only)  -> User[]  (never includes password)
  getAll: async () => {
    const { data } = await axiosClient.get('/auth/users');
    return data;
  },

  // PATCH /auth/users/:id/role  body: { role }  -> User
  // Backend only accepts role: 'user' | 'vendor' (never 'admin').
  updateRole: async (id, role) => {
    try {
      const { data } = await axiosClient.patch(`/auth/users/${id}/role`, { role });
      return data;
    } catch (err) {
      throw new Error(errorMessage(err), { cause: err });
    }
  },
};
