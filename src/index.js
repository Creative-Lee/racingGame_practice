import { $app, $carNamesInput } from './constants/dom.js'
import { MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH } from './constants/condition.js'
import { CAR_NAME_ERROR } from './constants/message.js'
class RacingGame {
	constructor() {
		this.initEventListeners()
	}

	initEventListeners() {
		$app.addEventListener('click', e => {
			if (e.target.id === 'car-names-submit') {
				e.preventDefault()
				const carNames = $carNamesInput.value.trim().split(',')
				if (!this.isValidCarNames(carNames)) {
					alert(CAR_NAME_ERROR)
					return
				}
			}
		})
	}

	isValidCarNames(carNames) {
		return carNames.every(
			carName => MIN_CAR_NAME_LENGTH <= carName.length && carName.length <= MAX_CAR_NAME_LENGTH
		)
	}
}

new RacingGame()
