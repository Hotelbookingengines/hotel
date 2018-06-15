import React from 'react';


class HotelMyBooking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8080/hotel/hotelMyBooking")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('Component DID UPDATE');
          this.setState({
            isLoaded: true,
            items: result
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
    var hotelviews = items.map((item, key) => {
      //var bookde = item.confirmation_numbers;


      return (
        <tr>
          <td>{key + 1}</td>
          <td><a target="_blank" href={"/voucher/" + item.code + "?code="+ item.hotel_code}>{item.code}</a></td>
          <td>{item.hotel_code}</td>
          <td>{item.checkin} to  {item.checkout}</td>
          <td>{item.created_at}</td>
          <td>{item.minimum_selling_price}</td>
          <td>{item.status}</td>
          <td><a target="_blank" href={"/cancellation/" + item.code}>cancellation policy</a></td>
        </tr>
      );
    }
    );


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">

          <div className="container">
            <h2>View booking : {items.length}</h2>
            <p> Test Booking</p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Booking ref id</th>
                    <th>hotelcode</th>
                    <th>checkin/ checkout date</th>
                    <th>booking date</th>
                    <th>price (USD)</th>
                    <th>status</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelviews}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default HotelMyBooking;