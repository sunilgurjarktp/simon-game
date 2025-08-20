const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

const startButton = document.getElementById('start');
const statusDisplay = document.getElementById('status');

startButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    gameStarted = true;
    statusDisplay.textContent = "Level " + level;
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    level++;
    statusDisplay.textContent = "Level " + level;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            return;
        }
        const color = sequence[i];
        flashButton(color);
        i++;
    }, 1000);
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

colors.forEach(color => {
    document.getElementById(color).addEventListener('click', () => {
        if (gameStarted) {
            userSequence.push(color);
            flashButton(color);
            checkSequence(userSequence.length - 1);
        }
    });
});

function checkSequence(index) {
    if (userSequence[index] === sequence[index]) {
        if (userSequence.length === sequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        statusDisplay.textContent = "Game Over! Press Start to Play Again.";
        gameStarted = false;
    }
}