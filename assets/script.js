//Cooper Griffin

const apiKeyMovieDB = '7bb9f3fb04d2e6f4faa3c20430fbb78d';
const apiKeyOpenDB = '94dce9c5';


document.addEventListener('DOMContentLoaded', async function () {
    // Your JavaScript code goes here
    let isFirstMovieOlder = false;
    let userScore = 0;
    let highScore = 0;
    let firstMovieTitle = "";
    let firstMovieDate = "";
    let secondMovieTitle = "";
    let secondMovieDate = "";

    // Function to fetch a random movie from TMDb
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

        isFirstMovieOlder = movie.release_date <= movie1.release_date;
        console.log(isFirstMovieOlder);
        if (movie.id === movie1.id) {
            console.log("Same movies, calling updateImage again.");
            await updateImageSource();
        }
        firstMovieTitle = movie.title;
        firstMovieDate = movie.release_date;
        secondMovieTitle = movie1.title;
        secondMovieDate = movie1.release_date;
    };

    // Function to update the score paragraph
    const updateScoreParagraph = () => {
        const scoreParagraph = document.getElementById('score');
        scoreParagraph.textContent = `${userScore}`;
    };

    const firstButtonHandler = function () {
        console.log("First Button Pressed");
        if (isFirstMovieOlder) {
            userScore += 1;
            exampleCorrectAnswer();
            openModal('Correct!', `Great job! Your answer is correct. ${firstMovieTitle} came out in ${firstMovieDate}, and ${secondMovieTitle} came out in ${secondMovieDate} `);
        }else{
            openModal('Wrong', `You chose ${firstMovieTitle}. But ${firstMovieTitle} came out in ${firstMovieDate}, and ${secondMovieTitle} came out in ${secondMovieDate}. You end your game with a score of ${userScore} `);   
            userScore = 0;   
        }

        updateImageSource();
        updateScoreParagraph();
    };

    const secondButtonHandler = function () {
        console.log("Second Button Pressed");
        if (!isFirstMovieOlder) {
            userScore += 1;
            //exampleCorrectAnswer();
            openModal('Correct!', `Great job! Your answer is correct. ${firstMovieTitle} came out in ${firstMovieDate}, and ${secondMovieTitle} came out in ${secondMovieDate} `);
        }else{
            openModal('Wrong', `You chose ${secondMovieTitle}. But ${firstMovieTitle} came out in ${firstMovieDate}, and ${secondMovieTitle} came out in ${secondMovieDate}. You end your game with a score of ${userScore}`);
            userScore = 0;
        }
        updateImageSource();
        updateScoreParagraph();
    };



    startButton.addEventListener('click', function () {
        // Remove previous event listeners
        firstButton.removeEventListener('click', firstButtonHandler);
        secondButton.removeEventListener('click', secondButtonHandler);

        // Add new event listeners
        firstButton.addEventListener('click', firstButtonHandler);
        secondButton.addEventListener('click', secondButtonHandler);

        // Reset the user score
        userScore = 0;

        console.log('Start button clicked!');
        updateImageSource();
        updateScoreParagraph();
    });
});

const openModal = (title, message) => {
    const modal = document.getElementById('resultModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = title;
    modalBody.textContent = message;

    modal.classList.add('is-active');
};

const closeModal = () => {
    console.log("closeModal function called");
    const modal = document.getElementById('resultModal');
    modal.classList.remove('is-active');
};

// Example of using the modal
const exampleCorrectAnswer = () => {
    openModal('Correct!', 'Great job! Your answer is correct.');
};

const exampleWrongAnswer = () => {
    openModal('Wrong!', 'Oops! Your answer is incorrect. Try again.');
};