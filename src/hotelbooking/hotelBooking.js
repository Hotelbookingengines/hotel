import React from 'react';

class HotelBooking extends React.Component {
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
    fetch("http://127.0.0.1:8080/hotel?code=175141")
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
              <div className="card">
                <div className="card-header">
                  Rooms & rates
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Deluxe Room</b>   Room only rate
                    <pre className="text-right">RS. 16,640 </pre>
                  </li>

                </ul>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <form method="GET" ref="myForm" className="needs-validation">
                  <div className="row">
                    <div className="col">
                      <label>Name and last name</label>
                      <input className="form-control" type="submit" value="" />
                    </div>
                    <div className="col">
                      <label>city / country</label>
                      <input className="form-control" type="submit" value="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Mobile number</label>
                      <input className="form-control" type="submit" value="" />
                    </div>
                    <div className="col">
                      <label>email id</label>
                      <input className="form-control" type="submit" value="" />
                    </div>
                  </div>


                  <div className="col">
                    <div className="mt-md-2"><br />
                      <input className="btn btn-primary" type="submit" value="congform booking" />
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default HotelBooking;