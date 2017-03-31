import data from './content.json';
import { CONSTANTS } from './constants'

export default class DataStore {
  constructor() {
    this.sortingBy = '';
    this.data = data && data[0]
    ? {
      raw: data[0],
      cars: this.normalize(data[0].VehAvailRSCore && data[0].VehAvailRSCore.VehVendorAvails),
      legendDetails: data[0].VehAvailRSCore && data[0].VehAvailRSCore.VehRentalCore
    }
    : {};
  }

  getData = () => {
    return this.data.cars;
  }

  getLegend = () => {
    return this.data.legendDetails;
  }

  getTotal() {
    return this.data.cars
      ? this.data.cars.length
      : 0;
  }

  getSortValue() {
    return this.sortingBy.substr(1);
  }

  /*
  * Returns the array sorted by the input value (price or vendor)
  */
  getSortedBy(value, array) {
    let descending = false;
    if (this.sortingBy === value) {
      descending = true;
      this.sortingBy = '';
    } else {
      this.sortingBy = value;
    }
    const dataArray = array || this.data.cars;
    const sortFunction = value === '@RateTotalAmount'
      ? this.priceSort(value, descending)
      : this.vendorSort(value, descending);
    return dataArray.sort(sortFunction);
  }

  vendorSort(property, descending = false) {
    var sortOrder = descending ? -1 : 1;
    return function (a,b) {
      const first = a.vendor[property].toLowerCase();
      const second =b.vendor[property].toLowerCase();
      var result = (first < second)
          ? -1
          : (first > second)
            ? 1
            : 0;
      return result * sortOrder;
    }
  }

  priceSort(property, descending = false) {
    var sortOrder = descending ? -1 : 1;
    return function (a,b) {
      const first = Number(a.TotalCharge[property]);
      const second = Number(b.TotalCharge[property]);
      var result = (first < second)
          ? -1
          : (first > second)
            ? 1
            : 0;
      return result * sortOrder;
    }
  }

  /*
  * Adds the vendor information to every car entry
  */
  addVendorInfo(cars, vendor) {
    // adding the vendor to the car object
    return cars.map((car) => {
      car.vendor = vendor;
      return car;
    });
  }

  /*
  * Updates the car info with the vendor and sorts the results by the default
  */
  normalize(data) {
    let items = data.map((current, i) => {
      return this.addVendorInfo(current.VehAvails, current.Vendor);
    });
    // flattening the array
    items = items.reduce(function(a, b) {
      return a.concat(b);
    });
    return this.getSortedBy(CONSTANTS.defaultSort, items);
  }
}
