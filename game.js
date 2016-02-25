var gameField = [
    [[2, true], [0, true], [0, true], [0, true]],
    [[2, true], [0, true], [0, true], [0, true]],
    [[4, true], [0, true], [0, true], [0, true]],
    [[4, true], [0, true], [0, true], [0, true]]];

var score = 0;
var targetNumber = 2048;
var scoreLabel = document.getElementById('score-inner-value'); // Get HTML element
const NUMBER = 0; // Not a good name for variable, is it?
const STATE = 1; // If a tile can be modified...


function cleanStates() {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < (gameField[i]).length; j++) {
            gameField[i][j][STATE] = true;
        }
    }
}

function displayFromGameField() {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < (gameField[i]).length; j++) {
            if (gameField[i][j][NUMBER] !== 0) {
                addCellToPosition(j, i, gameField[i][j][NUMBER]);
            }
        }
    }
}

function moveDone() {
    cleanStates();
    refreshScore();
    if (isWon()) {
        alert("You win this game! :)");
    } else if (isOver()) {
        alert("You lose this game! :(");
    } else {
        addCell();
    }

    // HTML rendering
    node = document.getElementById("textField");
    node.innerHTML = "";
    for (index = 0; index < gameField.length; index++) {
        for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
            node.innerHTML += gameField[index][insiderIndex][NUMBER] + " ,"  //+ "(" + gameField[index][insiderIndex][state] + ") , ";
        }
        node.innerHTML += gameField[index][gameField[index].length - 1][NUMBER] + "</br>";
    }

}

function canBeMerged(alongsideTile, movedTile) {
    return (alongsideTile[STATE] && movedTile[STATE]) &&
        (alongsideTile[NUMBER] === 0 || alongsideTile[NUMBER] === movedTile[NUMBER]);
}

// Move tile or merge by one step
function moveStep(alongsideTile, movedTile) {
    if (alongsideTile[NUMBER] !== 0) {
        alongsideTile[STATE] = false;
    }

    alongsideTile[NUMBER] += movedTile[NUMBER];
    movedTile[NUMBER] = 0;
    score += alongsideTile[NUMBER];
}


function deleteHTMLTile(row, column) {
    $(".cell.row-" + row + ".column-" + column).remove();
}


function moveHTMLTile(row, column, newRow, newColumn, newValue) {
    $(".cell.row-" + row + ".column-" + column).each(function () { // Find all elements at current position
        $(this).removeClass("row-" + row);
        $(this).addClass("row-" + (newRow));
        $(this).removeClass("column-" + column);
        $(this).addClass("column-" + newColumn);
        this.firstChild.innerHTML = newValue; // Rewrite value in span
    });
}


function moveUp() {

    for (var i = 1; i < gameField.length; i++) { // This loop starts on the second row and goes down...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...

            // This loop moving a tile as long as it's possible
            for (var k = i; k > 0; k--) {
                if (canBeMerged(gameField[k - 1][j], gameField[k][j])) {
                    moveStep(gameField[k - 1][j], gameField[k][j]);
                    deleteHTMLTile(k - 1, j);
                    moveHTMLTile(k, j, k - 1, j, gameField[k - 1][j][NUMBER]);
                } else {
                    break;
                }
            }
        }
    }
    moveDone();
}

function moveDown() {
    for (var i = 2; i >= 0; i--) { // This loop starts on the third row and goes up...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...
            for (var k = i; k < gameField.length - 1; k++) {

                if (!moveStep(gameField[k + 1][j], gameField[k][j])) {
                    break;
                }

            }
        }
    }
    moveDone();
}

function moveLeft() {
    for (var i = 1; i < gameField.length; i++) { // This loop starts on the second row and goes down...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...
            for (var k = i; k > 0; k--) {
                refreshScore();
                if (!moveStep(gameField[j][k - 1], gameField[j][k])) {
                    break;
                }

            }
        }
    }
    moveDone();
}

function moveRight() {
    for (var i = 2; i >= 0; i--) { // This loop starts on the third row and goes up...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...
            for (var k = i; k < gameField.length - 1; k++) {

                if (!moveStep(gameField[j][k + 1], gameField[j][k])) {
                    break;
                }

            }
        }
    }
    moveDone();
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
    addCell();
    refreshScore();
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

// returns if game is over
function isOver() {
    if (isInGameField(0)) {
        return false;
    }

    else {
        for (index = 0; index < gameField.length - 1; index++) {
            for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
                if (gameField[index][insiderIndex][0] == gameField[index][insiderIndex + 1][0] || gameField[index][insiderIndex][0] == gameField[index + 1][insiderIndex][0]) {
                    return false;
                }
            }
        }
        return true;
    }

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

function addCellToPosition(x, y, value) {
    var cellWrapper = document.createElement("div");
    var cellText = document.createElement("span");
    cellText.innerHTML = value;
    cellWrapper.className = "cell box column-" + x + " row-" + y;
    cellWrapper.appendChild(cellText);
    document.getElementById("game-field").appendChild(cellWrapper);
}

// Add new number into an empty cell. 2 or 4...
function addCell() {

    var emptyPositions = getEmptyPositions();

    var randomPositionIndex = Math.floor(Math.random() * (emptyPositions.length)); // Get random empty cell
    var value = (Math.random() <= 0.1) ? 4 : 2; // 2 or 4 in correct ratio

    var positionY = emptyPositions[randomPositionIndex][0]; // Row of changed cell
    var positionX = emptyPositions[randomPositionIndex][1]; // Column of changed cell

    addCellToPosition(positionX, positionY, value);

    gameField[positionY][positionX][0] = value; // Add

    refreshScore(); // Refresh displayed gamefield

}

function refreshScore() {
    scoreLabel.innerHTML = score; // Write score
}

function start() {
    addCell();
    refreshScore();
    displayFromGameField();
}
