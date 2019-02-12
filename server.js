/* eslint-disable prefer-destructuring */
/* eslint-disable semi */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const { random, randomD, randomRolls } = require('./utils')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ** Proxy from React can't get at '/' for some reason?
// Apparently this is expected behavior... **
// Test this route with: localhost:4000/
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// A simple route that returns a JSON object
// Test this route with:
app.get('/about', (req, res) => {
  // This Object is converted to JSON and returned.
  res.json({ about: 'this service generates a random numbers.' })
})

// Random number route
// Test this route with: http://localhost:4000/random?n=99
// Where n=99 sets the range of the random number returned
app.get('/random', (req, res) => {
  const { n } = req.query
  const value = random(n - 1)
  res.json({ value, message: `Random number between 0 and ${n}, upperbound exclusive.` })
})

app.post('/roll-dice/:range', (req, res) => {
  const { range } = req.params
  // const { range } = req.query
  const diceValue = randomD(range);
  res.json({ diceValue, message: `Random ${range} sided dice roll` })
})

app.get('/roll-many-dice', (req, res) => {
  const { die, sides } = req.query
  const data = randomRolls(die, sides)

  let diceRolls = null
  let total = null
  if (data) {
    diceRolls = data[0]
    total = data[1]
  }

  res.json({
    message: `You rolled ${die}, D${sides}`,
    diceRolls,
    total,
  })
})

app.post('/api/dice', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
