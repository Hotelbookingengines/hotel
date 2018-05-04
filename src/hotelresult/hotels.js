import React from 'react';
import HotelFilters from './hotelFilter';
import HotelList from './hotelList';
//import SearchHotel from '../hotelsearch/searchHotel';

class Hotels extends React.Component {
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

       
        <div className="row">
          <div className="col-xs-3 col-lg-3">
            <HotelFilters callback={this.hotelListFilter.bind(this)} />
          </div>
          <div className="col">
            <HotelList queryStringUrl={this.state.queryStringUrl} />
          </div>
        </div>
      </div>
    );
  }
}

export default Hotels;