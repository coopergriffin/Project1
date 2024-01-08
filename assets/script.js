const apiKeyMovieDB = '7bb9f3fb04d2e6f4faa3c20430fbb78d';
const apiKeyOpenDB = '94dce9c5';


// Define the getMoviePoster function
const getMoviePoster = async (movieId) => {
    
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKeyMovieDB}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const posterPath = data.poster_path;
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } catch (error) {
        throw error;
    }
};

// assets/js/script.js
document.addEventListener('DOMContentLoaded', async function () {
    // Your JavaScript code goes here
    
    const searchTerm = 'Inception';

    // Example movie ID (FightClub)
    const movieId = 550;

    // Example usage of the function without .then()
    try {
        const imageUrl = await getMoviePoster(movieId);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        document.body.appendChild(imgElement); // Append to the body or another element
    } catch (error) {
        console.error('Error:', error);
    }

    // Fetch movie list from OpenDB API
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKeyOpenDB}&s=${searchTerm}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});