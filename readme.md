# Exchange Rates: LTC - USD

Historical exchange rates for the LTC/USD pair.

## Installation

```sh
npm install --save @xrates/ltc-usd
```

## Usage

```js
const ltcToUsd = require('@xrates/ltc-usd')

console.log(ltcToUsd.lookup('2014-10-15'))
//=> 4.0667
```

## API

### `lookup(date: string | Date): number`

Get the exchange rate for the specified date. The return value is a number that fits the description "1 LTC = ? USD".

If the specified date falls outside the span of the provided data, a RangeError will be thrown.

## Source

The data is collected from the [CoinMarketCap Litcoin Historical Price page](https://coinmarketcap.com/currencies/litecoin/historical-data/). The value for each day was aquired by averaging the "Open" and "Close" values.
