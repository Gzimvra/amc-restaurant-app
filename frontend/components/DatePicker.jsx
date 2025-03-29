import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import styles from '../styles/AuthStyles';

const DateInputField = ({
    label = 'Date',
    value,
    onChangeText,
    error,
}) => {
    // Function to format input to DD/MM/YYYY
    const handleDateChange = (text) => {
        let formattedText = text.replace(/\D/g, ''); // Remove non-numeric characters

        if (formattedText.length > 8) {
            formattedText = formattedText.slice(0, 8); // Limit to 8 digits
        }

        // Add slashes automatically (DD/MM/YYYY)
        if (formattedText.length > 2) {
            formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
        }
        if (formattedText.length > 5) {
            formattedText = formattedText.slice(0, 5) + '/' + formattedText.slice(5);
        }

        onChangeText(formattedText);
    };

    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                mode="flat"
                maxLength={10} // Prevents input beyond DD/MM/YYYY
                style={[styles.input, { backgroundColor: 'transparent' }]}
                theme={{ colors: { primary: '#4CAF50', background: 'transparent' } }}
                left={<TextInput.Icon icon="calendar" color="#4CAF50" size={24} />}
                placeholder="DD/MM/YYYY"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    );
};

export default DateInputField;

