import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertStation = payload => api.post(`/stations`, payload);
export const getAllStation = ()=>api.get(`/stations`);
export const updateStationById = (id, payload) => api.put(`/stations/${id}`, payload);
export const deleteStationById = id => api.delete(`/stations/${id}`);
export const getStationById = id => api.get(`/stations/${id}`);
export const getStationsFromTo = (from,to)=> api.get(`/stations/${from}/${to}`);

const stationApi = {
    insertStation,
    getAllStation,
    updateStationById,
    deleteStationById,
    getStationById,
    getStationsFromTo,
}

export default stationApi;