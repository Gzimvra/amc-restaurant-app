import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import LoadingButton from '../components/LoadingButton';
import ToastHandler from '../components/ToastHandler';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import { isPastDate, isValidTime } from '../utils/helper';
import { createReservation } from '../services/reservations';

const Reservations = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [date, setDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [time, setTime] = useState('');
    const [timeError, setTimeError] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [numOfPeopleError, setNumOfPeopleError] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const { restaurant } = route.params; // Get the passed restaurant object

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

    // Pre-fill form fields if data exists
    useEffect(() => {
        console.log("Reservation page:", JSON.stringify(restaurant, null, 2));

        restaurant?.numOfPeople ? setNumOfPeople(String(restaurant.numOfPeople)) : setNumOfPeople('');
        restaurant?.date ? setDate(restaurant.date) : setDate('');
        restaurant?.time ? setTime(restaurant.time) : setTime('');
    }, [restaurant]);

    // Separate useEffect for safe navigation
    useEffect(() => {
        if (isAuthenticated === false) navigation.navigate('/login');
    }, [isAuthenticated]);

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

    const handleReservation = async () => {
        setNumOfPeopleError('');
        setDateError('');
        setTimeError('');

        let valid = true;

        if (!numOfPeople.trim()) {
            setNumOfPeopleError('Number of people is required');
            valid = false;
        }

        if (!date.trim() || isPastDate(date)) {
            setDateError('You must enter a valid date');
            valid = false;
        }

        if (!time.trim() || !isValidTime(time)) {
            setTimeError('You must enter a valid time');
            valid = false;
        }

        if (!valid) return;

        setLoading(true);

        try {
            const reservation = {
                restaurant_id: restaurant.restaurant_id,
                numOfPeople: numOfPeople,
                date: date,
                time: time,
            }

            await createReservation(reservation);

            setNumOfPeople('');
            setDate('');
            setTime('');

            navigation.navigate('restaurants')

            ToastHandler('success', 'Success!', 'Your reservation has been booked.');

        } catch (err) {
            setError(true);
            ToastHandler('error', 'Making Reservation Failed', err?.response?.data?.message || "Oops! Something went wrong");

        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Menu (TopBar) */}
            <MenuBar title={"Reservation Form"} showBackButton={true} />

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
                        ) : (
                            <View style={{
                                paddingHorizontal: 10,
                                marginVertical: 10,
                            }}>
                                {/* Restaurant Name */}
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: '600',
                                    marginBottom: 5,
                                }}>
                                    {restaurant.name}
                                </Text>

                                {/* Location */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <MaterialIcons name="location-on" size={20} color="#2E7D32" />
                                    <Text style={{ fontSize: 16, color: 'gray', marginLeft: 5 }}>
                                        {restaurant.location}
                                    </Text>
                                </View>

                                {/* Rating */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <MaterialIcons name="star" size={20} color="orange" />
                                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 5 }}>
                                        {restaurant.rating} / 5
                                    </Text>
                                </View>

                                {/* Description */}
                                <Text style={{ fontSize: 16, color: '#555', lineHeight: 22, marginLeft: 5 }}>
                                    {restaurant.description}
                                </Text>

                                <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 17 }} />

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    marginBottom: 30,
                                }}>
                                    Reservation Form
                                </Text>

                                <InputField
                                    label="Number of People"
                                    labelIcon="account-group"
                                    value={numOfPeople}
                                    onChangeText={(text) => {
                                        // Remove non-numeric characters
                                        const formattedText = text.replace(/[^0-9]/g, '');
                                        setNumOfPeople(formattedText);
                                    }}
                                    error={numOfPeopleError}
                                    keyboardType="number-pad"
                                />

                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChangeText={setDate}
                                    error={dateError}
                                />

                                <TimePicker
                                    label="Time"
                                    value={time}
                                    onChangeText={setTime}
                                    error={timeError}
                                />

                                {/* ADD BUTTON LATER */}
                                <LoadingButton loading={loading} onPress={handleReservation} label="Submit" />

                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Navigation Bar */}
            <NavBar />
        </View>
    );
};

export default Reservations;
