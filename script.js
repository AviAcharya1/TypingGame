const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const resultsDisplay = document.getElementById('results');

const testTexts = [
    "The quick brown fox jumps over the lazy dog.Typing speed tests are a great way to measure your typing efficiency.JavaScript is a versatile programming language.Practice makes perfect. Keep typing to improve your speed."
];

let timer;
let timeLeft = 60;
let startTime;
let currentText;
let currentIndex = 0;
let textToType = '';

startButton.addEventListener('click', startTest);

function startTest() {
    loadNewText();
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();
    startButton.disabled = true;
    timeLeft = 60;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    resultsDisplay.textContent = '';
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

inputArea.addEventListener('input', () => {
    const typedText = inputArea.value;
    highlightErrors(typedText);
    if (typedText.length >= textToType.length) {
        loadNewText();
        inputArea.value = '';
    }
});

function highlightErrors(typedText) {
    const textArray = textToType.split('');
    const typedArray = typedText.split('');

    typedArray.forEach((char, index) => {
        if (char !== textArray[index]) {
            textArray[index] = `<span class="highlight">${textArray[index]}</span>`;
        }
    });

    textDisplay.innerHTML = textArray.join('');
}

function loadNewText() {
    currentText = testTexts[currentIndex];
    textToType += currentText + ' ';
    textDisplay.textContent = textToType;
    currentIndex = (currentIndex + 1) % testTexts.length;
}

function endTest() {
    inputArea.disabled = true;
    startButton.disabled = false;
    const wordsTyped = inputArea.value.split(' ').length;
    const timeTaken = 60 - timeLeft;
    const wpm = Math.round((wordsTyped / timeTaken) * 60);
    resultsDisplay.textContent = `You typed ${wordsTyped} words in ${timeTaken} seconds. Your typing speed is ${wpm} WPM.`;
}
