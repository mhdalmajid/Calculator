/* eslint-disable no-eval */
const viewer = document.getElementById('viewer')
const calculatorDOM = document.getElementById('calculator')

class Calculator {
  constructor(MainScreen) {
    this.pattern = {
      number: /[0-9]/,
      operator: /[/*+-]/,
      dot: /./,
      operatorAllowedAtStart: /[-+]/,
    }
    this.dot = '.'
    this.screen = MainScreen
    this.items = []
    this.isOperatorAtTheEnd = false
    this.isFirstIsResult = false
  }

  filterInput(str, dataType) {
    if (dataType === 'number') return this.pattern.number.test(str)
    if (dataType === 'operator') return this.pattern.operator.test(str)
    if (dataType === 'dot') return this.pattern.dot.test(str)
  }

  payload(action, data) {
    switch (action) {
      case 'number':
        this.number(data)
        break
      case 'operator':
        this.operator(data)
        break
      case 'dot':
        this.dotted(data)
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

  number(str) {
    if (!this.filterInput(str, 'number')) return
    if (this.isFirstIsResult && !this.isOperatorAtTheEnd) {
      this.isFirstIsResult = false
      this.items = []
    }
    if (this.isOperatorAtTheEnd || this.items.length === 0) this.items.push(str.toString())
    else this.items[this.items.length - 1] += str.toString()
    this.isOperatorAtTheEnd = false
  }

  operator(str) {
    const { length } = this.items
    if (!this.filterInput(str, 'operator') || this.isOperatorAtTheEnd) return
    if (length === 0 && !this.pattern.operatorAllowedAtStart.test(str)) return
    if (this.items[length - 1] !== undefined && this.items[length - 1].slice(-1) === this.dot)
      return
    this.items.push(str)
    this.isOperatorAtTheEnd = true
    this.isFirstIsResult = false
  }

  dotted() {
    if (this.isOperatorAtTheEnd || this.items.length === 0) return this.items.push(`0${this.dot}`)
    if (!this.items[this.items.length - 1].toString().includes(this.dot))
      this.items[this.items.length - 1] += this.dot.toString()
    this.isOperatorAtTheEnd = false
  }

  delete() {
    if (this.items.length === 0) return
    const lastIndex = this.items.length - 1
    if (this.items[lastIndex].length <= 1) this.items.pop()
    else this.items[lastIndex] = this.items[lastIndex].toString().slice(0, -1)

    if (this.pattern.operator.test(this.items[lastIndex])) this.isOperatorAtTheEnd = true
    else this.isOperatorAtTheEnd = false
  }

  clear() {
    this.items = []
    this.isFirstIsResult = false
    this.isOperatorAtTheEnd = false
  }

  equal() {
    if (this.items.length < 3 || this.isOperatorAtTheEnd) return
    const computingResult = this.compute()
    this.items = []
    this.items.push(computingResult)
    this.isFirstIsResult = true
    this.isOperatorAtTheEnd = false
  }

  compute() {
    const arrayToString = this.items.join('')
    return eval(arrayToString).toString()
  }

  update() {
    if (this.items.length === 0) this.screen.innerText = 0
    else this.screen.innerText = this.items.join('')
  }

  calculate(str) {
    this.items = str.split(/([/*+-])/g)
    this.items = this.items.map((item) => item.trim())
    return parseFloat(this.compute())
  }
}

const Calc = new Calculator(viewer)

calculatorDOM.addEventListener('click', (e) => {
  const action = e.target.getAttribute('data-action')
  const data = e.target.getAttribute('data-data')

  if (e.target.matches('button')) Calc.payload(action, data)
})

// const str = '74 * 654 - 5896/6541 + 985.5 + 6 * 9'

// console.log(Calc.calculate(str))

module.exports = Calculator
