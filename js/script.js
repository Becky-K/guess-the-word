//Targets the unordered list that displays what letters have been guessed//
const guessedLetters = document.querySelector(".guessed-letters");
//Targets the "Guess" button//
const guessButton = document.querySelector(".guess");
//Targets input box//
const letterInput = document.querySelector("input");
//Targets the element showing the word being revealed//
const wordInProgressMessage = document.querySelector(".word-in-progress");
//Targets the message telling user the number of remaining guesses//
const remainingLetters = document.querySelector(".remaining");
//Targets the span around the number in the above message//
const span = document.querySelector("span");
//Targets the message that displays after a guess//
const messageAfterLetterGuess = document.querySelector(".message");
//Targets the "Play Again" button//
const playAgainButton = document.querySelector(".play-again");
//Variable for the randomly generated word. "Magnolia" as placeholder//
const word = "magnolia";

const placeHolder = function(word){
    placeHolderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeHolderLetters.push("●")
    }
    wordInProgressMessage.innerText = placeHolderLetters.join("");
}

placeHolder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let letterInputValue = letterInput.value;   
    console.log(letterInputValue);
    letterInput.value = (""); 
});
    