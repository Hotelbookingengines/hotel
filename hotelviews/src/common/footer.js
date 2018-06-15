import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Footer extends React.Component {
  render() {
    return (
        <footer className="App-header">
          <div className="container">
            <div className="row">
            <div className="col-12 text-truncate">
                <p className="text-center">Best Hotel price, copyright @ 2018</p>
                </div>
            </div>     
          </div>  
        </footer>
    );
  }
}

export default Footer;
