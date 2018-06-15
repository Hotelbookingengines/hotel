import React from 'react';
/* import ModifyHotel from './modifyHotel';
<ModifyHotel url={urlStore}/> */
import Carousel from "./slider";
//import queryString from 'query-string'
import "react-responsive-carousel/lib/styles/carousel.min.css";

class HotelDetails extends React.Component {
  constructor(props) {
    super(props);

    // const values = queryString.parse(this.props.location.search);
    // console.log(values);
    var reqSearch = '';
    if(this.props.location.search){
      reqSearch = this.props.location.search;
    }else{
      reqSearch = 'des=12fa1&nat=in&st=2018-06-04&ed=2018-06-05&r=1&a=2,2,2,2,2&c=0,0,0,0,0&h=';
    }
   
   this.state = {
      error: null,
      isLoaded: true,
      RoomItems: [],
      items: [],
      imgUrl: '',
      urlStore: reqSearch
    };
    
  }

  componentDidMount() {

     
    //console.log('Component DID UPDATE! yogeshhhhhhhhhhhhhhh');
    /** hotel details */
    fetch("http://127.0.0.1:8080/hotel/hoteldetails?code=" + this.props.match.params.id + '&' + this.state.urlStore)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            items: result[0]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    /** hotel room details */
    fetch("http://127.0.0.1:8080/hotel/hotelDetailsRoom?code=" + this.props.match.params.id + '&' + this.state.urlStore)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            RoomItems: result.results[0].products
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items, RoomItems, urlStore } = this.state;


    var roomsviews = RoomItems;
    
    
    var roomsview = roomsviews.map((rooms, key) => {
      var roomtype = rooms.meal_type;
      var roomtypes = '';
      switch (roomtype) {
        case "RO":
          roomtypes = "Room Only";
          break;
        case "UL":
          roomtypes = "Ultra";
          break;
        case "AI":
          roomtypes = "All Inclusive";
          break;
        case "FB":
          roomtypes = "Full Board";
          break;
        case "HB":
          roomtypes = "Half Board";
          break;
        case "BE":
          roomtypes = "Breakfast English";
          break;
        case "BC":
          roomtypes = "Breakfast Continental";
          break;
      }
      return (
        <tr>
          <td><b>{rooms.rooms[0].room_category}</b> {rooms.rooms[0].room_description}</td>
          <td>{roomtypes}</td>
          <td>{rooms.nonrefundable === false && <span> Refundable</span>}
            {rooms.nonrefundable === true && <span> Non Refundable</span>}
            /
            {rooms.supports_cancellation === true && <span> cancellation supports is  available</span>}
            {rooms.supports_cancellation === false && <span> cancellation supports is not available</span>}
            </td>
          <td>{rooms.currency} {rooms.minimum_selling_price} <a href={"/booking/" + rooms.code + '?code=' + items.code} className="btn btn-primary">Book room</a></td>
        </tr>
      )
    }
    );


    var descriptions = '';
    if (items.descriptions !== undefined) {
      descriptions = Object.keys(items.descriptions).map(recipe => {
        const htmlString = items.descriptions[recipe];
        return (<div>
          <h3>{recipe}</h3>
          <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </div>
        )
      });
    }


    var facilities = '';
    if (items.facilities !== undefined) {
      facilities = items.facilities.map(recipe => {
        return (
          <span className="badge badge-pill badge-info">{recipe}</span>
        )
      });
    }
    var themes = '';
    if (items.themes !== undefined) {
      themes = items.themes.map(recipe => {
        return (
          <span className="badge badge-pill badge-info">{recipe}</span>
        )
      });
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          <div className="card mt-md-2">
            <div className="rows">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{items.name} / start: {items.stars}  </h5>
                  <p className="card-text">address: {items.address} {items.country} / Location :  {items.zipcode} / phone: {items.phone} / email: {items.email}  </p>
                </div>
              </div>
            </div>

            <div className="rows">
              <div className="row">
                <div className="col-xs-8 col-lg-8">
                  <Carousel imgUrl={items.images} />
                </div>
                <div className="col-xs-4 col-lg-4">
                 
                   
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  About the hotel
                </div>
                <div className="card-body">
                  {descriptions}



                </div>
              </div>
            </div>
            <div className="rows">
              
                  
              
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Rooms & rates
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Meal Type</th>
                      <th>policy</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomsview}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Facilities
                </div>
                <div className="card-body">
                  {facilities}
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Hotel Type
                </div>
                <div className="card-body">
                  {items.hotel_type}
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Hotel themes
                </div>
                <div className="card-body">
                  {themes}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default HotelDetails;