import axios from 'axios';

// API Base URL - defaults to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    getCurrentUser: () => api.get('/auth/me')
};

// User APIs
export const userAPI = {
    getUsers: (params) => api.get('/users', { params }),
    getUserById: (userId) => api.get(`/users/${userId}`),
    updateProfile: (data) => api.put('/users/profile', data)
};

// Portfolio APIs
export const portfolioAPI = {
    createOrUpdate: (data) => api.post('/portfolios', data),
    getMyPortfolio: () => api.get('/portfolios/me'),
    getPortfolio: (userId) => api.get(`/portfolios/${userId}`)
};

// File APIs
export const fileAPI = {
    uploadFile: (formData) => api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    uploadFromUrl: (data) => api.post('/files/url', data),
    getMyFiles: () => api.get('/files'),
    shareFile: (fileId, userIds) => api.post(`/files/${fileId}/share`, { userIds }),
    getSharedFiles: () => api.get('/files/shared')
};

// Casting APIs
export const castingAPI = {
    create: (data) => api.post('/casting', data),
    getAll: (params) => api.get('/casting', { params }),
    getById: (id) => api.get(`/casting/${id}`),
    apply: (id, message) => api.post(`/casting/${id}/apply`, { message })
};

export default api;
