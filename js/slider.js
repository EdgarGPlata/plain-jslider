/**
	Author: Edgar G. Plata
**/

window.slider = (function () {
	'use strict';

	var slider = function(element, options) {

		element = document.querySelector(element);
		// If the element does not exist
		// Return
		if (!element) {
			return;
		}

		// Controls Element
		var leftControl = element.querySelector('.slider-left');
		var rightControl = element.querySelector('.slider-right');

		// Total Images
		var totalImages = element.querySelectorAll('img').length;

		// Slider Container
		var sliderContainer = element.querySelector('.slider-container');

		// Default slide
		var start = 0;
		var imageView = 1;

		// Options
		var o = options || {},
			animationSpeed = o.animationSpeed || 1,
			autoPlay = o.autoPlay || true,
			paginate = o.paginate || false,
			sliderSpeed = o.sliderSpeed || 5;
			
		
		// Set the speed
		sliderContainer.style.transition = "left "+animationSpeed+"s ease";
		
		
		// Slideshow moving forward
		var moveForward = true;
		
		
		
		// Executed when user resizes browser
		function onWindowResize() {
			var width = element.offsetWidth;
			start = (imageView - 1) * width;
			sliderContainer.style.left="-"+start+"px";
		}
		
		
		// Images are responsive
		// Determine when user resizes browser
		var resize;
		window.onresize = function() {
			clearTimeout(resize);
			resize = setTimeout(onWindowResize, 150);
		};
		
		
		
		function slideLeft() {
			
			//Get element width
			var width = element.offsetWidth;
			
			// Get max width
			var maxWidth = (totalImages - 1) * width;
			
			
			// If user clicks but is on last image
			if (start === maxWidth) {
				moveForward = false;
				return;
			}
			
			imageView++;
			start = start + width;
			sliderContainer.style.left="-"+start+"px";
			

			
		} // End slideLeft
		
		
		
		function slideRight() {
		
			//Get element width
			var width = element.offsetWidth;
			
			// If user clicks but is on first image
			if (start === 0) {
				moveForward = true;
				return;
			}
			
			imageView--;
			start = start - width;
			sliderContainer.style.left="-"+start+"px";
			
			
		} // End slideRight
		
		
		
		function moveSlideshow() {
			if (moveForward === true) {
				slideLeft();
			}
			if (moveForward === false) {
				slideRight();
			}
		}
		
				
		// Controls
		if (leftControl.addEventListener) {
			leftControl.addEventListener('click', slideRight);
		}
		
		if (leftControl.attachEvent) {
			leftControl.attachEvent('click', slideRight);
		}
		
		if (rightControl.addEventListener) {
			rightControl.addEventListener('click', slideLeft);
		}
		
		if (rightControl.attachEvent) {
			rightControl.attachEvent('click', slideLeft);
		}
		
		// Set slideshow speed in seconds
		sliderSpeed = sliderSpeed * 1000;
		
		
		console.log(animationSpeed);
		console.log(autoPlay);
		console.log(sliderSpeed);
		console.log(totalImages);
		if (autoPlay === true || autoPlay === 'true') {
			// Start slideshow
			setInterval(moveSlideshow, sliderSpeed);
		}
		
		
	}; // End slider function
	
	return function(element, options) {
		return slider(element, options);
	};
	
})();