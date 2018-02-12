const assert = require('assert')
const btcToUsd = require('./')

const knownData = new Map([
  ['2014-05-07', 10.4267],
  ['2014-12-02', 3.6045],
  ['2015-06-22', 3.0250],
  ['2015-11-20', 3.1258],
  ['2016-06-16', 5.4569],
  ['2016-11-28', 3.8911],
  ['2017-05-31', 24.7955],
  ['2017-07-04', 50.9485],
  ['2017-12-14', 290.2630],
  ['2017-12-29', 247.9270]
])

for (const [date, expected] of knownData) {
  assert.strictEqual(btcToUsd.lookup(date), expected)
}
