import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/cred';

const fetchReservationList = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); // Get JWT token from AsyncStorage

        if (!token) {
            console.error("No token found");
            return null;
        }

        const response = await axios.get(`${BASE_URL}/user/history`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token to request
                'Content-Type': 'application/json',
            },
        });

        return response.data;

    } catch (err) {
        return Promise.reject(err);
    }
};

export default fetchReservationList;
