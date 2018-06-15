import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './hotelsearch/home';
import Hotels from './hotelresult/hotels';
import HotelDetails from './hoteldetails/hotelDetails';
import HotelBooking from './hotelbooking/hotelBooking';
import HotelVoucher from './hotelVoucher/hotelVoucher';
import HotelMyBooking from './hotelVoucher/HotelMyBooking';
import HotelCancellation from './hotelVoucher/HotelCancellation';
import AddHotel from './addhotel/addHotel';
import Header from './common/header';
import Footer from './common/footer';

import continents from './country/continents'
import countryView from './country/country';
import citiesView from './country/cities';
import hotelView from './country/hotel';

import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Router>
            <div className="rows">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link  to={'/'}>Hotel</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/mybooking'}>My Booking</Link></li>
                  
                  <li className="breadcrumb-item"><Link  to={'/continents'}>continents</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/country/as'}>country</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/city/in'}>city</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/hotellist/12e2a'}>hotellist</Link></li>
                  
                </ol>
                </nav>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/hotels' component={Hotels} />
                  <Route exact path='/hotel/:id' component={HotelDetails} />
                  <Route exact path='/booking/:id' component={HotelBooking} />
                  <Route exact path='/voucher/:id' component={HotelVoucher} />
                  <Route exact path='/mybooking' component={HotelMyBooking} />
                  <Route exact path='/cancellation/:id' component={HotelCancellation} />
                  

                   <Route exact path='/continents' component={continents} />
                   <Route exact path='/country/:id' component={countryView} />
                   <Route exact path='/city/:id' component={citiesView} />
                   <Route exact path='/hotellist/:id' component={hotelView} />
                   
                  
                  <Route exact path='/addhotel/:id' component={AddHotel} />
                </Switch>
              </div>
            </Router>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;