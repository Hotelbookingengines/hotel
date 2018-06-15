import React from 'react';

class HotelFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      starFilter: [],
      priceFilter: [],
      locationFilter: [],
      starFilterCheck: [],
      locationFilterCheck: [],
      queryParamUpdate: '',
      totalrecord: 0
    };
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handlePriceChange(event) {
    var change = {};
    if (event.target.name === 'minprice') {
      change = (this.state.priceFilter[0].min1 = event.target.value);
    }
    if (event.target.name === 'maxprice') {
      change = (this.state.priceFilter[0].max1 = event.target.value);
    }
    this.setState({ change });
  }
  handleStarChange(event) {
    if (event.target.name === 'starFilter') {
      if (event.target.checked === true) {
        this.state.starFilterCheck.push(event.target.value);
      } else {
        var removedstar = this.state.starFilterCheck.indexOf(event.target.value);
        this.state.starFilterCheck.splice(removedstar, 1);
      }
    }
    if (event.target.name === 'locationFilter') {
      if (event.target.checked === true) {
        this.state.locationFilterCheck.push(event.target.value);
      } else {
        var removedloc = this.state.locationFilterCheck.indexOf(event.target.value);
        this.state.locationFilterCheck.splice(removedloc, 1);
      }
    }

    var minMaxPrice ='';
    if(this.state.priceFilter[0].min1 && this.state.priceFilter[0].max1){
      minMaxPrice = '&min=' + this.state.priceFilter[0].min1 + '&max=' + this.state.priceFilter[0].max1;
    }

    var parameterUpdate = '?star=' + this.state.starFilterCheck + '&zip=' + this.state.locationFilterCheck + minMaxPrice;
    this.props.callback(parameterUpdate);
    fetch('http://127.0.0.1:8080/hotel/hotelfilter' + parameterUpdate, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (resultFilter) => {
          this.setState({
            isLoaded: true,
            starFilter: resultFilter[0].hotelStar,
            priceFilter: resultFilter[1].hotelPrices,
            locationFilter: resultFilter[2].hotelLocation,
            totalrecord: resultFilter[3].totalrecord
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    event.preventDefault();
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8080/hotel/hotelfilter")
      .then(res => res.json())
      .then(
        (resultFilter) => {
          //console.log(resultFilter);
          this.setState({
            isLoaded: true,
            starFilter: resultFilter[0].hotelStar,
            priceFilter: resultFilter[1].hotelPrices,
            locationFilter: resultFilter[2].hotelLocation,
            totalrecord: resultFilter[3].totalrecord

          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, totalrecord, starFilter, priceFilter, locationFilter, starFilterCheck, locationFilterCheck } = this.state;
    var stars = starFilter.map((item, key) => {
      var StarFalse;
      //var num = item._id.toString();
      var num = item._id;
      if (item._id === null) {
        num = item._id;
      } else {
        num = item._id.toString();
      }
      var starLable = '';
      if (starFilterCheck.indexOf(num) === -1) { StarFalse = false; } else { StarFalse = true; }
      if(item._id === 11){  starLable = "No"; } else{  starLable = item._id; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" checked={StarFalse} name="starFilter" value={item._id} />
          <label> &nbsp; {starLable} Star  ( {item.count} )</label>
        </div>
      );
    }
    );


    var locations = locationFilter.map((item, key) => {
      var locFalse;
      if (locationFilterCheck.indexOf(item._id) === -1) { locFalse = false; } else { locFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" checked={locFalse} name="locationFilter" value={item._id} />
          <label> &nbsp; {item._id}  ( {item.count} )</label>
        </div>
      );
    }
    );

    var price = priceFilter.map((item, key) => {
      return (

        <div className="form-row">
    
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
           starting price ${item.min}  to  ${item.max} 
          </div>
          <div className="col">
            <input className="form-control" onChange={this.handlePriceChange} type="text" name="minprice" value={item.min1} placeholder="Min price" />
          </div>
          <div className="col">
            <input className="form-control" onChange={this.handlePriceChange} type="text" name="maxprice" value={item.max1} placeholder="Max price" />
          </div>
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox"  name="priceFilter" value="" />
        </div>

      );
    }
    );

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <div className="rows hotelFilter">
          <form>
            <div className="card mt-md-2">
              <div className="card-header">
                Total record : {totalrecord}
              </div>
              <div className="card-header">
                Star Rating
              </div>
              <div className="card-body">
                {stars}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                Price
              </div>
              <div className="card-body">
                {price}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                Pin code
              </div>
              <div className="card-body">
                {locations}
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}
export default HotelFilters;