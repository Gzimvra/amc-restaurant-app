import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, /*useRouter*/ } from 'expo-router';
import MenuBar from '../components/MenuBar';
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import fetchRestaurants from '../services/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import ToastHandler from '../components/ToastHandler';

const Restaurants = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    // const router = useRouter();
    const navigation = useNavigation();

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

    // Separate useEffect for safe navigation
    useEffect(() => {
        if (isAuthenticated === false) navigation.navigate('/login');
    }, [isAuthenticated]);

    // Fetch restaurants when authenticated or search query changes
    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                setLoading(true);
                setError(false);
                try {
                    const data = await fetchRestaurants(searchQuery);
                    setRestaurants(data.restaurants || []); // Ensure data is an array
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    setError(true);
                    ToastHandler('error', 'Restaurants List Fetching Failed', err?.response?.data?.message || "Oops! Something went wrong");
                }
            };
            fetchData();
        }
    }, [isAuthenticated, searchQuery]); // Add searchQuery as a dependency

    // Show a loading indicator while checking authentication
    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    // Show a message while redirecting instead of returning null
    if (isAuthenticated === false) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'gray' }}>Redirecting to login...</Text>
            </View>
        );
    }

    // Function to handle card press and navigate to the reservations page
    const handleCardPress = (restaurant) => {
        navigation.navigate('reservations', { restaurant });
    };

    // Function to handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query); // Update search query state
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Menu (TopBar) */}
            <MenuBar title={"List of Restaurants"} />

            <View style={{ width: '100%', padding: 10 }}>
                <SearchBar onSearch={handleSearch} />
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginBottom: 80 }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 80 }}>
                        <View style={{ width: '100%', padding: 10 }}>
                            {/* Check if there's an error */}
                            {error ? (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: 'black', marginTop: 20, fontSize: 18 }}>
                                        Oops, something went wrong!
                                    </Text>
                                </View>
                            ) : restaurants.length > 0 ? (
                                restaurants.map((restaurant) => (
                                    <RestaurantCard
                                        key={restaurant.restaurant_id}
                                        name={restaurant.name}
                                        location={restaurant.location}
                                        rating={restaurant.rating}
                                        onPress={() => handleCardPress(restaurant)}
                                    />
                                ))
                            ) : (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: 'black', marginTop: 20, fontSize: 18 }}>
                                        No restaurants found
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}

            {/* Bottom Navigation Bar */}
            <Navbar currentPath={"restaurants"} />
        </View>
    );
};

export default Restaurants;
