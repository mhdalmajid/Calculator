/* eslint-disable no-return-assign */
/* eslint-disable no-eval */
const ops = ['-', '+', '*', '/']
let store = []
let DomValue = () => store[store.length - 1] || 0

const buttons = document.querySelectorAll('button')
const viewer = document.getElementById('viewer')

const getValue = (element) => element.getAttribute('data-num')
const isOperator = (str) => ops.find((op) => op === str) || false
const isNumber = (str) => /^\+?[0-9][\d]*$/.test(str)

const isEqual = (str) => str === '='
const isClear = (str) => str === 'c'
const isDot = (str) => str === '.'

const getResult = () => eval(store.reduce((acc, item) => acc + item, ''))
const addItem = (item) => store.push(item)
const updateMathDom = () => store.reduce((acc, item) => acc + item, '')
const updateDom = () => (viewer.innerText = DomValue())

const update = (value) => {
  let storeLength = store.length

  if (isClear(value)) return (store.length = 0)
  if (isOperator(value))
    if (storeLength === 1) return addItem(value)
    else return

  if (isDot(value))
    if (storeLength === 1 || storeLength === 3)
      store[storeLength - 1] = `${store[storeLength - 1]}.`
    else return

  if (isEqual(value))
    if (storeLength >= 3) {
      let result = getResult()
      store.length = 0
      addItem(result)
      return
    } else return

  if (isNumber(value))
    if (isNumber(store[storeLength - 1])) store[storeLength - 1] += value
    else addItem(value)
}

const listener = (e) => {
  let value = getValue(e.target)

  update(value)
  updateDom()
  updateMathDom()
  console.log(store)
}

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i]
  button.addEventListener('click', listener)
}
