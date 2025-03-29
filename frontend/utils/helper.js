export const isPastDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);

    // Create Date object for the input date
    const inputDate = new Date(year, month - 1, day);

    // Get today's date and add 1 day (to make it "tomorrow")
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
    tomorrow.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    return inputDate < tomorrow; // Returns true if the date is before tomorrow
};

export const isValidTime = (timeString) => {
   // Regular expression to match HH:MM format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    return timeRegex.test(timeString); 
}
