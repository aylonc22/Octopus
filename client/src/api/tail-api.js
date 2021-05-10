import axios from 'axios';

const api = axios.create({ baseURL: 'http:localhost:4000/api'});

export const insertTail = payload => api.post(`/tail`, payload)
export const getAllTail = () => api.get(`/tails`)
export const updateTailById = (id, payload) => api.put(`/tail/${id}`, payload)
export const deleteTailById = id => api.delete(`/tail/${id}`)
export const getTailById = id => api.get(`/tail/${id}`)

const tailApi = {
    insertTail,
    getAllTail,
    updateTailById,
    deleteTailById,
    getTailById,
}

export default tailApi;