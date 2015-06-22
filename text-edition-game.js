// document.write("why?"); // for testing only

var gameField = [	[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	],
					[	[0, true], [0, true], [0, true], [0, true]	]	];
var score = 0;
writeToDocument();

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

function addCell() {

	var emptyPositions = [[]];

	for (index = 0; index < gameField.length; index++) {
		for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
			if (gameField[index][insiderIndex][0] == 0) {
				emptyPositions.add([index, insiderIndex]);
			}
		}
	}

	var randomPositionIndex = Math.floor(Math.random() * (emptyPositions.length));

	// we ended here
}


// write output
function writeToDocument() {

	var node = document.getElementById('gameBody');

	node.innerHTML = "score: " + score + "<br>";
	for (index = 0; index < gameField.length; index++) {
		for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
			node.innerHTML += gameField[index][insiderIndex][0] + " , ";
		}
		node.innerHTML += gameField[index][gameField[index].length-1][0] + "</br>";
	}

}