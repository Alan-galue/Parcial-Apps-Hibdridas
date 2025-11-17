const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Error en la petición');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

export const authService = {
    login: async (email, password) => {
        return apiRequest('/api/Usuarios/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },
    
    register: async (nombre, email, password) => {
        return apiRequest('/api/Usuarios', {
            method: 'POST',
            body: JSON.stringify({ nombre, email, password }),
        });
    },
};

export const personajesService = {
    getAll: async () => {
        return apiRequest('/api/Personajes');
    },
    
    getById: async (id) => {
        return apiRequest(`/api/Personajes/${id}`);
    },
    
    create: async (data) => {
        return apiRequest('/api/Personajes', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    
    update: async (id, data) => {
        return apiRequest(`/api/Personajes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    delete: async (id) => {
        return apiRequest(`/api/Personajes/${id}`, {
            method: 'DELETE',
        });
    },
};

export const planetasService = {
    getAll: async () => {
        return apiRequest('/api/Planetas');
    },
    
    getById: async (id) => {
        return apiRequest(`/api/Planetas/${id}`);
    },
    
    create: async (data) => {
        return apiRequest('/api/Planetas', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    
    update: async (id, data) => {
        return apiRequest(`/api/Planetas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    
    delete: async (id) => {
        return apiRequest(`/api/Planetas/${id}`, {
            method: 'DELETE',
        });
    },
};
