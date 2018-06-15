import React from 'react';
import { render } from "react-dom";
import Carousel from "./slider";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class HolidayDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    //console.log('Component DID UPDATE! yogeshhhhhhhhhhhhhhh');
    fetch("http://127.0.0.1:8080/packageCode?code=" + this.props.match.params.id)
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
  }

  render() {
    const { error, isLoaded, items } = this.state;


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
                  <h5 className="card-title">{items.name} / {items.days} Days {items.nights} Nights </h5>
                  <p className="card-text">address: {items.addr}   </p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="row">
                <div className="col-xs-8 col-lg-8">
                  <Carousel />
                </div>
                <div className="col">
                  <div className="card">
                    <div className="card-header">
                      Rooms & rates
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rows">
              <div className="card">
                <div className="card-header">
                  About holiday
                </div>
                <div className="card-body">
                  <p className="card-text">{items.about}</p>
                </div>
              </div>
            </div>

            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Other Inclusions
                </div>
                <div className="card-body">
                  <p className="card-text">{items.otherinclusions}</p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Important Info
                </div>
                <div className="card-body">
                  <p className="card-text">{items.importantinfo}</p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Cancellation Policy
                </div>
                <div className="card-body">
                  <p className="card-text">{items.cancellationpolicy}</p>
                </div>
              </div>
            </div>


            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Terms & Conditions
                </div>
                <div className="card-body">
                  <p className="card-text">{items.termsconditions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default HolidayDetails;