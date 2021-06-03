import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertFlight = payload => api.post(`/flights`, payload);
export const getAllFlight = ()=>api.get(`/flights`);
export const updateFlightById = (id, payload) => api.put(`/flights/${id}`, payload);
export const deleteFlightById = id => api.delete(`/flights/${id}`);
export const getFlightById = id => api.get(`/flights/${id}`);

const flightApi = {
    insertFlight,
    getAllFlight,
    updateFlightById,
    deleteFlightById,
    getFlightById,
}

export default flightApi;