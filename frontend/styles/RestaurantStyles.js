import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // To align title and rating at opposite ends
        alignItems: 'center',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    locationIcon: {
        marginRight: 5,
    },
    restaurantLocation: {
        color: 'gray',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        height: 80,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 15,
    },
});

export default styles;