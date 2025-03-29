import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/cred';

const createReservation = async (reservation) => {
    try {
        const token = await AsyncStorage.getItem('token'); // Get JWT token from AsyncStorage
        console.log(token);

        if (!token) {
            console.error("No token found");
            return null;
        }

        const response = await axios.post(`${BASE_URL}/reservations/create`,
            reservation, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;

    } catch (err) {
        return Promise.reject(err);
    }
};

export default createReservation;
