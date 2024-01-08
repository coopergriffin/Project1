//Cooper Griffin

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

function changeFirstImage() {
    const firstImage = document.getElementById('firstImage');
    firstImage.src = 'path/to/new-first-image.jpg'; // Replace with the path to your new image
}

function changeSecondImage() {
    const secondImage = document.getElementById('secondImage');
    secondImage.src = 'path/to/new-second-image.jpg'; // Replace with the path to your new image
}

// assets/script.js
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

    startButton.addEventListener('click', function () {
        // This function will be executed when the start button is clicked
        console.log('Start button clicked!');
        const getRandomMovie = async () => {
            const randomNumber = Math.floor(Math.random() * 100000); // Generate a random movie ID
            const response = await fetch(`https://api.themoviedb.org/3/movie/${randomNumber}?api_key=${apiKeyMovieDB}`);
            const data = await response.json();
            return data;
        };
        
          // Function to update the image source
          const updateImageSource = async (imageId) => {
            const imageElement = document.getElementById(imageId);
            const movie = await getRandomMovie();
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imageElement.src = imageUrl;
        };
        
          // Change Image functions
          window.changeFirstImage = async () => {
            await updateImageSource('firstImage');
        };
        
          window.changeSecondImage = async () => {
            await updateImageSource('secondImage');
        };
        
          // Initial setup
        updateImageSource('firstImage');
        updateImageSource('secondImage');
        
        // You can add more code here to start your game or perform other actions
    });
});