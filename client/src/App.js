import React, { Component } from 'react';
import './App.css';
import DiceRoller from './components/dice-roller'
import DiceRollResults from './components/dice-roll-result'

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      responseToRollRequest: '',
    }
   }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/dice');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleRollManyDice = async (numberOfDice, numberOfSides) => {
    // ROUTE /roll-many-dice/:dice/:sides
    const url = `/roll-many-dice/${numberOfDice}/${numberOfSides}`
    // fetch is a get request by default
    const response = await fetch(url)

    const body = await response.json();
    this.setState({ responseToRollRequest: body }); // This is asynchronous
    // console.log('response to post: ', this.state.responseToRollRequest)
  };

  render() {
      return (
        <div className="App">
          <h1>Dice Roller</h1>
          <p>welcome to the dice roller</p>
          <p>Choose your dice set by inputing the number of dice to roll
            and the number of sides the dice have
          </p>
          <DiceRoller handleRollDice={ this.handleRollManyDice }/>
          <DiceRollResults 
            { ...this.state.responseToRollRequest }
          />
        </div>
      );
    }
}

export default App;
