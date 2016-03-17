var score = 0;
const TARGET_NUMBER = 2048;
const NUMBER = 0; // Not a good name for variable, is it?
const STATE = 1; // If a tile can be modified...

var scoreLabel = document.getElementById('score-inner-value'); // Get HTML element

var gameField = [
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]],
    [[0, true], [0, true], [0, true], [0, true]]];

function initiate() {

    addRandomCell();
    refreshScore();
    displayFromGameField();
    bindArrows();
    bindSwiping();

}

// restart the game ----------------------------- TODO: NOT WORKING - How to give a parameter
function newGame() {
    clearGameField();
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

function clearGameField()  {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < gameField[i].length; j++) {
            gameField[i][j][NUMBER] = 0;
        }
    }
}

function moveDone(shouldAddTile) {

    clearStates();
    refreshScore();

    if (isWon()) {
        alert("You win this game! :)");
    } else if (isOver()) {
        alert("You lose this game! :(");
    } else if (shouldAddTile) {
        addRandomCell();
    }
    // rewriteHTMLTextGameField();
}


function refreshScore() {
    scoreLabel.innerHTML = score; // Write score
}


// returns if given number is in gamefield
function isInGameField(number) {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < gameField[i].length; j++) {
            if (gameField[i][j][NUMBER] == number) {
                return true;
            }
        }
    }
    return false;
}


function isWon() {
    return isInGameField(TARGET_NUMBER);
}


function isOver() {
    if (isInGameField(0)) {
        return false;
    }

    else {
        for (i = 0; i < gameField.length - 1; i++) {
            for (j = 0; j < gameField[i].length; j++) {

                if (canBeMerged(gameField[i][j], gameField[i + 1][j]) ||
                    canBeMerged(gameField[j][i], gameField[j][i + 1])) {

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
    for (i = 0; i < gameField.length; i++) {
        for (j = 0; j < gameField[i].length; j++) {
            if (gameField[i][j][NUMBER] == 0) {
                emptyPositions.push([i, j]);
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

    gameField[positionY][positionX][NUMBER] = value; // Add

    refreshScore(); // Refresh displayed gamefield

}


function isEmpty(tile) {
    return tile[NUMBER] === 0;
}