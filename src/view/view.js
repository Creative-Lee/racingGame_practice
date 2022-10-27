import {
  $app,
  $carNamesInput,
  $carNamesSubmitButton,
  $racingCountInput,
  $racingCountSubmitButton,
  $racingResult,
  $racingWinners,
} from '../constants/dom.js'

import { ERR_MSG } from '../constants/message.js'
import { disableDOM, ableDOM } from '../utils/dom.js'

export default class View {
  init() {
    $carNamesInput.value = ''
    $racingCountInput.value = ''
    $racingResult.innerText = '📄 실행 결과'
    $racingWinners.innerText = ''
    this.removeRestartButton()
    ableDOM($carNamesInput)
    ableDOM($carNamesSubmitButton)
    disableDOM($racingCountInput)
    disableDOM($racingCountSubmitButton)
  }

  showErrorAlert(type) {
    alert(ERR_MSG[type])
  }
  getResultTemplate(cars) {
    return `	
		<br>	
		<div>
			${cars.map(car => `<div>${car.name}: ${'-'.repeat(car.position)}</div>`).join('')}
		</div>		
		`
  }
  printResult(cars) {
    $racingResult.insertAdjacentHTML('beforeend', this.getResultTemplate(cars))
  }
  printWinnersName(winnersName) {
    $racingWinners.innerText = winnersName
  }

  switchingForm() {
    disableDOM($carNamesInput)
    disableDOM($carNamesSubmitButton)
    ableDOM($racingCountInput)
    ableDOM($racingCountSubmitButton)
  }
  hideRacingCountForm() {
    disableDOM($racingCountInput)
    disableDOM($racingCountSubmitButton)
  }
  createRestartButton() {
    let button = document.createElement('button')
    button.id = 'restart-button'
    button.innerText = '재시작'
    $app.appendChild(button)
  }
  removeRestartButton() {
    if ($app.lastChild.id === 'restart-button') {
      $app.removeChild($app.lastChild)
    }
  }
}
