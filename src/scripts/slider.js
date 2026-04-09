const swiper = new Swiper('.gallery-slider', {
	loop: false,
	spaceBetween: 24,

	slidesPerView: 3,

	breakpoints: {
		0: {
			slidesPerView: 1
		},

		768: {
			slidesPerView: 2
		},

		1024: {
			slidesPerView: 3
		}
	},

	navigation: {
		nextEl: '.gallery-next',
		prevEl: '.gallery-prev'
	},

	pagination: {
		el: '.gallery-pagination',
		clickable: true
	}
})