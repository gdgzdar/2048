// keys callbacks
$(function(){
	$('html').keydown(function(direction) {
        switch(direction.which) {
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
	});
});


// touch devices support
$(function hammerListener() {
	var options = {
   		touchAction: "pan-x"
	};
	var mc = new Hammer(document.getElementById('game-field'), options);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL});

	mc.on("swipeleft", function(ev) {
        moveLeft();
	});

	mc.on("swiperight", function(ev) {
        moveRight();
	});

	mc.on("swipeup", function(ev) {
		moveUp();
	});

	mc.on("swipedown", function(ev) {
		moveDown();
	});

});
