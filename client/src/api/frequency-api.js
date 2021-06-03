import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertFrequency = payload => api.post(`/frequencies`, payload);
export const getAllFrequency = ()=>api.get(`/frequencies`);
export const updateFrequencyById = (id, payload) => api.put(`/frequencies/${id}`, payload);
export const deleteFrequencyById = id => api.delete(`/frequencies/${id}`);
export const getFrequencyById = id => api.get(`/frequencies/${id}`);

const frequencyApi = {
    insertFrequency,
    getAllFrequency,
    updateFrequencyById,
    deleteFrequencyById,
    getFrequencyById,
}

export default frequencyApi;