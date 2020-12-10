/* Smooth */

if (document.getElementById('nav')) {
	let nav = document.getElementById('nav');

	window.onload = function() {
		let anchors = document.querySelectorAll('._scroll-to');

		for(let i = 0, length = anchors.length; i < length; i++) {
			if (anchors[i].hasAttribute('data-to')) {
				anchors[i].addEventListener('click', function(e) {
					let scroll;
					if (hide != undefined) {
						function scrollValue() {
							if (document.getElementById(anchors[i].getAttribute('data-to')).offsetTop > pageYOffset) {
								return document.getElementById(anchors[i].getAttribute('data-to')).offsetTop;
							}

							if (document.getElementById(anchors[i].getAttribute('data-to')).offsetTop <= pageYOffset) {
								return document.getElementById(anchors[i].getAttribute('data-to')).offsetTop - nav.offsetHeight;
							}
						}

						scroll = scrollValue();
					} else {
						scroll = document.getElementById(anchors[i].getAttribute('data-to')).offsetTop;
					}

					window.scrollTo({
						top: scroll,
						behavior: 'smooth',
					});
				});
			}
		}
	}
}