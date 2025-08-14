import axios from "axios";

const URL = "http://localhost:4000/api/tasks";

export const getTasks = () => axios.get(URL);
export const createTask = (task) => axios.post(URL, task);
export const updateTask = (id, task) => axios.put(`${URL}/${id}`, task);
export const deleteTask = (id, task) => axios.delete(`${URL}/${id}`);
export const toggleTask = (id, task) => axios.patch(`${URL}/${id}/toggle`);
