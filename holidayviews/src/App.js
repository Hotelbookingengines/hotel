import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './holidaysearch/home';
import packages from './holidayresult/packages';
import PackageDetails from './holidaydetails/holidayDetails';
import HotelBooking from './hotelbooking/hotelBooking';
import HotelVoucher from './hotelVoucher/hotelVoucher';
import PackageAdd from './packageAdd/packageAdd';
import PackageView from './packageAdd/packageView';
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
                  <li className="breadcrumb-item"><Link  to={'/'}>Search Holidays</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/packages'}>Result Holidays</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/packages/10001'}>Holidays details</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/booking/175141'}>Conform Booking details</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/voucher'}>Booking voucher</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/packageadd'}>Package Add</Link></li>
                  <li className="breadcrumb-item"><Link  to={'/packageView'}>Package View</Link></li>
                  
                </ol>
                </nav>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/packages' component={packages} />
                  <Route exact path='/packages/:id' component={PackageDetails} />
                  <Route exact path='/booking/:id' component={HotelBooking} />
                  <Route exact path='/voucher' component={HotelVoucher} />
                  <Route exact path='/packageadd' component={PackageAdd} />
                  <Route exact path='/packageEdit/:id' component={PackageAdd} />
                  <Route exact path='/packageView' component={PackageView} />
                  
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