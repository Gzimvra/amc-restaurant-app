import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/cred';

// Function to login and store the JWT token
export const authenticateUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });      
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);

        return response.data;

    } catch (err) {
        return Promise.reject(err);
    }
};

// Function to register and store the JWT token
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);

        return response.data;
        
    } catch (err) {
        return Promise.reject(err)
    }
}
