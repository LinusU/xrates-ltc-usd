#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const cheerio = require('cheerio')
const eachDay = require('date-fns/each_day')
const endOfYear = require('date-fns/end_of_year')
const format = require('date-fns/format')
const got = require('got')

async function main (year) {
  const start = new Date(year, 0, 1)
  const end = endOfYear(start)

  const url = 'https://coinmarketcap.com/currencies/litecoin/historical-data/'
  const query = `start=${format(start, 'YYYYMMDD')}&end=${format(end, 'YYYYMMDD')}`

  const response = await got(`${url}?${query}`)
  const $ = cheerio.load(response.body.toString())

  const data = new Map()

  $('#historical-data table tr.text-right').map((_, el) => {
    const date = $(el).children().eq(0).text()
    const open = Number($(el).children().eq(1).attr('data-format-value'))
    const close = Number($(el).children().eq(4).attr('data-format-value'))

    data.set(date, (open + close) / 2)
  })

  const output = new Float64Array(eachDay(start, end).map((date) => {
    const key = format(date, 'MMM DD, YYYY')

    if (!Number.isFinite(data.get(key))) throw new Error(key)

    return data.get(key)
  }))

  const asBuffer = Buffer.from(output.buffer, output.byteOffset, output.byteLength)

  fs.writeFileSync(path.join(__dirname, `data/${year}`), asBuffer)
}

const year = Number(process.argv[2])

if (Number.isFinite(year)) {
  main(year).catch((err) => {
    process.exitCode = 1
    console.error(err.stack)
  })
} else {
  console.error('Usage:')
  console.error('  ./download.js <year>')
  process.exitCode = 1
}
