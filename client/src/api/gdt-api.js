import axios from 'axios';

const api = axios.create({ baseURL: "http://192.168.43.251:4000/api"});

export const insertGDT = payload => api.post(`/gdts`, payload);
export const getAllGDT = ()=>api.get(`/gdts`);
export const updateGDTById = (id, payload) => api.put(`/gdts/${id}`, payload);
export const deleteGDTById = id => api.delete(`/gdts/${id}`);
export const getGDTById = id => api.get(`/gdts/${id}`);
export const getGDTsFromTo = (from,to)=> api.get(`/gdts/${from}/${to}`);

const gdtApi = {
    insertGDT,
    getAllGDT,
    updateGDTById,
    deleteGDTById,
    getGDTById,
    getGDTsFromTo,
}

export default gdtApi;