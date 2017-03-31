import React, { Component } from 'react';
import { Strings } from './nls/strings'
import './css/legend.scss';

class Legend extends Component {

  printAction(action, location, date) {
    return <div><b>{action}</b>{`: ${location} (${date.toLocaleString()})`}</div>
  }

  render() {
    const { data } = this.props;
    const pickupDate = new Date(data['@PickUpDateTime']);
    const returnDate = new Date(data['@ReturnDateTime']);

    return (
      <div className="legend">
        <div>{Strings.TRAVEL_INFO}</div>
        <div className="pickup-return">
        {
          this.printAction(Strings.PICKUP, data.PickUpLocation['@Name'], pickupDate)
        }
        {
          this.printAction(Strings.RETURN, data.ReturnLocation['@Name'], returnDate)
        }
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  data: React.PropTypes.object
}

Legend.defaultProps = {
  data: {}
}

export default Legend;
