//Cooper Griffin

const apiKeyMovieDB = '7bb9f3fb04d2e6f4faa3c20430fbb78d';
const apiKeyOpenDB = '94dce9c5';


document.addEventListener('DOMContentLoaded', async function () {
    // Your JavaScript code goes here
    let isFirstMovieOlder = false;
    let userScore = 0;
    let highScore = 0;
    

    // Fetch movie list from OpenDB API
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKeyOpenDB}&s="inception"`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }

    startButton.addEventListener('click', function () {
        // This function will be executed when the start button is clicked
        userScore = 0;
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
        const updateImageSource = async () => {
            const imageElement = document.getElementById("firstImage");
            const movie = await getRandomMovie();
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            imageElement.src = imageUrl;

            const imageElement1 = document.getElementById("secondImage");
            const movie1 = await getRandomMovie();
            const imageUrl1 = `https://image.tmdb.org/t/p/w500${movie1.poster_path}`;
            imageElement1.src = imageUrl1;

            isFirstMovieOlder = movie.release_date < movie1.release_date;
            console.log(isFirstMovieOlder);
        };
        
        // Change Image functions
        window.changeImage = async () => {
            await updateImageSource();
        };

        const updateScoreParagraph = () => {
            const scoreParagraph = document.getElementById('score');
            scoreParagraph.textContent = `${userScore}`;
        };
        
       
        
          // Initial setup
        updateImageSource();
        updateScoreParagraph();

        firstButton.addEventListener('click', function () {
            console.log("First Button Pressed");
            if(isFirstMovieOlder){
                userScore += 1;
                updateImageSource();
                updateScoreParagraph();
            }else{
                updateImageSource();
            }
        });

        secondButton.addEventListener('click', function () {
            console.log("Second Button Pressed");
            if(!isFirstMovieOlder){
                userScore += 1;
                updateImageSource();
                updateScoreParagraph();
            }else{
                updateImageSource();
            }
        });
        
        // You can add more code here to start your game or perform other actions
    });
});