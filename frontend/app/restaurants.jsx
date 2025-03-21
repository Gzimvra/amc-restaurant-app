import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Restaurants = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                console.log("No token found, redirecting to login...");
                router.replace('login'); // Redirect to login if no token
            } else {
                console.log("Token found, user authenticated.");
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    if (!isAuthenticated) return null; // Don't render anything until authentication is checked

    return (
        <View>
            <Text>Restaurants List</Text>
        </View>
    );
};

export default Restaurants;
