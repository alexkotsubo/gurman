/* Active */

if (document.getElementById('nav')) {
	let nav = document.getElementById('nav');
	let menu = document.getElementById('nav-menu');
	let menu_txt = document.querySelectorAll('.menu__link');
	let heightV = 0;
	let widthV = 0;
	let body_height = 0;
	let scroll = [];
	let max_scroll = [];
	let prevMenu;

	function active_else() {
		heightV = document.body.clientHeight;
		widthV = document.body.clientWidth;
		body_height = document.body.scrollHeight;

		for(let i = 0, length = menu_txt.length; i < length; i++) {
			/*let class_name = menu_txt[i].className.split('');
			let blockId = '';

			for(let i = 0, length = class_name.length; i < length; i++) {
				if (class_name[i] == '_' && class_name[i + 1] == 's' && class_name[i + 2] == '-') {
					for(let index = i + 3, length = class_name.length; index < length; index++) {
						if (class_name[index] !== '' && class_name[index] !== ' ') {
							blockId = blockId + class_name[index];
						} else {
							break;
						}
					}
				}
			} */

			if (menu_txt[i].hasAttribute('date-to')) {
				scroll[i] = document.getElementById(menu_txt[i].getAttribute('date-to')).offsetTop - nav.offsetHeight;
				max_scroll[i] = document.getElementById(menu_txt[i].getAttribute('date-to')).offsetHeight + scroll[i];
			} else {
				scroll[i] = null;
				max_scroll[i] = null;
			}
		}

		for(let i = 0, length = menu_txt.length; i < length; i++) {
			if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
				if (prevMenu != undefined) {
					menu_txt[prevMenu].classList.remove('active');
				}

				if (pageYOffset <= max_scroll[i]) {
					menu_txt[i].classList.add('active');
					prevMenu = i;
				}
			} else {
				menu_txt[i].classList.remove('active');
			}
		}
	}

	active_else();

	window.addEventListener('scroll', function(e) {
		if (menu.style.display != 'none') {
			if (document.body.clientHeight == heightV && document.body.clientWidth == widthV && document.body.scrollHeight == body_height) {
				for(let i = 0, length = menu_txt.length; i < length; i++) {
					if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
						if (!(prevMenu == undefined)) {
							menu_txt[prevMenu].classList.remove('active');
						}

						if (pageYOffset <= max_scroll[i]) {
							menu_txt[i].classList.add('active');
							prevMenu = i;
						}
					} else {
						menu_txt[i].classList.remove('active');
					}
				}
			} else {
				active_else();
			}
		}
	});
}