export const getRandomQuote = async () => {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const quotes = await response.json();
        const index = Math.floor(Math.random() * Math.floor(quotes.length - 1));
        const randomQuote = quotes[index];

        return randomQuote;
    } catch (error) {
        alert(error);
    }
};