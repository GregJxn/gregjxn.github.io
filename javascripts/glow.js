// ***
// *** Glow v1.0 - background color cycler
// *** by Greg Jackson www.gregjxn.com (C) 2013
// *** assign the class "glow_me" to any elements that you want to colorize 
// *** requires: jQuery
// ***

$(document).ready(function(){
// $(window).load(function() {

	(function ($) {

		var intrnd = function (maxint) {
			return Math.floor(Math.random()*(maxint+1));
		}

		var get_rnd  = function() {
			return 64+intrnd(128);
			// return Math.floor(Math.random()*256);
		}

		var set_aglow = function() {
			color = 'rgb('+currentRGB[0]+',' + currentRGB[1]+',' + currentRGB[2] +')';
			$('.glow_me').css('background', color);
		}

		var	currentRGB = new Array(get_rnd(),get_rnd(),get_rnd());
		var targetRGB  = new Array(get_rnd(),get_rnd(),get_rnd());

		set_aglow();

		var	glow_looper = function() {
			// update Glow values
			for (var i = 0; i < currentRGB.length; i++) {
				if(currentRGB[i] == targetRGB[i]) {
					targetRGB[i] = get_rnd(); // set a new target value
				} else {
					// move the currrent one step closer to target
					if(currentRGB[i] > targetRGB[i]) {
						currentRGB[i]--;
					} else {
						currentRGB[i]++;
					}
				}
			}

			// update the bgcolor 
			set_aglow();
			
			setTimeout(glow_looper, 120);
		};

		glow_looper();

	})(jQuery);
});