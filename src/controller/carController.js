import Car from '../model/car.js'
import { $app, $carNamesInput, $racingCountInput } from '../constants/dom.js'
import {
  MIN_CAR_COUNT,
  MAX_CAR_NAME_LENGTH,
  MIN_CAR_NAME_LENGTH,
  MIN_RACING_COUNT,
} from '../constants/condition.js'

export default class CarController {
  constructor(view) {
    this.view = view
    this.cars
    this.init()
  }
  initCars() {
    this.cars = []
  }
  init() {
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
      this.view.showErrorAlert(type)
      return
    }
    this.cars = carNames.map(carName => new Car(carName))
    this.view.switchingForm()
  }
  handleSubmitRacingCount() {
    const racingCount = $racingCountInput.value.trim()
    if (!this.isValidRacingCount(racingCount)) {
      this.view.showErrorAlert('invalidRaceCount')
      return
    }
    this.view.hideRacingCountForm()
    this.play(racingCount)
    this.view.createRestartButton()
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

  isValidRacingCount(racingCount) {
    return MIN_RACING_COUNT <= parseInt(racingCount, 10)
  }

  play(racingCount) {
    for (let i = 0; i < parseInt(racingCount, 10); i++) {
      this.cars.forEach(car => car.processOneCycle())
      this.view.printResult(this.cars)
    }
    this.view.printWinnersName(this.getWinnersName())
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
}
