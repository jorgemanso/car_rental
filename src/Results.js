import React, { Component } from 'react';
import './css/results.scss';
import Legend from './Legend';
import Cars from './Cars';
import { Strings } from './nls/strings';
import DataStore from './data/dataStore.js';

/*
* Main entry point to the exercise
*/
class Results extends Component {
  /*
  * Initialization of the data store and the state of the component
  */
  constructor(props) {
    super(props);
    this.store = new DataStore('http://www.cartrawler.com/ctabe/cars.json');
    this.state = {
      cars: this.store.getData()
    };
  }

  /*
  * Sorts by either price or vendor
  */
  sortBy = (value) => {
    const sortingValue = value === 'price'
      ? '@RateTotalAmount'
      : '@Name';
    this.setState({
      cars: this.store.getSortedBy(sortingValue)
    });
  }

  render() {
    const sortOrder = this.store.getSortValue()
      ? Strings.ASCENDING
      : Strings.DESCENDING;

    return (
      <div className="results-list">
        <Legend data={this.store.getLegend()}/>
        <div className="nav-bar">
          <div>Displaying {this.store.getTotal()} results in {sortOrder} order</div>
          <span>{Strings.SORT_BY}</span>
          <div className="button" onClick={()=>this.sortBy('price')}>{Strings.PRICE}</div>
          <div className="button" onClick={()=>this.sortBy('vendor')}>{Strings.VENDOR}</div>
        </div>
        <Cars data={this.state.cars}/>
      </div>
    );
  }
}

export default Results;
