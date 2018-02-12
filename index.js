const fs = require('fs')
const path = require('path')

const getDayOfYear = require('date-fns/get_day_of_year')
const getYear = require('date-fns/get_year')

const cache = new Map()

function loadFile (name) {
  if (!cache.has(name)) {
    const raw = fs.readFileSync(path.join(__dirname, `data/${name}`))
    const count = (raw.byteLength / Float64Array.BYTES_PER_ELEMENT) | 0

    cache.set(name, new Float64Array(raw.buffer, raw.byteOffset, count))
  }

  return cache.get(name)
}

exports.lookup = function (date) {
  const year = getYear(date)

  if (year < 2014) throw new RangeError('Exchange rates before 2014-01-01 aren\'t available')
  if (year > 2017) throw new RangeError('Exchange rates after 2017-12-31 aren\'t available')

  const data = loadFile(String(year))
  const offset = getDayOfYear(date) - 1

  return Number(data[offset + 0].toFixed(4))
}
