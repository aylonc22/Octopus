import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:4000/api"});

export const insertNotification = payload => api.post(`/notifications`, payload);
export const getAllNotification = ()=>api.get(`/notifications`);
export const updateNotificationById = (id, payload) => api.put(`/notifications/${id}`, payload);
export const deleteNotificationById = id => api.delete(`/notifications/${id}`);
export const getNotificationById = id => api.get(`/notifications/${id}`);
export const getAllOpenNotification = ()=> api.get('/opennotifications');
export const getNotificationsFromTo = (from,to)=> api.get(`/notifications/${from}/${to}`);

const notificationtApi = {
    insertNotification,
    getAllNotification,
    updateNotificationById,
    deleteNotificationById,
    getNotificationById,
    getAllOpenNotification,
    getNotificationsFromTo,
}

export default notificationtApi;