import React from 'react';
import { Button } from 'react-native-paper';
import styles from '../styles/AuthStyles';

const LoadingButton = ({ loading, onPress, label }) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            loading={loading}
            disabled={loading}
            style={[styles.button, { backgroundColor: loading ? '#388E3C' : '#4CAF50' }]}
            labelStyle={[styles.buttonLabel, { color: '#fff' }]}
        >
            {loading ? 'Loading...' : label}
        </Button>
    );
};

export default LoadingButton;
