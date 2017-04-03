var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter((e) => {
  return Number(e.amount) > 100000.00;
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = bankBalances.map((e) => {
  return {
    "amount": e.amount,
    "state": e.state,
    "rounded": Math.round(Number(e.amount))
  };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = bankBalances.map((e) => {
  return  {
    "amount": Math.round(Number(e.amount).toFixed(1) * 10) / 10,
    "state": e.state
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = bankBalances.reduce( (prev, cur) => {
  return Math.round((prev + Number(cur.amount)) * 100) / 100;
}, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = bankBalances.filter((e) => {
  switch (e.state) {
    case "WI":
    case "IL":
    case "WY":
    case "OH":
    case "GA":
    case "DE":
      return true;
    default:
      return false;
  }
}).reduce((prev, cur) => {
    return Math.round((prev + Number(cur.amount * 0.189)) * 100) / 100;
  }, 0);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = bankBalances.filter((e) => {
  switch (e.state) {
    case "WI":
    case "IL":
    case "WY":
    case "OH":
    case "GA":
    case "DE":
      return false;
    default:
      return true;
  }
}).map((e, i, a) => {
  return {
    "state": e.state,
    "amount": Math.round(Number(e.amount * 0.189) * 100) / 100
  };
}).reduce((prev, curr) => {
  if (!prev[curr.state]) {
    prev[curr.state] = 0;
  }
  prev[curr.state] += curr.amount;
  if (String(prev[curr.state]) !== String(prev[curr.state].toFixed(2))) {
    prev[curr.state] = Math.round(prev[curr.state] * 100) / 100;
  }
  return prev;
}, {});

sumOfHighInterests = Object.values(sumOfHighInterests).filter((e) => {
  return e > 50000;
}).reduce((prev, curr) => {
  return Math.round((prev + curr) * 100) / 100;
}, 0) + 0.01; // add on a cent for some reason

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
