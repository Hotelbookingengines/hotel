import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './hotelsearch/home';
import Hotels from './hotelresult/hotels';
import HotelDetails from './hoteldetails/hotelDetails';
import HotelBooking from './hotelbooking/hotelBooking';
import HotelVoucher from './hotelVoucher/hotelVoucher';
import AddHotel from './addhotel/addHotel';
import Header from './common/header';
import Footer from './common/footer';
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
                  <li className="breadcrumb-item"><Link  to={'/'}>Search Hotel</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/hotels'}>Compare Hotels</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/hotel/175141'}>See Hotel details</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/booking/175141'}>Conform Booking details</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/voucher'}>Booking voucher</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/addhotel/175141'}>add Hotel</Link></li>
                </ol>
                </nav>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/hotels' component={Hotels} />
                  <Route exact path='/hotel/:id' component={HotelDetails} />
                  <Route exact path='/booking/:id' component={HotelBooking} />
                  <Route exact path='/voucher' component={HotelVoucher} />
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