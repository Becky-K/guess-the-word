//Targets the unordered list that displays what letters have been guessed
const guessedLettersElement = document.querySelector(".guessed-letters");
//Targets the "Guess" button
const guessButton = document.querySelector(".guess");
//Targets input box
const letterInput = document.querySelector("input");
//Targets the element showing the word being revealed
const wordInProgressMessage = document.querySelector(".word-in-progress");
//Targets the message telling user the number of remaining guesses
const remainingLetters = document.querySelector(".remaining");
//Targets the span around the number in the above message
const span = document.querySelector("span");
//Targets the message that displays after a guess
const messageAfterLetterGuess = document.querySelector(".message");
//Targets the "Play Again" button
const playAgainButton = document.querySelector(".play-again");
//Variable for the randomly generated word. "Magnolia" as placeholder
let word = "magnolia";
//Array for capturing letters that have been guessed
const guessedLettersArray = [];
//Variable to indicate remaining guesses
let remainingGuesses = 8;
//Creating an erray from the random word



//Async function to randomise word
const getWord = async function(){
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    //Creating an erray from the random word
    const wordsArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomIndex].trim()
    placeHolder(word);
};

//Starts game by grabbing word
getWord();


//Display placeholder icon for each letter in word
const placeHolder = function(word){
    const placeHolderLetters = [];
    for (const letter of word){
        placeHolderLetters.push("●")
    }
    wordInProgressMessage.innerText = placeHolderLetters.join("");
};

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
     //Empties message
     messageAfterLetterGuess.innerText = ""; 
    //Grabs what was entered in input
    const guess = letterInput.value;      
    //Checking the validity of the input using the "inputValidation" function and then changing it to a variable to be used with the makeGuess function
    const goodInput = inputValidation(guess);

    //Checking letters are valid using the "inputValidation" function, then using the "makeGuess" function to add them to the array
    if (goodInput){
        makeGuess(guess);
    }
    //Empties input box   
    letterInput.value = ("");
});

//A function which validates the input
const inputValidation = function(input){
    const acceptedLetter = /[a-zA-z]/;
    //If no input is entered
    if (input.length === 0){
        messageAfterLetterGuess.innerText = "You need to guess a letter!"
        //if more than one letter is input
    } else if (input.length > 1){
        messageAfterLetterGuess.innerText = "You can only enter 1 letter at a time."
         //if the input is not a letter
    } else if (!input.match(acceptedLetter)){
        messageAfterLetterGuess.innerText = "Please enter a letter from A-Z."
        //if all conditions are met, the input is returned
    } else {
        return input;
    }
};

//A function to capture input and pass to "guessedLetters array" then display guessed letters on screen using "showLetters" function
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLettersArray.includes(guess)){
        messageAfterLetterGuess.innerText = "You already guessed that letter, silly. Try another one!";
    } else {
        guessedLettersArray.push(guess);
        console.log(guessedLettersArray);
        showLetters();
        counter(guess);
        wordInProgressUpdate(guessedLettersArray);
    }
};

//A function to display to guessed letters
const showLetters = function() {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLettersArray){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);           
    }          
};

//Will update the word in progress changing the circles to guessed letters
const wordInProgressUpdate = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    //changes word into an array
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLettersArray.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgressMessage.innerText = revealWord.join("");
    win();
};

//Function to count and display number of remaining guesses
const counter = function(guess){
    //changes word to uppercase to ensure code is validating accurately 
    const wordUpper = word.toUpperCase();
    //if statement to check if guessed letter is in word and output appropriate message 
    if (!wordUpper.includes(guess)){
        messageAfterLetterGuess.innerText = `Sorry, ${guess} is not correct. Try another letter.`
        remainingGuesses -= 1;
    } else {
        messageAfterLetterGuess.innerText = `Well done! ${guess} is correct. Keep going!`
    };
    //changes remaining guesses counter and reveals word upon failure
    if (remainingGuesses === 0){
        messageAfterLetterGuess.innerHTML = `You've run out of guesses! The word was <span class="highlight">${word.toUpperCase()}</span>.`;
        span.innerText = "0 guesses"
    } else if (remainingGuesses === 1){
        span.innerText = "1 guess"
    } else {
        span.innerText = `${remainingGuesses} guesses`
    };
};


//Function to check if the player has won and display win message
const win = function (){
    if (word.toUpperCase() === wordInProgressMessage.innerText) {
        messageAfterLetterGuess.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        messageAfterLetterGuess.classList.add("win");        
    }
};




