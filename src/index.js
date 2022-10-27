import { $app } from './constants/dom.js'

import View from './view/view.js'
import CarController from './controller/carController.js'

class RacingGame {
  constructor() {
    this.view = new View()
    this.carController = new CarController(this.view)
    this.initGame()
    this.initEventListeners()
  }

  initGame() {
    this.view.init()
    this.carController.initCars()
  }
  initEventListeners() {
    $app.addEventListener('click', e => {
      if (e.target.id === 'restart-button') {
        this.initGame()
      }
    })
  }
}

new RacingGame()
