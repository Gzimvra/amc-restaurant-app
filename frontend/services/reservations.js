import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/cred';

export const createReservation = async (reservation) => {
    try {
        const token = await AsyncStorage.getItem('token'); // Get JWT token from AsyncStorage

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

export const editReservation = async (reservation_id) => {
    console.log("Edit button clicked!");
    console.log(reservation_id);
}

export const deleteReservation = async (reservation_id) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            console.error("No token found");
            return null;
        }

        const response = await axios.delete(`${BASE_URL}/reservations/delete/${reservation_id}`,
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
}
