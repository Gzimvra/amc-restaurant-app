import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../styles/AuthStyles';

const TimePicker = ({
    label = 'Time',
    value,
    onChangeText,
    error,
}) => {
    // Function to format input to HH:MM
    const handleTimeChange = (text) => {
        let formattedText = text.replace(/\D/g, ''); // Remove non-numeric characters

        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 4); // Limit to 4 digits
        }

        // Add colon automatically (HH:MM)
        if (formattedText.length > 2) {
            formattedText = formattedText.slice(0, 2) + ':' + formattedText.slice(2);
        }

        onChangeText(formattedText);
    };

    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={handleTimeChange}
                keyboardType="numeric"
                mode="flat"
                maxLength={5} // Prevents input beyond HH:MM
                style={[styles.input, { backgroundColor: 'transparent' }]}
                theme={{ colors: { primary: '#4CAF50', background: 'transparent' } }}
                left={<TextInput.Icon icon="clock" color="#4CAF50" size={24} />}
                placeholder="HH:MM"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    );
};

export default TimePicker;

