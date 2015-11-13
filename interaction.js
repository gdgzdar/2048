function newGameButtonClick() {
	alert("newGame button clicked"); // for testing purposes only
    //newGame();
}

function move(direction) {
	//alert(direction); //for testing purposes only

	/ directions: left = 37, up = 38, right = 39, down = 40 /
    switch(direction) {
        case 37:
            moveLeft();
            break;
            
        case 38:
            moveUp();
            break;
            
        case 39:
            moveRight();
            break;
            
        case 40:
            moveDown();
            break;
    }
}


$(function(){
	$('html').keydown(function(e) {
		move(e.which);
	});
});



// for graphical version only
//
// $(function hammerListener() {
// 	var options = {
//   		touchAction: "pan-x"
// 	};
// 	var mc = new Hammer(document.getElementById('game-field'), options);
// 	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL});

// 	mc.on("swipeleft", function(ev) {
// 		alert("left swipe detected");
// 	});

// 	mc.on("swiperight", function(ev) {
// 		alert("right swipe detected");
// 	});	

// 	mc.on("swipeup", function(ev) {
// 		alert("up swipe detected");
// 	});	

// 	mc.on("swipedown", function(ev) {
// 		alert("down swipe detected");
// 	});	

// });