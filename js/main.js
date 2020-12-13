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

let hide = false;

if (document.getElementById('nav')) {
	let nav = document.getElementById('nav');
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
	},
});

let headerSliderPagination = document.getElementById('header-pagination');
headerSliderPagination.style.left = 'calc(50% - ' + (headerSliderPagination.offsetWidth / 2) + 'px)';

let reviewsSlider = new Swiper('.reviews-slider', {
  navigation: {
    nextEl: '.reviews-slider__next',
    prevEl: '.reviews-slider__prev',
  },
	pagination: {
		el: '.review-slider__pagination',
		clickable: true,
	},/*
	autoplay: {
		disableOnInteraction: false,
	},*/
	autoHeight: true,
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

/* Smooth */

if (document.getElementById('nav')) {
	let nav = document.getElementById('nav');

	window.onload = function() {
		let anchors = document.querySelectorAll('[data-to]');

		for(let i = 0, length = anchors.length; i < length; i++) {
			anchors[i].addEventListener('click', function(e) {
				let scroll;
				let anchorDataTo = anchors[i].getAttribute('data-to');
				if (hide != undefined) {
					function scrollValue() {
						if (document.getElementById(anchorDataTo).offsetTop > pageYOffset) {
							return document.getElementById(anchorDataTo).offsetTop;
						}

						if (document.getElementById(anchors[i].getAttribute('data-to')).offsetTop <= pageYOffset) {
							return document.getElementById(anchorDataTo).offsetTop - nav.offsetHeight;
						}
					}

					scroll = scrollValue();
				} else {
					scroll = document.getElementById(anchorDataTo).offsetTop;
				}

				window.scrollTo({
					top: scroll,
					behavior: 'smooth',
				});
			});
		}
	}
}

/* Active */

let menuLinks = document.querySelectorAll('.menu__link');
let bodyHeight = 0;
let scroll = [];
let max_scroll = [];

function getScrollValues() {
	for(let i = 0, length = menuLinks.length; i < length; i++) {
		if (menuLinks[i].hasAttribute('data-to')) {
			scroll[i] = document.getElementById(menuLinks[i].getAttribute('data-to')).offsetTop/* - nav.offsetHeight*/;
			max_scroll[i] = document.getElementById(menuLinks[i].getAttribute('data-to')).offsetHeight + scroll[i];
		} else {
			scroll[i] = null;
			max_scroll[i] = null;
		}
	}
}

function getScrollPosition() {
	for(let i = 0, length = menuLinks.length; i < length; i++) {
		if (scroll[i] != null && pageYOffset >= scroll[i] && pageYOffset <= max_scroll[i]) {
			menuLinks[i].classList.add('active');
		} else {
			menuLinks[i].classList.remove('active');
		}
	}
}

getScrollValues();
getScrollPosition();

window.addEventListener('scroll', function(e) {
	if (document.body.scrollHeight == bodyHeight) {
		getScrollPosition();
	} else {
		getScrollValues();
		getScrollPosition();
	}
});