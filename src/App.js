import React, { Component } from 'react';
import './css/app.css';
import Results from './Results.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Jorge Manso - Code Test</h2>
        </div>
        <Results/>
      </div>
    );
  }
}

export default App;
