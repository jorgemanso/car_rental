import React, { Component } from 'react';
import './css/item.scss';
import { Strings } from './nls/strings';
import fallbackImg from './img/car_placeholder.jpg'

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorImg: false
    };
  }

  /*
  * Renders the information displayed by the image of the car = All values
  * stating with '@'
  */
  renderExtras(data) {
    const keys = Object.keys(data);
    const items = keys.map((current, i) => {
      if (current[0] === '@') {
        const description = Strings[current.substr(1)] || current.substr(1);
        const value = Strings[data[current]] || data[current];
        return <div key={i}><b>{description}</b>{`: ${value}`}</div>
      }
      else {
        return null;
      }
    });
    return items;
  }

  error = () => {
    this.setState({
      errorImg: true
    })
  }

  render() {
    const { data } = this.props;
    const model = data.Vehicle.VehMakeModel['@Name'];
    const vendor = data.vendor['@Name'];
    const vendorCode = data.vendor['@Code'];
    const modelString = `${model} by ${vendor} (${vendorCode})`;
    const priceString = `${data.TotalCharge['@RateTotalAmount']} (${data.TotalCharge['@CurrencyCode']})`
    const imgSrc = this.state.errorImg
      ? fallbackImg
      : data.Vehicle.PictureURL

    return (
      <div className="car">
        <div className="header">
          <span className="model">{modelString}</span>
          <span className="price">{priceString}</span>
        </div>
        <div className="info">
          <img src={imgSrc} onError={this.error} role="presentation"/>
          <div className="extras">
            {
              this.renderExtras(data.Vehicle)
            }
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  data: React.PropTypes.object
}

Item.defaultProps = {
  data: {}
}

export default Item;
