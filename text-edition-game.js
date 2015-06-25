// document.write("why?"); // for testing only

var gameField = [	[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	]	];
var score = 0;
addCell();

function moveUp() {

}

function moveDown() {

}

function moveLeft() {

}

function moveRight() {

}

function newGame() {

}

function isWon() {

}

function isOver() {

}

// Add new number into empty cell. 2 or 4...
function addCell() {

	// Array of empty cells in gamefield
	var emptyPositions = [];

	// Fill array with empty cells positions
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

	writeToDocument(); // Refresh displayed gamefield
}



// Write output
function writeToDocument() {

	var node = document.getElementById('gameBody'); // Get HTML element

	node.innerHTML = "score: " + score + "<br>"; // Write score

	// Write game field in correct format
	for (index = 0; index < gameField.length; index++) {
		for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
			node.innerHTML += gameField[index][insiderIndex][0] + " , ";
		}
		node.innerHTML += gameField[index][gameField[index].length-1][0] + "</br>";
	}

}