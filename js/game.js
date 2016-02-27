var gameField = [
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]]];

var score = 0;
var targetNumber = 2048;
const NUMBER = 0; // Not a good name for variable, is it?
const STATE = 1; // If a tile can be modified...

var scoreLabel = document.getElementById('score-inner-value'); // Get HTML element

function initiate() {
    addRandomCell();
    refreshScore();
    displayFromGameField();
}

// restart the game
function newGame() {
    for (index = 0; index < gameField.length; index++) {
        for (insiderIndex = 0; insiderIndex < gameField[index].length; insiderIndex++) {
            gameField[index][insiderIndex][0] = 0;
        }
    }
    var gameFieldElement = document.getElementById("game-field");
    while (gameFieldElement.firstChild) {
        gameFieldElement.removeChild(gameFieldElement.firstChild);
    }
    score = 0;
    addRandomCell();
    refreshScore();
}


function clearStates() {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < (gameField[i]).length; j++) {
            gameField[i][j][STATE] = true;
        }
    }
}


function moveDone() {

    clearStates();
    refreshScore();

    if (isWon()) {
        alert("You win this game! :)");
    } else if (isOver()) {
        alert("You lose this game! :(");
    } else {
        addRandomCell();
    }
    rewriteHTMLTextGameField();
}


function refreshScore() {
    scoreLabel.innerHTML = score; // Write score
}

// returns if given number is in gamefield
function isInGameField(number) {
    for (index = 0; index < gameField.length; index++) {
        for (insiderIndex = 0; insiderIndex < gameField[index].length; insiderIndex++) {
            if (gameField[index][insiderIndex][0] == number) {
                return true;
            }
        }
    }
    return false;
}

// returns if game is won
function isWon() {
    return isInGameField(targetNumber);
}

// returns if game is over --------------------------------------------------------------------- TODO: not working
function isOver() {
    if (isInGameField(0)) {
        return false;
    }

    else {
        for (i = 0; i < gameField.length - 1; i++) {
            for (j = 0; j < gameField[i].length - 1; j++) {

                if (canBeMerged(gameField[i][j], gameField[i][j + 1]) ||
                    canBeMerged(gameField[i][j], gameField[i + 1][j])) {
                    return false;
                }
            }
        }
    }

    return true;

}

function getEmptyPositions() {

    // Array of empty cells in the gamefield
    var emptyPositions = [];

    // Fill an array with empty cells positions
    for (index = 0; index < gameField.length; index++) {
        for (insiderIndex = 0; insiderIndex < gameField[index].length; insiderIndex++) {
            if (gameField[index][insiderIndex][0] == 0) {
                emptyPositions.push([index, insiderIndex]);
            }
        }
    }
    return emptyPositions;
}


// Add new number into an empty cell. 2 or 4...
function addRandomCell() {

    var emptyPositions = getEmptyPositions();

    var randomPositionIndex = Math.floor(Math.random() * (emptyPositions.length)); // Get random empty cell
    var value = (Math.random() <= 0.1) ? 4 : 2; // 2 or 4 in correct ratio

    var positionY = emptyPositions[randomPositionIndex][0]; // Row of changed cell
    var positionX = emptyPositions[randomPositionIndex][1]; // Column of changed cell

    addCellToPosition(positionX, positionY, value);

    gameField[positionY][positionX][0] = value; // Add

    refreshScore(); // Refresh displayed gamefield

}
