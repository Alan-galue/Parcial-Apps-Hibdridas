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
        
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            throw new Error('El servidor no está respondiendo. Verifica que el backend esté corriendo.');
        }
        
        if (!response.ok) {
            throw new Error(data.msg || 'Error en la petición');
        }
        
        return data;
    } catch (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
            throw new Error('No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo en el puerto 8000.');
        }
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
};

export const planetasService = {
    getAll: async () => {
        return apiRequest('/api/Planetas');
    },
    
    getById: async (id) => {
        return apiRequest(`/api/Planetas/${id}`);
    },
};
