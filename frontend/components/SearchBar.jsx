import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState(''); // State to store the input value
    const [typingTimeout, setTypingTimeout] = useState(null); // Timer state

    // Function to handle change in input value
    const handleInputChange = (text) => {
        setInputValue(text); // Update input value

        // If there's an existing timeout, clear it
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set a new timeout to trigger the search after 1 second of no typing
        const timeout = setTimeout(() => {
            onSearch(text); // Call the parent callback to trigger the search with the current text
        }, 1000);

        setTypingTimeout(timeout); // Store the timeout ID
    };

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
            width: '100%',
            paddingHorizontal: 15,
            marginVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,  // Shadow for Android
        }}>
            {/* Search Icon */}
            <MaterialIcons name="search" size={30} color="#358c3a" />
            
            {/* Text Input for Search */}
            <TextInput
                placeholder="Search Restaurant or Location"
                placeholderTextColor="#888"
                style={{
                    flex: 1,
                    height: 50,
                    marginLeft: 10,
                    fontSize: 16,
                    borderWidth: 0, // Removes any border
                    borderBottomWidth: 0, // Removes the bottom border
                    outlineColor: 'transparent', // Removes outline on focus
                    outlineStyle: 'none', // Ensures no outline appears when focused
                }}
                value={inputValue}
                onChangeText={handleInputChange}
            />
        </View>
    );
};

export default SearchBar;
