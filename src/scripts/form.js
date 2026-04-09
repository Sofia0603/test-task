const form = document.querySelector('.form')
const popup = document.getElementById('successPopup')
const closeBtn = document.querySelector('.popup__close')
const overlay = document.querySelector('.popup__overlay')
const phoneInput = document.querySelector('#phone')

function openPopup() {
	popup.classList.add('active')
	document.body.classList.add('no-scroll')
}

function closePopup() {
	popup.classList.remove('active')
	document.body.classList.remove('no-scroll')
}

if (phoneInput) {
	Inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false,
		showMaskOnFocus: true,
		clearIncomplete: true
	}).mask(phoneInput)
}

if (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault()

		let valid = true
		const inputs = form.querySelectorAll('.form__input')

		inputs.forEach(input => {
			input.classList.remove('error')

			if (!input.value.trim()) {
				input.classList.add('error')
				valid = false
			}

			if (input.type === 'email') {
				const emailPattern = /^\S+@\S+\.\S+$/
				if (!emailPattern.test(input.value)) {
					input.classList.add('error')
					valid = false
				}
			}

			if (input.name === 'phone') {
				if (!phoneInput.inputmask.isComplete()) {
					input.classList.add('error')
					valid = false
				}
			}
		})

		if (!valid) return

		setTimeout(() => {
			openPopup()
			form.reset()
		}, 400)
	})
}

if (closeBtn) {
	closeBtn.addEventListener('click', closePopup)
}

if (overlay) {
	overlay.addEventListener('click', closePopup)
}
