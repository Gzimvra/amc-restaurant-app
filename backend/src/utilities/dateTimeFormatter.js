// Function to format date from 'DD/MM/YYYY' to 'YYYY-MM-DD'
const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

// Function to ensure time is in 'HH:mm:ss' format
const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`; // Adding the seconds part
};

module.exports = { formatDate, formatTime };
