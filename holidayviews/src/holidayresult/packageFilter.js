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
      hotelAmenities: [],
      amenitiesFilterCheck: [],
      hotelFacilities: [],
      hotelFacilitiesCheck: [],
      hotelType: [],
      hotelTypeCheck: [],
      hotelThemes: [],
      hotelThemesCheck: [],
      queryParamUpdate: ''
    };
    this.handleStarChange = this.handleStarChange.bind(this);
  }

  handleStarChange(event) {
    if (event.target.name === 'starFilter') {
      if (event.target.checked === true) {
        //console.log("add this value star " + event.target.value);
        this.state.starFilterCheck.push(event.target.value);
      } else {
        //console.log("delete this value star" + event.target.value);
        var removedstar = this.state.starFilterCheck.indexOf(event.target.value);
        this.state.starFilterCheck.splice(removedstar, 1);
        console.log(removedstar);
      }
      //console.log(this.state.starFilterCheck);
    }
    if (event.target.name === 'locationFilter') {
      if (event.target.checked === true) {
        // console.log("add this value location" + event.target.value);
        this.state.locationFilterCheck.push(event.target.value);
      } else {
        // console.log("delete this value location" + event.target.value);
        var removedloc = this.state.locationFilterCheck.indexOf(event.target.value);
        this.state.locationFilterCheck.splice(removedloc, 1);
      }
      //console.log(this.state.locationFilterCheck);
    }
    if (event.target.name === 'amenitiesFilter') {
      if (event.target.checked === true) {
        // console.log("add this value location" + event.target.value);
        this.state.amenitiesFilterCheck.push(event.target.value);
      } else {
        // console.log("delete this value location" + event.target.value);
        var removedame = this.state.amenitiesFilterCheck.indexOf(event.target.value);
        this.state.amenitiesFilterCheck.splice(removedame, 1);
      }
      console.log(this.state.amenitiesFilterCheck);
    }
    if (event.target.name === 'hotelFacilities') {
      if (event.target.checked === true) {
        // console.log("add this value location" + event.target.value);
        this.state.hotelFacilitiesCheck.push(event.target.value);
      } else {
        // console.log("delete this value location" + event.target.value);
        var removedfac = this.state.hotelFacilitiesCheck.indexOf(event.target.value);
        this.state.hotelFacilitiesCheck.splice(removedfac, 1);
      }
      console.log(this.state.hotelFacilitiesCheck);
    }
    if (event.target.name === 'hotelType') {
      if (event.target.checked === true) {
        // console.log("add this value location" + event.target.value);
        this.state.hotelTypeCheck.push(event.target.value);
      } else {
        // console.log("delete this value location" + event.target.value);
        var removedtyp = this.state.hotelTypeCheck.indexOf(event.target.value);
        this.state.hotelTypeCheck.splice(removedtyp, 1);
      }
      console.log(this.state.hotelTypeCheck);
    }
    if (event.target.name === 'hotelThemes') {
      if (event.target.checked === true) {
        // console.log("add this value location" + event.target.value);
        this.state.hotelThemesCheck.push(event.target.value);
      } else {
        // console.log("delete this value location" + event.target.value);
        var removedthm = this.state.hotelThemesCheck.indexOf(event.target.value);
        this.state.hotelThemesCheck.splice(removedthm, 1);
      }
      console.log(this.state.hotelThemesCheck);
    }



    var parameterUpdate = '?star=' + this.state.starFilterCheck + '&loc=' + this.state.locationFilterCheck + '&ame=' + this.state.amenitiesFilterCheck + '&fac=' + this.state.hotelFacilitiesCheck + '&typ=' + this.state.hotelTypeCheck + '&thm=' + this.state.hotelThemesCheck;

    this.props.callback(parameterUpdate);
 
    fetch('http://127.0.0.1:8080/filter' + parameterUpdate, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (resultFilter) => {
          //console.log(resultFilter[0].hotelLocation);
          this.setState({
            isLoaded: true,
            starFilter: resultFilter[0].hotelStar,
            priceFilter: resultFilter[1].hotelPrices,
            locationFilter: resultFilter[2].hotelLocation
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
    fetch('http://127.0.0.1:8080/filter', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(
        (resultFilter) => {
          console.log(resultFilter);
          this.setState({
            isLoaded: true,
            starFilter: resultFilter[0].hotelStar,
            priceFilter: resultFilter[1].hotelPrices,
            locationFilter: resultFilter[2].hotelLocation,
            hotelFacilities: resultFilter[3].hotelFacilities[0].Facilities,
            hotelAmenities: resultFilter[4].hotelAmenities[0].amenities,
            hotelType: resultFilter[5].hotelType[0].type,
            hotelThemes: resultFilter[6].hotelThemes[0].themes
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
    const { error, isLoaded, starFilter, priceFilter, locationFilter, starFilterCheck, locationFilterCheck, amenitiesFilterCheck, hotelAmenities, hotelFacilitiesCheck, hotelFacilities, hotelType, hotelTypeCheck, hotelThemes, hotelThemesCheck } = this.state;
    var stars = starFilter.map((item, key) => {
      var StarFalse;
      var num = item._id.toString();
      if (starFilterCheck.indexOf(num) === -1) { StarFalse = false; } else { StarFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" checked={StarFalse} name="starFilter" value={item._id} />
          <label> &nbsp; {item._id} Star  ( {item.count} )</label>
        </div>
      );
    }
    );

    var amenities = hotelAmenities.map((item, key) => {
      var locFalse;
      if (amenitiesFilterCheck.indexOf(item) === -1) { locFalse = false; } else { locFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" name="amenitiesFilter" checked={locFalse} value={item} />
          <label> &nbsp; {item} </label>
        </div>
      );
    });

    var facilities = hotelFacilities.map((item, key) => {
      var locFalse;
      if (hotelFacilitiesCheck.indexOf(item) === -1) { locFalse = false; } else { locFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" name="hotelFacilities" checked={locFalse} value={item} />
          <label> &nbsp; {item} </label>
        </div>
      );
    });

    var hotelTypes = hotelType.map((item, key) => {
      var locFalse;
      if (hotelTypeCheck.indexOf(item) === -1) { locFalse = false; } else { locFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" name="hotelType" checked={locFalse} value={item} />
          <label> &nbsp; {item} </label>
        </div>
      );
    });

    var themes = hotelThemes.map((item, key) => {
      var locFalse;
      if (hotelThemesCheck.indexOf(item) === -1) { locFalse = false; } else { locFalse = true; }
      return (
        <div className="form-group">
          <input className="checkbox-control" onChange={this.handleStarChange} type="checkbox" name="hotelThemes" checked={locFalse} value={item} />
          <label> &nbsp; {item} </label>
        </div>
      );
    });

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
                <div className="form-row">
                  <div className="col">
                    <input className="form-control" onChange={this.handleStarChange} type="text" name="price" value={priceFilter.min} disabled placeholder="Min price" />
                  </div>
                  <div className="col">
                    <input className="form-control" onChange={this.handleStarChange} type="text" name="price" value={priceFilter.max} disabled placeholder="Max price" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                Location
              </div>
              <div className="card-body">
                {locations}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                Amenities
              </div>
              <div className="card-body">
                {amenities}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                Facilities
              </div>
              <div className="card-body">
                {facilities}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                hotel Type
              </div>
              <div className="card-body">
                {hotelTypes}
              </div>
            </div>
            <div className="card mt-md-2">
              <div className="card-header">
                themes
              </div>
              <div className="card-body">
                {themes}
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}
export default HotelFilters;