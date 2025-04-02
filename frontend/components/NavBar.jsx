import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../styles/RestaurantStyles';

const NavBar = ({ currentPath }) => {
    const router = useRouter();

    // Helper function to render the button or view based on currentPath
    const renderNavItem = (path, iconName, label) => {
        const isActive = currentPath === path;

        return isActive ? (
            <View style={styles.navItem}>
                <MaterialIcons name={iconName} size={28} color="#358c3a" />
                <Text style={{ color: '#358c3a' }}>{label}</Text>
            </View>
        ) : (
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push(path)}
                activeOpacity={1}
            >
                <MaterialIcons name={iconName} size={28} color="gray" />
                <Text style={{ color: 'gray' }}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.navBar}>
            {renderNavItem('restaurants', 'restaurant', 'Restaurants')}
            {renderNavItem('account', 'account-circle', 'Account')}
        </View>
    );
};

export default NavBar;
