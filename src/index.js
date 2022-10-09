import { $app, $carNamesInput, $carNamesSubmitButton } from './constants/dom.js'
import { MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH } from './constants/condition.js'
import { CAR_NAME_ERROR } from './constants/message.js'
import { disableDOM } from './utils/dom.js'
import Car from './car.js'

class RacingGame {
	constructor() {
		this.initEventListeners()
		this.cars
	}

	initEventListeners() {
		$app.addEventListener('click', e => {
			e.preventDefault()
			if (e.target.id === 'car-names-submit') {
				this.handleSubmitCarNames()
			}
		})
	}

	handleSubmitCarNames() {
		const carNames = $carNamesInput.value.trim().split(',')
		if (!this.isValidCarNames(carNames)) {
			alert(CAR_NAME_ERROR)
			return
		}
		this.cars = carNames.map(carName => new Car(carName))

		disableDOM($carNamesInput)
		disableDOM($carNamesSubmitButton)
	}
	isValidCarNames(carNames) {
		return carNames.every(
			carName => MIN_CAR_NAME_LENGTH <= carName.length && carName.length <= MAX_CAR_NAME_LENGTH
		)
	}
}

new RacingGame()
