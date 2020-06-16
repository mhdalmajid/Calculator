/* eslint-disable max-classes-per-file */
/* eslint-disable no-eval */
const viewer = document.getElementById('viewer')
const calculatorDOM = document.getElementById('calculator')
class Operators {
  constructor() {
    this.runOperator = {
      '+': this.plus,
      '-': this.minus,
      '/': this.divide,
      '*': this.multiply,
    }
  }

  plus(num1, num2) {
    return num1 + num2
  }

  minus(num1, num2) {
    return num1 - num2
  }

  divide(num1, num2) {
    return num1 / num2
  }

  multiply(num1, num2) {
    return num1 * num2
  }
}
class Calculator extends Operators {
  constructor(MainScreen) {
    super()
    this.pattern = {
      number: /[0-9]/,
      operator: /[/*+-]/,
      dot: /./,
      allowedAtStart: /[-+0-9.]/,
      operatorAllowedAtStart: /[-+]/,
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
    if (this.equalPressed) {
      this.items = []
      this.equalPressed = false
    }
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
    this.equalPressed = false
  }

  dotted() {
    if (this.equalPressed) {
      this.items = []
      this.equalPressed = false
    }
    if (this.isOperatorAtTheEnd() || this.getLength() === 0) this.addItem(`0${this.dot}`)
    else if (!this.getlastItem().toString().includes(this.dot)) this.concateLastItemWith(this.dot)
  }

  delete() {
    if (this.getLength() === 0) return
    if (this.getlastItem().length === 1) this.items.pop()
    else this.items[this.getlastIndex()] = this.getlastItem().toString().slice(0, -1)
    this.equalPressed = false
  }

  clear() {
    this.items = []
    this.equalPressed = false
  }

  equal() {
    this.equalPressed = true
    if (this.getLength() < 3 || this.isOperatorAtTheEnd()) return
    const computingResult = this.compute()
    this.items = []
    if (computingResult[0] !== '-') return this.addItem(computingResult)
    this.addItem('-')
    this.addItem(computingResult.slice(1))
  }

  arrayOfnubmersAndOperators(array) {
    let arr = array
    if (this.pattern.operatorAllowedAtStart.test(arr[0])) {
      const combined = parseFloat(arr[0] + arr[1])
      arr = [combined, ...arr.slice(2)]
    }
    const newArray = arr.map((item) => parseFloat(item) || item)
    return newArray
  }

  computeByPriority(array) {
    let items = array
    let prev
    let next
    let temp
    while (items.length !== 1) {
      const indexOfMultiple = items.indexOf('*')
      const indexOfDivide = items.indexOf('/')
      if (items.length < 4) {
        return this.calculateIfthreeItems(items)
      }
      if (items.includes('*')) {
        prev = items.slice(indexOfMultiple - 1, indexOfMultiple)
        next = items.slice(indexOfMultiple + 1, indexOfMultiple + 2)
        temp = this.runOperator['*'](prev, next)
        items.splice(indexOfMultiple - 1, 3, temp)
      } else if (items.includes('/')) {
        prev = items.slice(indexOfDivide - 1, indexOfDivide)
        next = items.slice(indexOfDivide + 1, indexOfDivide + 2)
        temp = this.runOperator['/'](prev, next)
        items.splice(indexOfDivide - 1, 3, temp)
      } else {
        items = [this.runOperator[items[1]](items[0], items[2]), ...items.slice(3)]
      }
    }
    return items
  }

  calculateIfthreeItems(array) {
    return [this.runOperator[array[1]](array[0], array[2])]
  }

  compute() {
    let items = this.arrayOfnubmersAndOperators(this.items)
    let prev
    let next
    let temp
    if (items.length < 4) {
      return this.calculateIfthreeItems(items)
    }
    items = this.computeByPriority(items)

    return items
  }

  update() {
    if (this.getLength() >= 1) this.screen.innerText = this.items.join('')
    else this.screen.innerText = 0
  }
}

const Calc = new Calculator(viewer)

calculatorDOM.addEventListener('click', (e) => {
  const action = e.target.getAttribute('data-action')
  const data = e.target.getAttribute('data-data')

  if (e.target.matches('button')) Calc.payload(action, data)
})

module.exports = Calculator
