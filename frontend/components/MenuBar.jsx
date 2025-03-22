import { View, Text } from 'react-native';
import React from 'react';

export default function MenuBar({ title }) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center', // Title centered in the middle
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#2E7D32', // Green color
        }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>
                {title}
            </Text>
        </View>
    );
}
