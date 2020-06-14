const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="calculator">
        <div id="viewer" class="viewer">0</div>

        <button class="ops" data-data="+" data-action="operator">+</button>

        <button class="num" data-data="1" data-action="number">1</button>
        <button class="num" data-data="3" data-action="number">3</button>

        <button class="equals ops" data-data="=" data-action="equals" id="equals">=</button>
      </div>
    </body>
  </html>
`);

global.document = jsdom.window.document;

const Calculator = require('../scriptByClass')

describe('Calculator', () => {
  it('shows “4” in viewer after clicking on “1 + 3 =”', () => {
    const calculator = new Calculator();

    document.querySelector('[data-data="1"]').click();
    document.querySelector('[data-data="+"]').click();
    document.querySelector('[data-data="3"]').click();
    document.querySelector('[data-data="="]').click();

    expect(document.getElementById('viewer').innerText).toBe('4');
  });
});
