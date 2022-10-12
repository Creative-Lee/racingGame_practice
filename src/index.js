import { $app, $carNamesInput, $carNamesSubmitButton, $racingCountInput, $racingCountSubmitButton } from './constants/dom.js'
import { MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH, MIN_RACING_COUNT } from './constants/condition.js'
import { CAR_NAME_ERROR, CAR_RACE_COUNT_ERROR } from './constants/message.js'
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
			if (e.target.id === 'racing-count-submit') {
				this.handleSubmitRacingCount()
			}
		})
	}

	handleSubmitCarNames() {
		const carNames = $carNamesInput.value.trim().split(',')
		if (!this.isValidCarNames(carNames)) {
			alert(CAR_NAME_ERROR)
			return
		}
		disableDOM($carNamesInput)
		disableDOM($carNamesSubmitButton)

		this.cars = carNames.map(carName => new Car(carName))
	}
	handleSubmitRacingCount() {
		const racingCount = $racingCountInput.value.trim()
		if (!this.isValidRacingCount(racingCount)) {
			alert(CAR_RACE_COUNT_ERROR)
			return
		}
		disableDOM($racingCountInput)
		disableDOM($racingCountSubmitButton)
	}
	isValidCarNames(carNames) {
		return carNames.every(carName => MIN_CAR_NAME_LENGTH <= carName.length && carName.length <= MAX_CAR_NAME_LENGTH)
	}
	isValidRacingCount(racingCount) {
		return MIN_RACING_COUNT <= parseInt(racingCount, 10)
	}
}

new RacingGame()
