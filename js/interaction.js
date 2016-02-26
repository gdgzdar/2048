// keys callbacks
$(function(){
	$('html').keydown(function(e) {
		switch(e.which) {
			case 37:
				e.preventDefault();
				moveLeft();
				break;

			case 38:
				e.preventDefault();
				moveUp();
				break;

			case 39:
				e.preventDefault();
				moveRight();
				break;

			case 40:
				e.preventDefault();
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
