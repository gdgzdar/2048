function moveUp() {
    var wasGameFieldChanged = false;
    for (var i = 1; i < gameField.length; i++) { // This loop starts on the second row and goes down...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...

            // This loop moving a tile as long as it's possible
            for (var k = i; k > 0; k--) {

                if (canBeMerged(gameField[k - 1][j], gameField[k][j])) {
                    if (!isEmpty(gameField[k][j])) {
                        wasGameFieldChanged = true;
                    }
                    moveStep(gameField[k - 1][j], gameField[k][j]);
                    deleteHTMLTile(k - 1, j);
                    moveHTMLTile(k, j, k - 1, j, gameField[k - 1][j][NUMBER]);
                } else {
                    break;
                }
            }
        }
    }
    moveDone(wasGameFieldChanged);
}


function moveDown() {
    var wasGameFieldChanged = false;
    for (var i = 2; i >= 0; i--) { // This loop starts on the third row and goes up...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...

            // This loop moving a tile as long as it's possible
            for (var k = i; k < gameField.length - 1; k++) {

                if (canBeMerged(gameField[k + 1][j], gameField[k][j])) {
                    if (!isEmpty(gameField[k][j])) {
                        wasGameFieldChanged = true;
                    }
                    moveStep(gameField[k + 1][j], gameField[k][j]);
                    deleteHTMLTile(k + 1, j);
                    moveHTMLTile(k, j, k + 1, j, gameField[k + 1][j][NUMBER]);
                } else {
                    break;
                }

            }
        }
    }
    moveDone(wasGameFieldChanged);
}


function moveLeft() {
    var wasGameFieldChanged = false;
    for (var i = 1; i < gameField.length; i++) { // This loop starts on the second row and goes down...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...

            // This loop moving a tile as long as it's possible
            for (var k = i; k > 0; k--) {

                if (canBeMerged(gameField[j][k - 1], gameField[j][k])) {
                    if (!isEmpty(gameField[j][k])) {
                        wasGameFieldChanged = true;
                    }
                    moveStep(gameField[j][k - 1], gameField[j][k]);
                    deleteHTMLTile(j, k - 1);
                    moveHTMLTile(j, k, j, k - 1, gameField[j][k - 1][NUMBER]);
                } else {
                    break;
                }

            }
        }
    }
    moveDone(wasGameFieldChanged);
}


function moveRight() {
    var wasGameFieldChanged = false;
    for (var i = 2; i >= 0; i--) { // This loop starts on the third row and goes up...
        for (var j = 0; j < (gameField[i]).length; j++) { // This loop starts on the first column and goes right...

            // This loop moving a tile as long as it's possible
            for (var k = i; k < gameField.length - 1; k++) {

                if (canBeMerged(gameField[j][k + 1], gameField[j][k])) {
                    if (!isEmpty(gameField[j][k])) {
                        wasGameFieldChanged = true;
                    }
                    moveStep(gameField[j][k + 1], gameField[j][k]);
                    deleteHTMLTile(j, k + 1);
                    moveHTMLTile(j, k, j, k + 1, gameField[j][k + 1][NUMBER]);
                } else {
                    break;
                }

            }
        }
    }
    moveDone(wasGameFieldChanged);
}


function canBeMerged(alongsideTile, movedTile) {
    return (alongsideTile[STATE] && movedTile[STATE]) &&
        (alongsideTile[NUMBER] === 0 || alongsideTile[NUMBER] === movedTile[NUMBER]);
}


// merge or move tile by one step
function moveStep(alongsideTile, movedTile) {
    if (alongsideTile[NUMBER] !== 0) {
        alongsideTile[STATE] = false;
        score += alongsideTile[NUMBER] * 2;
    }

    alongsideTile[NUMBER] += movedTile[NUMBER];
    movedTile[NUMBER] = 0;
}