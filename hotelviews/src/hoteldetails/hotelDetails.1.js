import React from 'react';
import { render } from "react-dom";
import Carousel from "./slider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
 
class HotelDetails extends React.Component {
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
    fetch("http://127.0.0.1:8080/hotel?code=" + this.props.match.params.id)
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
                  <h5 className="card-title">{items.name} / start: {items.star}  </h5>
                  <p className="card-text">address: {items.addr} / Location :  ({items.locat})  </p>
                </div>
              </div>
            </div>
            <div className="rows">
            <div className="row">

          <div className="col-xs-8 col-lg-8 demo-carousel">
          <Carousel />
          </div>
            <div className="col">
            <div className="card">
                <div className="card-header">
                  Rooms & rates
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Deluxe Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Deluxe Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Club Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Club Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Suite Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Suite Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
      
      
                </ul>
              </div>
           </div>
            </div> 
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  About the hotel
                </div>
                <div className="card-body">
                  {items.facility.about.map(recipe => {
                    return (<div>
                      <p className="card-text">{recipe}</p>
                    </div>
                    )
                  })
                  }
                </div>
              </div>
            </div>

            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Rooms & rates
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Deluxe Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Deluxe Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Club Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Club Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Suite Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Suite Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Tower Suite Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                  <li className="list-group-item">
                    <b>Tower Suite Room</b>   Breakfast & Free Wi-Fi
                    <pre className="text-right">RS. 18,640 <a className="btn btn-primary">Book room</a> </pre>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rows">

              <div className="card">
                <div className="card-header">
                  Location
                </div>
                <div className="card-body">
                {items.facility.Location.map(recipe => {
                    return (<div>
                      <p className="card-text">{recipe}</p>
                    </div>
                    )
                  })
                  }
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  Features
                </div>
                <div className="card-body">
                {items.facility.Features.map(recipe => {
                    return (<div>
                      <p className="card-text">{recipe}</p>
                    </div>
                    )
                  })
                  }

                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  Rooms
                </div>
                <div className="card-body">
                {items.facility.RoomsDetails.map(recipe => {
                    return (<div>
                      <p className="card-text">{recipe}</p>
                    </div>
                    )
                  })
                  }
                </div>
              </div>
              <div className="rows">
                <div className="row">
                  <div className="col">

                    <div className="card">
                      <div className="card-header">
                        Amenities
                </div>
                      <div className="card-body">
                        {items.facility.amenities.map(recipe => {
                          return (<div>
                            <p className="card-text">{recipe}</p>
                          </div>
                          )
                        })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <div className="card-header">
                        Facilities
                       </div>
                      <div className="card-body">
                        {items.facility.Facilities.map(recipe => {
                          return (<div>
                            <p className="card-text">{recipe}</p>
                          </div>
                          )
                        })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card ">
                      <div className="card-header">
                        Hotel Type
                       </div>
                      <div className="card-body">
                        {items.facility.type.map(recipe => {
                          return (<div>
                            <p className="card-text">{recipe}</p>
                          </div>
                          )
                        })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <div className="card-header">
                        Hotel themes
                      </div>
                      <div className="card-body">
                        {items.facility.themes.map(recipe => {
                          return (<div>
                            <p className="card-text">{recipe}</p>
                          </div>
                          )
                        })
                        }
                      </div>
                    </div>
                  </div>
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