const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesCount = document.querySelector(".guesses-text b");
const hangmanImg = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again")

let currentWord, correctLetters;
let wordCount;
const maxGuesses = 6;

const resetGame = (word) => {
    correctLetters = [];
    wordCount = 0;
    hangmanImg.src = `images/hangman-${wordCount}.svg`;
    guessesCount.innerText = `${wordCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = word.split("").map(() => "<li class='letter'></li>").join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame(word)
    
}


const gameOver = (isVictory) => {
    //after 600ms showing the modal
    setTimeout(() => {
        const modalText = isVictory ? "You found the word:" : "The correct word was:";
        gameModal.classList.add("show");
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`

    }, 300)
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //Showing letter that is correct
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        //update the image if wrong
        wordCount++;
        hangmanImg.src = `images/hangman-${wordCount}.svg`;
    }
    button.disabled = true;
    guessesCount.innerText = `${wordCount} / ${maxGuesses}`;

    if(wordCount === maxGuesses) gameOver(false);
    if(correctLetters.length === currentWord.length) gameOver(true);
}
// Creating keyboard buttons
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

playAgain.addEventListener("click", () => {
    getRandomWord();
})



getRandomWord();
