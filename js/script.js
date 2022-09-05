//Targets the unordered list that displays what letters have been guessed
const guessedLetters = document.querySelector(".guessed-letters");
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
const word = "magnolia";
//Array for capturing letters that have been guessed
const guessedLettersArray = [];

//Display placeholder icon for each letter in word
const placeHolder = function(word){
    placeHolderLetters = [];
    for (const letter of word){
        placeHolderLetters.push("●")
    }
    wordInProgressMessage.innerText = placeHolderLetters.join("");
};

placeHolder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    //Grabs what was entered in input
    const letterInputValue = letterInput.value;
    //Empties input box   
    letterInput.value = ("");
    //Empties message
    messageAfterLetterGuess.innerText = "";
    
    //Checking the validity of the input using the "inputValidation" function and then changing it to a variable to be used with the makeGuess function
    const goodInput = inputValidation(letterInputValue);

    //Checking letters are valid using the "inputValidation" function, then using the "makeGuess" function to add them to the array
    makeGuess(goodInput);

});

//A function which validates the input
const inputValidation = function(input){
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0){
        //If no input is entered
        messageAfterLetterGuess.innerText = "You need to guess a letter!"
    } else if (input.length > 1){
        //if more than one letter is input
        messageAfterLetterGuess.innerText = "You can only enter 1 letter at a time."
    } else if (!input.match(acceptedLetter)){
        //if the input is not a letter
        messageAfterLetterGuess.innerText = "Please enter a letter from A-Z."
    } else {
        //if all conditions are met, the input is returned
        return input;
    }
};

//A function to capture input and pass to "guessedLetters array"
const makeGuess = function(letter){
    letter.toUpperCase();
    if (guessedLettersArray.includes(letter)){
        messageAfterLetterGuess.innerText = "You already guessed that letter, silly. Try another one!"
    } else {
        guessedLettersArray.push(letter);
    }
    console.log(guessedLettersArray);
};


