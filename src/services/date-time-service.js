export const getShortDate = (date) => {
    if (!date) {
        return date;
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const getLongDate = (date) => {
    if (!date) {
        return date;
    }

    const months = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};