import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

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

  handleSubmit = async e => {
    e.preventDefault();
    const url = `/roll-dice/${this.state.post}` // /roll-many-dice/7
    // const url = `/roll-many-dice?range=${this.state.post}` // 
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.json();
    this.setState({ responseToPost: body });
    console.log('response to post: ', this.state.responseToPost.diceValue)
  };

  render() {
      return (
        <div className="App">
          <p>{this.state.response}</p>
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Dice roller</strong>
            </p>
            <p>How many sided die do you want to roll?</p>
            <input
              type='number'
              placeholder='enter number'
              value={this.state.post}
              className='sides-input'
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
          
          <h2>{this.state.responseToPost.diceValue}</h2>
        </div>
      );
    }
}

export default App;
