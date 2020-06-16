/* eslint-disable no-undef */
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
    <div id="calculator" class="calculator">
      <!-- <div id="subViewer" class="viewer">0</div> -->
      <div id="viewer" class="viewer">0</div>

      <button class="num" data-data="7" data-action="number">7</button>
      <button class="num" data-data="8" data-action="number">8</button>
      <button class="num" data-data="9" data-action="number">9</button>

      <button class="ops" data-data="/" data-action="operator">/</button>
      <button class="num" data-data="4" data-action="number">4</button>
      <button class="num" data-data="5" data-action="number">5</button>
      <button class="num" data-data="6" data-action="number" data-action="">6</button>
      <button class="ops" data-data="+" data-action="operator">+</button>

      <button class="num" data-data="1" data-action="number">1</button>
      <button class="num" data-data="2" data-action="number">2</button>
      <button class="num" data-data="3" data-action="number">3</button>
      <button class="ops" data-data="-" data-action="operator">-</button>

      <button class="num" data-data="0" data-action="number" id="num_0">0</button>
      <button class="num dot" data-data="." data-action="dot">.</button>
      <button class="ops multiple" data-data="*" data-action="operator">*</button>
      <button class="equals ops" data-data="=" data-action="equals" id="equals">=</button>
      <button class="ops" data-data="del" data-action="delete" id="del">DEL</button>
      <button class="clear ops" data-data="clear" data-action="clear" id="clear">C</button>
    </div>
    </body>
  </html>
`)

global.document = jsdom.window.document
const Calculator = require('../scriptByClass')

global.viewer = document.querySelector('#viewer')
const calculator = new Calculator(viewer)

global.btn = (num) => document.querySelector(`[data-data="${num}"]`)

global.plus = document.querySelector('[data-data="+"]')
global.minus = document.querySelector('[data-data="-"]')
global.multiply = document.querySelector('[data-data="*"]')
global.divide = document.querySelector('[data-data="/"]')

global.dotBtn = document.querySelector('[data-data="."]')
global.deleteBtn = document.querySelector('[data-data="del"]')
global.clearBtn = document.querySelector('[data-data="clear"]')

global.equalBtn = document.querySelector('[data-data="="]')

describe('Plus', () => {
  it('shows “2” in viewer after clicking on “1 + 1 =”', () => {
    btn(1).click()
    plus.click()
    btn(1).click()
    equalBtn.click()

    expect(document.getElementById('viewer').innerText).toBe('2')
  })

  it('shows “13.5” in viewer after clicking on “5.6 + 7.9 =”', () => {
    btn(5).click()
    dotBtn.click()
    btn(6).click()
    plus.click()
    btn(7).click()
    dotBtn.click()
    btn(9).click()
    equalBtn.click()

    expect(document.getElementById('viewer').innerText).toBe('13.5')
  })
})
