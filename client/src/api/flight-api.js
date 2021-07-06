import axios from 'axios';

const api = axios.create({ baseURL: "http://192.168.43.251:4000/api"});

export const insertFlight = payload => api.post(`/flights`, payload);
export const getAllFlight = ()=>api.get(`/flights`);
export const updateFlightById = (id, payload) => api.put(`/flights/${id}`, payload);
export const deleteFlightById = id => api.delete(`/flights/${id}`);
export const getFlightById = id => api.get(`/flights/${id}`);
export const getFlightsFromTo = (from,to)=> api.get(`/flights/${from}/${to}`);

const flightApi = {
    insertFlight,
    getAllFlight,
    updateFlightById,
    deleteFlightById,
    getFlightById,
    getFlightsFromTo,
}

export default flightApi;