class BookingForm {
	constructor(formSelector, popupSelector, phoneSelector) {
		this.form = document.querySelector(formSelector)
		this.popup = document.querySelector(popupSelector)
		this.closeBtn = this.popup?.querySelector('.popup__close')
		this.overlay = this.popup?.querySelector('.popup__overlay')
		this.phoneInput = document.querySelector(phoneSelector)

		if (this.phoneInput) {
			Inputmask({
				mask: '+7 (999) 999-99-99',
				showMaskOnHover: false,
				showMaskOnFocus: true,
				clearIncomplete: true
			}).mask(this.phoneInput)
		}

		this.initEvents()
	}

	initEvents() {
		if (this.form) {
			this.form.addEventListener('submit', e => this.handleSubmit(e))
		}

		if (this.closeBtn) {
			this.closeBtn.addEventListener('click', () => this.closePopup())
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', () => this.closePopup())
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		let valid = true
		const inputs = this.form.querySelectorAll('.form__input')

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
				if (!this.phoneInput.inputmask.isComplete()) {
					input.classList.add('error')
					valid = false
				}
			}
		})

		if (!valid) return

		setTimeout(() => {
			this.openPopup()
			this.form.reset()
		}, 400)
	}

	openPopup() {
		this.popup.classList.add('active')
		document.body.classList.add('no-scroll')
	}

	closePopup() {
		this.popup.classList.remove('active')
		document.body.classList.remove('no-scroll')
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new BookingForm('.form', '#successPopup', '#phone')
})
