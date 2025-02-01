import axios from 'axios';

const register = async (userData) => {
    try {
        const response = await axios.post('/api/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post('/api/login', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
    }
};

export { register, login };