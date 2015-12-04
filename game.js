var gameField = [   [   [0, true], [0, true], [0, true], [0, true]  ],
					[   [0, true], [0, true], [0, true], [0, true]  ],
					[   [0, true], [0, true], [0, true], [0, true]  ],
					[   [0, true], [0, true], [0, true], [0, true]  ]   ];
var score = 0;
var targetNumber = 2048;
var scoreLabel = document.getElementById('score-inner-value'); // Get HTML element
const number = 0; // Not a good name for variable, is it?
const state = 1; // If a tile can be modified...

function cleanStates() {
	for (var i = 0; i < gameField.length; i++) {
		for (var j = 0; j < (gameField[i]).length; j++) {
			gameField[i][j][state] = true;
		}
	}
}

function moveDone() {
	cleanStates();
	refresh();
	if (isWon()) {
		alert("You win this game! :)");
	} else if (isOver()) {
		alert("You lose this game! :(");
	} else {
		addCell();
	}
}

// Move tile, merge and return boolean if the merge is possible
function moveStep(alongsideTile, movedTile) {

	if (alongsideTile[state] && movedTile[state]) { // If can be merged...
		if (alongsideTile[number] === 0) { // if the alongside tile is empty
			alongsideTile[number] = movedTile[number];
			movedTile[number] = 0;

		} else if (alongsideTile[number] === movedTile[number]) { // if the alongside tile and moved tile are same
			alongsideTile[state] = false;
			alongsideTile[number] *= 2;
			movedTile[number] = 0;
			score += alongsideTile[number];
		}

		//alert(alongsideTile[state] + ", " +  alongsideTile[number]);

		return true; // can continue trying to move
	}
	return false; // cannot continue trying to move
}

function moveUp() {
	for (var i = 1; i < gameField.length; i++) { // This loop starts on the second row and goes down...
		for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...
			var originalPosition = i;
			var steps = 0;
			for (var k = i; k > 0; k--) {

				if (!moveStep(gameField[k - 1] [j], gameField[k] [j])) {
					break;
				}
				steps++;
			}

			var newPosition = originalPosition - steps;
			$(".cell.row-" + originalPosition + ".column-" + j).each(function() {

				$(this).removeClass("row-" + originalPosition);
				$(this).addClass("row-" + newPosition);
				this.firstChild.innerHTML = gameField[newPosition][j][number];
			});

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
				refresh();
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
	refresh();
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


// Add new number into an empty cell. 2 or 4...
function addCell() {

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

	var randomPositionIndex = Math.floor(Math.random() * (emptyPositions.length)); // Get random empty cell
	var cellToAdd = (Math.random() <= 0.1) ? 4 : 2; // 2 or 4 in correct ratio

	var positionY = emptyPositions[randomPositionIndex][0]; // Row of changed cell
	var positionX = emptyPositions[randomPositionIndex][1]; // Column of changed cell


	gameField[positionY][positionX][0] = cellToAdd; // Add

	var cellWrapper = document.createElement("div");
	var cellText = document.createElement("span");
	cellText.innerHTML = cellToAdd;
	cellWrapper.className = "cell box column-" + positionX + " row-" + positionY;
	cellWrapper.appendChild(cellText);
	document.getElementById("game-field").appendChild(cellWrapper);

	refresh(); // Refresh displayed gamefield

}

function refresh() {
    scoreLabel.innerHTML = score; // Write score
}

addCell();
refresh();