import { CAR_MOVES_CONDITION_NUMBER } from '../constants/condition.js'
export default class Car {
  constructor(name) {
    this.name = name
    this.position = 0
  }

  processOneCycle() {
    if (this.canGo()) {
      this.go()
    }
  }
  getRandomNumber() {
    return MissionUtils.Random.pickNumberInRange(0, 9)
  }
  canGo() {
    return this.getRandomNumber() >= CAR_MOVES_CONDITION_NUMBER
  }
  go() {
    this.position++
  }
}
