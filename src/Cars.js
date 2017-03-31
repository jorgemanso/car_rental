import React, { Component } from 'react';
import Item from './Item';

class Cars extends Component {

  /*
  * Filters the elements to render. Only those with status = available
  */
  renderItems(data) {
    const items = data.map((current, i) => {
      return current['@Status'] === 'Available'
        ? <Item data={current} key={i} />
        : null;
    });

    return items;
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {
          this.renderItems(data)
        }
      </div>
    );
  }
}

Cars.propTypes = {
  data: React.PropTypes.array
}

Cars.defaultProps = {
  data: []
}

export default Cars;
