// assets/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code goes here
    const apiKey = '94dce9c5';
    const searchTerm = 'Inception';

    movieIDList = 'tt0068646'; 

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});