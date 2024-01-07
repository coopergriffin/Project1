// assets/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code goes here
    const apiKeyOpenDB = '94dce9c5';
    const searchTerm = 'Inception';

    movieIDList = 'tt0068646'; 


    const apiKeyMovieDB = '7bb9f3fb04d2e6f4faa3c20430fbb78d';
    const movieId = 550; // Example movie ID (Inception)

    // Make a request to get movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKeyMovieDB}`)
    .then(response => response.json())
    .then(data => {
        // Get the poster path from the response
        const posterPath = data.poster_path;

        // Construct the full URL for the poster image
        const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

        // Display the image in an HTML element (e.g., an img tag)
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        document.body.appendChild(imgElement); // Append to the body or another element
    })
    .catch(error => console.error('Error:', error));



    fetch(`http://www.omdbapi.com/?apikey=${apiKeyOpenDB}&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});