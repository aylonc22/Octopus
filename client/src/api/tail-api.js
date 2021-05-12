import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertTail = payload => api.post(`/tails`, payload);
export async function getAllTail() {
   const response = await api.get(`/tails`);
   return response.data;
};
export const updateTailById = (id, payload) => api.put(`/tails/${id}`, payload);
export  const deleteTailById = id => api.delete(`/tails/${id}`);
export const getTailById = id => api.get(`/tails/${id}`);

const tailApi = {
    insertTail,
    getAllTail,
    updateTailById,
    deleteTailById,
    getTailById,
}

export default tailApi;