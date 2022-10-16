import {
  $app,
  $carNamesInput,
  $carNamesSubmitButton,
  $racingCountInput,
  $racingCountSubmitButton,
  $racingResult,
  $racingWinners,
} from './constants/dom.js'
import {
  MIN_CAR_NAME_LENGTH,
  MAX_CAR_NAME_LENGTH,
  MIN_RACING_COUNT,
  MIN_CAR_COUNT,
} from './constants/condition.js'
import { ERR_MSG } from './constants/message.js'
import { disableDOM, ableDOM } from './utils/dom.js'
import Car from './car.js'

class RacingGame {
  constructor() {
    this.initGame()
    this.initEventListeners()
  }

  initGame() {
    $carNamesInput.value = ''
    $racingCountInput.value = ''
    $racingResult.innerText = '📄 실행 결과'
    $racingWinners.innerText = ''

    ableDOM($carNamesInput)
    ableDOM($carNamesSubmitButton)
    disableDOM($racingCountInput)
    disableDOM($racingCountSubmitButton)
    this.cars = []
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
    const { isValid, type } = this.isValidCarNames(carNames)
    if (!isValid) {
      this.showErrorAlert(type)
      return
    }

    disableDOM($carNamesInput)
    disableDOM($carNamesSubmitButton)
    ableDOM($racingCountInput)
    ableDOM($racingCountSubmitButton)

    this.cars = carNames.map(carName => new Car(carName))
  }
  handleSubmitRacingCount() {
    const racingCount = $racingCountInput.value.trim()
    if (!this.isValidRacingCount(racingCount)) {
      this.showErrorAlert('invalidRaceCount')
      return
    }
    disableDOM($racingCountInput)
    disableDOM($racingCountSubmitButton)
    this.play(racingCount)
  }
  isValidCarNames(carNames) {
    if (!this.isValidCarCount(carNames)) {
      return { isValid: false, type: 'invalidCarCount' }
    }
    if (!this.isValidCarNameLength(carNames)) {
      return { isValid: false, type: 'invalidCarNameLength' }
    }
    if (!this.isUniqueCarName(carNames)) {
      return { isValid: false, type: 'repeatedCarName' }
    }
    return { isValid: true }
  }
  isValidCarCount(carNames) {
    return carNames.length >= MIN_CAR_COUNT
  }
  isValidCarNameLength(carNames) {
    return carNames.every(
      carName => MIN_CAR_NAME_LENGTH <= carName.length && carName.length <= MAX_CAR_NAME_LENGTH
    )
  }
  isUniqueCarName(carNames) {
    let carNameSet = new Set(carNames)
    return carNameSet.size === carNames.length
  }
  showErrorAlert(type) {
    alert(ERR_MSG[type])
  }

  isValidRacingCount(racingCount) {
    return MIN_RACING_COUNT <= parseInt(racingCount, 10)
  }
  getResultTemplate(cars) {
    return `	
		<br>	
		<div>
			${cars.map(car => `<div>${car.name}: ${'-'.repeat(car.position)}</div>`).join('')}
		</div>		
		`
  }
  printResult() {
    $racingResult.insertAdjacentHTML('beforeend', this.getResultTemplate(this.cars))
  }
  getWinnersName() {
    const maxPosition = Math.max(...this.cars.map(car => car.position))
    let winners = []
    this.cars.forEach(car => {
      if (car.position === maxPosition) {
        winners.push(car.name)
      }
    })

    return winners.join(',')
  }
  printWinnersName() {
    $racingWinners.innerText = this.getWinnersName()
  }
  play(racingCount) {
    for (let i = 0; i < parseInt(racingCount, 10); i++) {
      this.cars.forEach(car => car.processOneCycle())
      this.printResult()
    }
    this.printWinnersName()
  }
}

new RacingGame()
