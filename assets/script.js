//Cooper Griffin

const apiKeyMovieDB = '7bb9f3fb04d2e6f4faa3c20430fbb78d';
const apiKeyOpenDB = '94dce9c5';


document.addEventListener('DOMContentLoaded', async function () {
    // Your JavaScript code goes here
    

    // Fetch movie list from OpenDB API
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKeyOpenDB}&s=${"inception"}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }

    startButton.addEventListener('click', function () {
        // This function will be executed when the start button is clicked
        console.log('Start button clicked!');
        const getRandomMovie = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeyMovieDB}`);
            const data = await response.json();

            // Get a random movie from the top-rated list
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomMovie = data.results[randomIndex];
            return randomMovie;
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

        firstButton.addEventListener('click', function () {
            console.log("First Button Pressed");
        });

        secondButton.addEventListener('click', function () {
            console.log("Second Button Pressed");
        });
        
        // You can add more code here to start your game or perform other actions
    });
});