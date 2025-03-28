import api from './api';

// GET Users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data.users; // Extract users array
  } catch (error) {
    throw error;
  }
};

// POST (Create New User)
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users/add', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT (Update User)
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE User
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
