/* eslint-disable no-console */
const Benchmark = require('benchmark')
const _ = require('lodash')
const fp = require('lodash/fp')
const R = require('ramda')
const chalk = require('chalk')
const { DateTime } = require('luxon')

// @see {@link https://github.com/lodash/lodash/blob/npm/_createFlow.js}
const data = R.range(0, 10000).map(function(i) {
  return {
    counter: i,
  }
})

function onStart() {
  console.log(chalk.blue(`#${this.name}`))
}

function onComplete() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
  // todo compare to native
}

function onCycle(event) {
  console.log(String(event.target))
}

// add listeners
function listen(suite) {
  return suite
    .on('cycle', onCycle)
    .on('start', onStart)
    .on('complete', onComplete)
    .on('error', function(event) {
      const errors = fp.find(
        fp.complement(fp.isNil),
        fp.map(fp.prop('error'), event.currentTarget),
      )
      throw new Error(errors)
    })
}

const suiteForEach = new Benchmark.Suite('map')
suiteForEach
  .add('Native Map', function() {
    var result = data.map(d => d.counter)
  })
  .add('Ramda Map', function() {
    var result = R.map(R.prop('counter'), data)
  })
  .add('Ramda curry map', function() {
    var result = R.map(R.prop('counter'))(data)
  })
  .add('Lodash Map', function() {
    var result = _.map(data, _.property('counter'))
  })
  .add('Lodash FP Map', function() {
    var result = fp.map(_.property('counter'))(data)
  })

// https://jsperf.com/ramda-prop
const suiteProp = new Benchmark.Suite('prop')
suiteProp
  .add('Native Prop', function() {
    var result = data[0].counter
  })
  .add('Ramda curry Prop', function() {
    var result = R.prop('counter')(data)
  })
  .add('Ramda composed Prop', function() {
    var result = R.prop('counter', data[0])
  })
  .add('Lodash FP Prop', function() {
    var result = fp.prop('counter')(data)
  })
  .add('Lodash Prop', function() {
    var result = _.property('counter', data[0])
  })

function isOdd(num) {
  return num % 2 === 1
}

function square(num) {
  return num * num
}

function lessThanThreeDigits(num) {
  return num.toString().length < 3
}

// https://jsperf.com/ramda-vs-others-1
const suiteComplex = new Benchmark.Suite('complex')
suiteComplex
  .add('Native', function() {
    var r = data
      .map(d => d.counter)
      .filter(isOdd)
      .map(square)
      .filter(lessThanThreeDigits)
  })
  .add('Ramda without reliance on currying', function() {
    var result = R.filter(
      lessThanThreeDigits,
      R.map(square, R.filter(isOdd, R.pluck('counter', data))),
    )
  })
  .add('Ramda with currying and composition', function() {
    var result = R.pipe(
      R.pluck('counter'),
      R.filter(isOdd),
      R.map(square),
      R.filter(lessThanThreeDigits),
    )(data)
  })
  .add('Ramda without reliance on currying', function() {
    var result = R.filter(
      lessThanThreeDigits,
      R.map(square, R.filter(isOdd, data.map(d => d.property))),
    )
  })
  .add('Lodash chain', function() {
    var result = _.chain(data)
      .map(d => d.counter)
      .filter(isOdd)
      .map(square)
      .filter(lessThanThreeDigits)
      .value()
  })
  .add('Lodash', function() {
    var result = _.filter(
      _.map(_.filter(_.map(data, _.property('counter')), isOdd), square),
      lessThanThreeDigits,
    )
  })
  .add('Lodash FP', function() {
    var result = fp.filter(
      lessThanThreeDigits,
      fp.map(square, fp.filter(isOdd, fp.map(fp.prop('counter'), data))),
    )
  })

const timeInput = R.times(
  () => ({ start_time: '2018-11-19T20:20:49.502Z' }),
  1e2,
)

var startOfDay
var getTactsRelativeToToday

const suiteComparingTime = new Benchmark.Suite('Comparing time')
suiteComparingTime
  .add('Native', function() {
    timeInput.filter(
      t =>
        DateTime.fromISO(t.start_time).startOf('day') <
        DateTime.local().startOf('day'),
    )
  })
  .add('Ramda FP', function() {
    var startOfDay = dateTime => DateTime.fromISO(dateTime).startOf('day')
    //? sutie scoped functions?
    var getTactsRelativeToToday = comparefn => {
      return R.filter(
        R.compose(
          comparefn(R.__, startOfDay(DateTime.local())),
          startOfDay,
          R.prop('start_time'),
        ),
        timeInput,
      )
    }
    getTactsRelativeToToday(R.lt)
  })
  .add('Lodash FP', function() {
    startOfDay = dateTime => DateTime.fromISO(dateTime).startOf('day')
    //? sutie scoped functions?
    getTactsRelativeToToday = comparefn => {
      return fp.filter(
        fp.compose(
          comparefn(fp.__, startOfDay(DateTime.local())),
          startOfDay,
          fp.prop('start_time'),
        ),
        timeInput,
      )
    }
    getTactsRelativeToToday(fp.lt)
  })
  .add('Lodash precomposed FP', function() {
    getTactsRelativeToToday(fp.lt)
  })

// #significant
const numbers = R.range(1, 1000)
const suiteSquaring = new Benchmark.Suite('square')
suiteSquaring
  .add('Native', function() {
    const result = numbers.map(num => num * num)
  })
  .add('Ramda FP', function() {
    const squareAll = R.map(num => num * num)
    squareAll(numbers)
  })
  .add('Lodash FP', function() {
    const squareAll = fp.map(num => num * num)
    squareAll(numbers)
  })

const addOne = n => n++
const suiteAdd5 = new Benchmark.Suite('composing')
suiteAdd5
  .add('Ramda FP - compose', function() {
    const add5 = R.compose(
      addOne,
      addOne,
      addOne,
      addOne,
      addOne,
    )
    add5(1)
  })
  .add('Ramda FP - pipe', function() {
    const add5 = R.pipe(
      addOne,
      addOne,
      addOne,
      addOne,
      addOne,
    )
    add5(1)
  })
  .add('Lodash FP - compose', function() {
    const add5 = fp.compose(
      addOne,
      addOne,
      addOne,
      addOne,
      addOne,
    )
    add5(1)
  })
  .add('Lodash FP - pipe', function() {
    const add5 = fp.pipe(
      addOne,
      addOne,
      addOne,
      addOne,
      addOne,
    )
    add5(1)
  })

// run benchmarks
// listen(suiteForEach).run()
// listen(suiteProp).run()
// listen(suiteComplex).run()
// listen(suiteComparingTime).run()
// listen(suiteSquaring).run()
listen(suiteAdd5).run()
