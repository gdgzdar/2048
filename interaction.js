function newGame() {
	alert("newGame button clicked");
}

function move(direction) {

	//alert(direction); //for testing

	/ directions: left = 37, up = 38, right = 39, down = 40 /

}

$(function(){
	$('html').keydown(function(e) {
		move(e.which);
	});
});



$(function hammerListener() {
	var options = {
  		touchAction: "pan-x"
	};
	var mc = new Hammer(document.getElementById('game'), options);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL});

	mc.on("swipeleft", function(ev) {
		alert("left swipe detected");
	});

	mc.on("swiperight", function(ev) {
		alert("right swipe detected");
	});	

	mc.on("swipeup", function(ev) {
		alert("up swipe detected");
	});	

	mc.on("swipedown", function(ev) {
		alert("down swipe detected");
	});	

});