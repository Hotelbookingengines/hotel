import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
 
class Header extends React.Component {
  render() {
    return (
        <header className="App-header">
          <div className="container">
            <div className="row">
                <img src={logo} className="App-logo" alt="logo" />
                <h3>Srilanka Holidays Tour</h3>
            </div>     
          </div>  
        </header>
    );
  }
}

export default Header;
