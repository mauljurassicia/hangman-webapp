const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesCount = document.querySelector(".guesses-text b");
const hangmanImg = document.querySelector(".hangman-box img")

let currentWord;
let wordCount = 0;
const maxGuesses = 6;

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => "<li class='letter'></li>").join("")
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //Showing letter that is correct
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
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
}
// Creating keyboard buttons
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();