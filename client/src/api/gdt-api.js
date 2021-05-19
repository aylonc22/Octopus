import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertGDT = payload => api.post(`/gdts`, payload);
export const getAllGDT = ()=>api.get(`/gdts`);
export const updateGDTById = (id, payload) => api.put(`/gdts/${id}`, payload);
export const deleteGDTById = id => api.delete(`/gdts/${id}`);
export const getGDTById = id => api.get(`/gdts/${id}`);

const gdtApi = {
    insertGDT,
    getAllGDT,
    updateGDTById,
    deleteGDTById,
    getGDTById,
}

export default gdtApi;