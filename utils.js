/* eslint-disable semi */


/*
======== Challenge 1 ========

Currently the API endpoint '/random/?n=num' returns a random number from 0 to num.
This has a problem since the numbers returned are decimal numbers, for ex: `13.409162476456668`.
Modify the code at the endpoint to return whole numbers.

- The random function should return a **whole number**.
- The number should range from 0 to n - 1
- Carefully craft an intuitive API
*/

function random(n) {
  return Math.round(Math.random() * n)
}

/*
======== Challenge 2 ========

Function to simulate die rolls. Currently there is a stubbed function `randomD(n)`.
This function takes a number n as a parameter. It should return a number from 1 to n.

  - `randomD(n)` should return a whole number
  - `randomD(n)` the range should be from 1 to n
  - Define an API that returns the results as JSON

*/

function randomD(n) {
  const min = 1;
  const max = n;
  return Math.round(Math.random() * (max - min) + min);
}

/*

======== Challenge 3 ========

We need to a function to generate a series of die rolls. This function is stubbed in
as `randomRolls(n, s)`, `n` is number of dice to roll, and `s` is number of sides possessed
by each die. This function should return an array of random numbers.

- `randomRolls(n, s)` should return an array
- all elements should whole numbers
- Each element should be value of 1 to `s`

*/



function randomRolls(n, s) {
  const diceRolls = []

  const add = (a, b) => a + b;

  for (let i = 0; i < n; i += 1) {
    diceRolls.push(Math.round(randomD(s)))
  }
  // use reduce to sum our array
  const total = diceRolls.reduce(add)
  return ([diceRolls, total])
}

module.exports.random = random
module.exports.randomD = randomD
module.exports.randomRolls = randomRolls
