const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const figureParts = document.querySelectorAll(".figure-part");
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const popupContainer = document.getElementById('popup-container');
const notification = document.getElementById("notification-container")
const playAgainBtn = document.getElementById('play-button');

import generateRandomWord from './node_modules/random-words/index.js';
let selectedWord = '';

selectedWord = generateRandomWord();
console.log(selectedWord);

/*const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
*/
let playable = true;


const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
    wordEl.innerHTML = `
        ${selectedWord.split('')
                       .map(letter => 
                            `<span class="letter">
                                ${correctLetters.includes(letter) ? letter : '' }
                            </span>`
                        )
                        .join('')
        }
    `;
    
    if(wordEl.innerText.replaceAll('\n', '') === selectedWord){
        finalMessage.innerText = 'Congrats, you won!';
        finalMessageRevealWord.innerText = '';
        playable = false;
        popupContainer.style.display = 'flex';
    }
}

const updateWrongLettersElement = () => {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Guess:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    const errors = wrongLetters.length;
    figureParts.forEach((part, index) => {
        if(index < errors)
            part.style.display = 'block';
        else
            part.style.display = 'none';
    })

    if(figureParts.length === wrongLetters.length){
        finalMessage.innerText = "Oh No! You lost";
        finalMessageRevealWord.innerText = `The word was ... ${selectedWord}`;
        popupContainer.style.display = 'flex';
        playable = false;
    }
}

const showNotification = () => {
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000);
}

const function_keys = ['CapsLock', 'Shift', 'Alt', 'Control', 'Escape']

window.addEventListener('keydown', e => {
    if(playable && !function_keys.includes(e.key)){
        let key = e.key.toLowerCase();
        if(key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122){
            if(selectedWord.includes(key)){
                if(!correctLetters.includes(key)){
                    correctLetters.push(key);                    
                    displayWord();
                }
                else
                    showNotification();
            }
            else{
                if(!wrongLetters.includes(key)){
                        wrongLetters.push(key);
                        updateWrongLettersElement();
                    }
                    else
                        showNotification();
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
        playable = true;
        correctLetters.splice(0);
        wrongLetters.splice(0);
        selectedWord = generateRandomWord();
        console.log(selectedWord);
        displayWord();
        updateWrongLettersElement();
        popupContainer.style.display = 'none';
});

displayWord();