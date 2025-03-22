import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import styles from '../styles/AuthStyles';

const InputField = ({
    label,
    labelIcon,
    value,
    onChangeText,
    error,
    secureTextEntry = false,
    togglePasswordVisibility,
    showPassword = false,
    keyboardType = 'default',
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry && !showPassword}
                keyboardType={keyboardType}
                mode="flat"
                style={[styles.input, { backgroundColor: 'transparent' }]}
                theme={{ colors: { primary: '#4CAF50', background: 'transparent' } }}
                left={<TextInput.Icon icon={labelIcon} color="#4CAF50" size={24} />}
                right={
                    secureTextEntry && (
                        <TextInput.Icon
                            icon={!showPassword ? 'eye-off' : 'eye'}
                            color="#4CAF50"
                            onPress={togglePasswordVisibility}
                            size={24}
                        />
                    )
                }
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </>
    );
};

export default InputField;
