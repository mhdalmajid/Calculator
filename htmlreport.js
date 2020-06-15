const Jasmine = require('jasmine')
const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter
const path = require('path')

const jasmine = new Jasmine()

jasmine.loadConfigFile('./spec/support/jasmine.json')

// options object
jasmine.addReporter(
  new HtmlReporter({
    path: path.join(__dirname, 'results'),
  })
)

jasmine.execute()
