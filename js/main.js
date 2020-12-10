'use strict';
let body = document.querySelector('body');
let fixed_padding = document.getElementsByClassName('fixed-padding');

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if(ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = ('url('+ib[i].querySelector('.ib_use').getAttribute('src')+')').replace(!'img/slide-l.jpg', '../');
		}
	}
}

ib();

/* Fixed Menu */

if (document.getElementById('nav')) {
	let nav = document.getElementById('nav');
	let hide = false;
	let prevScroll;
	let navHeight = nav.offsetHeight;

	function fixedMenu() {
		if (pageYOffset > prevScroll && pageYOffset > nav.offsetHeight) {
			if (hide == false) {
				nav.style.opacity = '0';
				hide = true;
			}
			nav.style.opacity = '0';
		}

		if (pageYOffset <= prevScroll) {
			nav.style.opacity = '1';
		}

		prevScroll = pageYOffset;
	}

	fixedMenu();

	window.addEventListener('scroll', fixedMenu);
	nav.addEventListener('mouseover', function(e) {
		nav.style.opacity = '1';
	});
}

/* Sliders */

let headerSlider = new Swiper('.header-slider__wrap', {
	autoplay: {
		disableOnInteraction: false,
	},
	pagination: {
		el: '.header-slider__pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="swiper-pagination-bullet"></span>';
		},
	},
});

let headerSliderPagination = document.getElementById('header-pagination');
headerSliderPagination.style.left = 'calc(50% - ' + (headerSliderPagination.offsetWidth / 2) + 'px)';

let reviewsSlider = new Swiper('.reviews-slider__body', {

});

/* Burger */

let burger_btn = document.getElementById('burger_btn');
let burger_link = document.querySelectorAll('.burger__link');

burger_btn.classList.remove('active');
burgBodyUnLock();

burger_btn.addEventListener('click', function(e) {
	let popupActive = document.querySelector('.popup.open');

	if (popupActive) {
		closePopup(popupActive, false);
	}

	if (burger_btn.classList.contains('active')) {
		burger_btn.classList.remove('active');
		burgBodyUnLock();
	} else {
		burger_btn.classList.add('active');
		burgBodyLock();
	}
});

for(let i = 0, length = burger_link.length; i < length; i++) {
	burger_link[i].addEventListener('click', function(e) {
		burger_btn.classList.remove('active');
		burgBodyUnLock();
	});
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixed_padding.length > 0) {
			for(let i = 0, length = fixed_padding.length; i < length; i++) {
				fixed_padding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}

document.documentElement.addEventListener('click', function(e) {
	if ((!e.target.closest('.burger') && burger_btn.classList.contains('active')) || (e.target.closest('.burger__bg') && burger_btn.classList.contains('active'))) {
		burger_btn.classList.remove('active');
		burgBodyUnLock();
	}
});