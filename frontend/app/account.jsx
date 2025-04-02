import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import { useUser } from '../contexts/UserContext';
import { ActivityIndicator, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import ToastHandler from '../components/ToastHandler';
import ReservationHistory from '../components/ReservationHistory';
import fetchReservationList from '../services/account';

const Account = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const navigation = useNavigation();
    const { user } = useUser() || { user: null };

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setIsAuthenticated(!!token); // Convert token existence to boolean
            } catch (error) {
                console.error("Error reading token:", error);
                setIsAuthenticated(false);
            }
        })();
    }, []);

    // Redirect if not authenticated
    useEffect(() => {
        if (isAuthenticated === false) {
            navigation.navigate('login');
        }

        if (isAuthenticated === true) {
            handleFetchHistory();
        }

    }, [isAuthenticated]);

    // Show a loading indicator while checking authentication
    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    const handleFetchHistory = async () => {
        try {
            const response = await fetchReservationList();
            setReservations(response.reservationHistory);
        } catch (err) {
            ToastHandler('error', 'Oops!', err?.message || 'Something went wrong.');
        }

    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await AsyncStorage.clear();
            navigation.navigate("login")
        } catch (err) {
            ToastHandler("error", "Oops! Something went wrong.", "Logout Failed")
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Top Navigation Bar */}
            <MenuBar title={"Your Account"} showBackButton={false} />

            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 80 }}>
                    <View style={{ width: '100%', padding: 15 }}>
                        {/* Title, Subtitle, and Button on the Same Row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Left side: Title and Subtitle */}
                            <View>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 3 }}>
                                    {user?.username}
                                </Text>
                                <Text style={{ fontSize: 16, color: 'gray' }}>
                                    {user?.email}
                                </Text>
                            </View>

                            {/* Right side: Button */}
                            <Button
                                mode="contained"
                                onPress={handleLogout}
                                loading={loading}
                                disabled={loading}
                                style={{
                                    backgroundColor: loading ? '#E57373' : '#D32F2F',
                                    paddingVertical: 2,
                                    borderRadius: 8,
                                    elevation: 4, // Shadow for elevation on Android
                                    shadowColor: '#000', // Shadow color for iOS
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1, // Shadow opacity for iOS
                                    shadowRadius: 4, // Shadow blur for iOS
                                }}
                                labelStyle={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                icon={() => (<MaterialCommunityIcons name="logout" size={24} color="#fff" />)}
                            >
                                {loading ? 'Logging out...' : 'Logout'}
                            </Button>
                        </View>

                        <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 17 }} />

                        <Text style={{ fontSize: 20, marginBottom: 15 }}>
                            Reservation History
                        </Text>

                        {loading ? (
                            <ActivityIndicator size="large" color="#2E7D32" />
                        ) : reservations.length === 0 ? (
                            <Text style={{ textAlign: 'center', color: 'gray' }}>No reservations found.</Text>
                        ) : (
                            <ReservationHistory reservations={reservations} />
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Navigation Bar */}
            <NavBar currentPath={"account"} />
        </View>
    );
};

export default Account;

