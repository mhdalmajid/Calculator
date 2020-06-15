/* eslint-disable no-eval */
const viewer = document.getElementById('viewer')
const calculatorDOM = document.getElementById('calculator')

class Calculator {
  constructor(MainScreen) {
    this.pattern = {
      number: /[0-9]/,
      operator: /[/*+-]/,
      dot: /./,
      allowedAtStart: /[-+0-9.]/,
    }
    this.dot = '.'
    this.screen = MainScreen
    this.items = []
    this.equalPressed = false
  }

  payload(action, str) {
    if (this.getLength() === 0) if (!this.pattern.allowedAtStart.test(str)) return
    switch (action) {
      case 'number':
        this.number(str)
        break
      case 'operator':
        this.operator(str)
        break
      case 'dot':
        this.dotted()
        break
      case 'delete':
        this.delete()
        break
      case 'clear':
        this.clear()
        break
      case 'equals':
        this.equal()
        break
      default:
        break
    }
    this.update()
  }

  getLength() {
    return this.items.length
  }

  getlastIndex() {
    return this.getLength() - 1
  }

  getlastItem() {
    return this.items[this.getlastIndex()]
  }

  addItem(str) {
    this.items.push(str)
  }

  isOperatorAtTheEnd() {
    return this.pattern.operator.test(this.getlastItem())
  }

  concateLastItemWith(str) {
    this.items[this.getlastIndex()] += str.toString()
  }

  number(str) {
    if (!this.pattern.number.test(str)) return
    if (this.isOperatorAtTheEnd() || this.getLength() === 0) this.addItem(str.toString())
    else this.concateLastItemWith(str)
  }

  operator(str) {
    if (
      !this.pattern.operator.test(str) ||
      this.isOperatorAtTheEnd() ||
      (this.getlastItem() && this.getlastItem().slice(-1) === this.dot)
    )
      return

    this.addItem(str)
  }

  dotted() {
    if (this.isOperatorAtTheEnd() || this.getLength() === 0) this.addItem(`0${this.dot}`)
    else if (!this.getlastItem().toString().includes(this.dot)) this.concateLastItemWith(this.dot)
  }

  delete() {
    if (this.getLength() === 0) return
    if (this.getlastItem().length === 1) this.items.pop()
    else this.items[this.getlastIndex()] = this.getlastItem().toString().slice(0, -1)
  }

  clear() {
    this.items = []
  }

  equal() {
    this.equalPressed = true
    if (this.getLength() < 3 || this.isOperatorAtTheEnd()) return
    const computingResult = this.compute()
    this.items = []
    this.addItem(computingResult)
  }

  compute() {
    const arrayToString = this.items.join('')
    return eval(arrayToString).toString()
  }

  update() {
    console.log(this.items)

    if (this.getLength() >= 1) this.screen.innerText = this.items.join('')
    else this.screen.innerText = 0
    if (this.equalPressed) {
      this.items = []
      this.equalPressed = false
    }
  }
  /*
  calculate(str) {
    this.items = str.split(/([/*+-])/g)
    this.items = this.items.map((item) => item.trim())
    return parseFloat(this.compute())
  }
  */
}

const Calc = new Calculator(viewer)

calculatorDOM.addEventListener('click', (e) => {
  const action = e.target.getAttribute('data-action')
  const data = e.target.getAttribute('data-data')

  if (e.target.matches('button')) Calc.payload(action, data)
})

module.exports = Calculator
