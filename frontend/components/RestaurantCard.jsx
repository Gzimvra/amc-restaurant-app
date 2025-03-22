import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/RestaurantStyles';

const RestaurantCard = ({ name, location, rating, onPress }) => {
    return (
        <TouchableHighlight
            style={styles.cardContainer}
            underlayColor="#e0e0e0"
            onPress={onPress}
        >
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={18} color="orange" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>

                <View style={styles.locationContainer}>
                    <Icon name="map-marker" size={17} color="#358c3a" style={styles.locationIcon} />
                    <Text style={styles.restaurantLocation}>{location}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default RestaurantCard;
