function displayFromGameField() {
    for (var i = 0; i < gameField.length; i++) {
        for (var j = 0; j < (gameField[i]).length; j++) {
            if (gameField[i][j][NUMBER] !== 0) {
                addCellToPosition(j, i, gameField[i][j][NUMBER]);
            }
        }
    }
}


function addCellToPosition(x, y, value) {
    var cellWrapper = document.createElement("div");
    var cellText = document.createElement("span");
    cellText.innerHTML = value;
    cellWrapper.className = "cell box column-" + x + " row-" + y;
    cellWrapper.appendChild(cellText);
    document.getElementById("game-field").appendChild(cellWrapper);
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


// HTML rendering
function rewriteHTMLTextGameField() {
    node = document.getElementById("textField");
    node.innerHTML = "";
    for (index = 0; index < gameField.length; index++) {
        for (insiderIndex = 0; insiderIndex < gameField[index].length - 1; insiderIndex++) {
            node.innerHTML += gameField[index][insiderIndex][NUMBER] + " ,"  //+ "(" + gameField[index][insiderIndex][state] + ") , ";
        }
        node.innerHTML += gameField[index][gameField[index].length - 1][NUMBER] + "</br>";
    }
}