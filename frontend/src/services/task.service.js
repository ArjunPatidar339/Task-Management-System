import api from './api';

const getAllTasks = (page = 0, size = 10, title = '') => {
  return api.get(`/tasks?page=${page}&size=${size}&title=${title}`);
};

const createTask = (title, description, status) => {
  return api.post('/tasks', { title, description, status });
};

const updateTask = (id, title, description, status) => {
  return api.put(`/tasks/${id}`, { title, description, status });
};

const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

const getAllUsersAdmin = () => {
  return api.get('/admin/users');
};

const getAllTasksAdmin = (page = 0, size = 10, title = '') => {
  return api.get(`/admin/tasks?page=${page}&size=${size}&title=${title}`);
};

const deleteTaskAdmin = (id) => {
  return api.delete(`/admin/tasks/${id}`);
};

const deleteUserAdmin = (id) => {
  return api.delete(`/admin/users/${id}`);
};

const taskService = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllUsersAdmin,
  getAllTasksAdmin,
  deleteTaskAdmin,
  deleteUserAdmin,
};

export default taskService;
