import { View, Text, FlatList, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { deleteReservation } from '../services/reservations'
import ToastHandler from './ToastHandler';
import { useNavigation } from 'expo-router';

const formatDate = (dateString) => moment(dateString, "YYYY-MM-DD").format("DD/MM/YYYY");
const formatTime = (timeString) => moment(timeString, "HH:mm:ss").format("HH:mm");

const ReservationHistory = ({ reservations: initialReservations }) => {
    const [reservations, setReservations] = useState(initialReservations);
    const navigation = useNavigation();
    const currentDateTime = moment();

    // Function to get status based on date and time
    const getStatus = (date, time) => {
        const reservationDateTime = moment(`${date} ${time}`);

        // If the reservation date and time is in the past, it is "Completed"
        if (reservationDateTime.isBefore(currentDateTime)) {
            return { status: 'Completed', icon: 'check-circle', color: 'green', disabled: true };
        }
        // If the reservation date and time is in the future, it is "Upcoming"
        return { status: 'Upcoming', icon: 'clock', color: 'orange', disabled: false };
    };

    const handleDeleteReservation = async (reservation_id) => {
        // Function to delete the reservation and update state
        const deleteResAndUpdateList = async () => {
            try {
                const response = await deleteReservation(reservation_id);
                setReservations((prevReservations) =>
                    prevReservations.filter((res) => res.reservation_id !== reservation_id)
                );
                ToastHandler('success', 'Success!', response?.message || 'You have successfully deleted your reservation!');
            } catch (err) {
                ToastHandler('error', 'Oops!', err?.message || 'Reservation deletion failed!');
            }
        };

        // If running on Web, use window.confirm()
        if (Platform.OS === 'web') {
            const isConfirmed = window.confirm("Are you sure you want to delete this reservation?");
            if (isConfirmed) deleteResAndUpdateList();
        } else {
            // Use React Native Alert for iOS/Android
            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this reservation?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: deleteResAndUpdateList, style: "destructive" }
                ]
            );
        }
    };

    const handleEditReservation = async (reservation_id) => {
        const reservationObj = initialReservations.find((item) => item.reservation_id === reservation_id);

        const restaurant = {
            restaurant_id: reservationObj.restaurant_id,
            name: reservationObj.restaurant_name,
            location: reservationObj.restaurant_location,
            description: reservationObj.restaurant_description,
            rating: reservationObj.restaurant_rating,
            reservation_id: reservationObj.reservation_id,
            date: reservationObj.date,
            time: reservationObj.time,
            numOfPeople: reservationObj.people_count,
            action: 'edit',
        };

        navigation.navigate('reservations', { restaurant });
    }

    return (
        <FlatList
            data={reservations}
            keyExtractor={(item) => item.reservation_id}
            renderItem={({ item }) => {
                const { status, icon, color, disabled } = getStatus(item.date, item.time);

                return (
                    <Card
                        style={{
                            marginBottom: 12,
                            padding: 15,
                            borderRadius: 10,
                            elevation: 3,
                            backgroundColor: "#fff",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                {item.restaurant_name}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 15 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name={icon} size={18} color={color} />
                                <Text style={{ marginLeft: 6, fontSize: 16, fontWeight: 'bold', color: color }}>
                                    {status}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="calendar" size={18} color="gray" />
                                <Text style={{ marginLeft: 6, fontSize: 16, color: 'gray' }}>
                                    {formatDate(item.date)}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="clock-outline" size={18} color="gray" />
                                <Text style={{ marginLeft: 6, fontSize: 16, color: 'gray' }}>
                                    {formatTime(item.time)}
                                </Text>
                            </View>
                        </View>

                        {/* Button Row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 25 }}>
                            <Button
                                mode="contained"
                                onPress={() => handleEditReservation(item.reservation_id)}
                                disabled={disabled}
                                style={{
                                    backgroundColor: '#FFF',
                                    paddingVertical: 2,
                                    width: '36%',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#CCC', // Light gray border
                                }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    color: '#333', // Dark gray text
                                }}
                                rippleColor="rgba(200, 200, 200, 0.3)" // Very light gray ripple
                                android_ripple={{ color: "rgba(200, 200, 200, 0.3)" }} // Android-friendly ripple
                                icon={() => <MaterialCommunityIcons name="pencil" size={18} color="#333" />} // Edit Icon
                            >
                                Edit
                            </Button>

                            <Button
                                mode="contained"
                                onPress={() => handleDeleteReservation(item.reservation_id)}
                                disabled={disabled}
                                style={{
                                    backgroundColor: '#FFF',
                                    paddingVertical: 2,
                                    width: '36%',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#CCC', // Light gray border
                                }}
                                labelStyle={{
                                    fontWeight: 'bold',
                                    color: '#333', // Dark gray text
                                }}
                                rippleColor="rgba(200, 200, 200, 0.3)" // Very light gray ripple
                                android_ripple={{ color: "rgba(200, 200, 200, 0.3)" }} // Android-friendly ripple
                                icon={() => <MaterialCommunityIcons name="trash-can-outline" size={18} color="#333" />} // Delete Icon
                            >
                                Delete
                            </Button>
                        </View>
                    </Card>
                );
            }}
        />
    );
};

export default ReservationHistory;

