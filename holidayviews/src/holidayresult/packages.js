import React from 'react';
//import HotelFilters from './hotelFilter';
import PackageList from './packageList';
//import SearchHotel from '../hotelsearch/searchHotel';

class Packages extends React.Component {
  constructor() {
    super();
    this.state = {
      queryStringUrl: ""
    }
  }
  hotelListFilter(params) {
    this.setState({
      queryStringUrl: params
    })
  }

  render() {
    return (
      <div className="row">

        <h2>Best holiday packages</h2>
        <div className="row">
          <div className="col-xs-3 col-lg-3">
          </div>
          <div className="col">
            <PackageList />
          </div>
        </div>
      </div>
    );
  }
}

export default Packages;