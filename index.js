let boxElement = document.querySelectorAll(".box");
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let xAttempts = [];
let oAttempts = [];
let click = 0;
let wonTheGame = 0;
let message = document.getElementById("message");
let gameResult = document.getElementById("result");
let restart = document.getElementById("button");

boxElement.forEach(box => {
    box.onclick = handleClick;
});

function handleClick(e) {
    const i = e.target.getAttribute('id');
    const text = document.createElement('p');
    text.setAttribute('id', 'text');
    boxElement[i - 1].appendChild(text);
    if (click % 2 == 0) {
        xAttempts.push(parseInt(i - 1));
        text.innerHTML = "X";
        text.style.color = '#FAB201';
        result(winningCombinations, xAttempts, "X");
    } else {
        oAttempts.push(parseInt(i - 1));
        text.innerHTML = "O";
        text.style.color = '#FAB201';
        result(winningCombinations, oAttempts, "O");
    }
    click++;
    if (click == 9 && wonTheGame == 0) {
        gameResult.style.visibility = "visible";
        message.innerHTML = "It's a tie 🤝 ";
    }
}

function result(winningCombinations, attempts, player) {
    let flag = 0;
    let checker = [];
    for (let i = 0; i < winningCombinations.length; i++) {
        if (Array.isArray(winningCombinations[i])) {
            result(winningCombinations[i], attempts, player);
        } else {
            if (attempts.includes(winningCombinations[i])) {
                checker.push(true);
                flag++;
            } else {
                checker.push(false);
            }
        }
    }
    if (checker.every(check => check === true) && flag > 2) {
        gameResult.style.visibility = "visible";
        message.innerHTML = "'" + player + "'" + " Won the game!";
        wonTheGame = 1;
    }
}

restart.onclick = () => {
    window.location.reload();
};
