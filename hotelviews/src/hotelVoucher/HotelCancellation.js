import React from 'react';
import moment from 'moment';

class HotelCancellation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      cancelview: []
    };
    this.showMore = this.showMore.bind(this);
  }
  showMore(event) {


    fetch("http://127.0.0.1:8080/hotel/hotelCancellation?code=" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('Component DID UPDATE');
          this.setState({
            isLoaded: true,
            cancelview: result
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
  componentDidMount() {
    fetch("http://127.0.0.1:8080/hotel/hotelMyBooking?code=" + this.props.match.params.id)
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

    const { error, isLoaded, items, cancelview } = this.state;




    var hotelviews = items.map((item, key) => {

      var policies = item.policies.map((i, key) => {
        console.log("===>");
        var canceldate = moment(item.checkin).subtract(i.days_remaining, 'days').format('LL');
        console.log(canceldate);
        return (
          <div className="row">
            <p>No penalty for cancellations up to {canceldate} 12:00 (GMT+3). Cancellations made after {canceldate} 12:00 (GMT+3) will be assessed 100.00%</p>
            <p>{i.days_remaining} - {i.ratio}  - {canceldate}</p>
          </div>
        );
      });
      return (
        <div className="rows">
          <button onClick={this.showMore}>conform cancel</button>

          <p>{policies}</p>
          <p>{this.state.finalDate}</p>

          <p><a target="_blank" href={"/voucher/" + item.code}>{item.code}</a></p>
          <p>code: {item.code}</p>
          <p>status: {item.status}</p>
          <p>destination_code: {item.destination_code}</p>
          <p>Amount : {item.currency}   {item.minimum_selling_price}</p>
          <p>checkin: {item.checkin} to  {item.checkout}</p>
          <p>hotel_confirmation_number_date: {item.hotel_confirmation_number_date} </p>

          <p>minimum_selling_price: {item.minimum_selling_price}</p>
          <p>daysss: {item.policies[0].days_remaining}</p>
          <h4> {item.nonrefundable === false && <span> Refundable</span>}
            {item.nonrefundable === true && <span> Non Refundable</span>} </h4>
          <p>{item.supports_cancellation === true && <span> cancellation supports is  available</span>}
            {item.supports_cancellation === false && <span> cancellation supports is not available</span>}</p>
          <p>additional_info: <div dangerouslySetInnerHTML={{ __html: item.additional_info }} /></p>
          <p>hotel_code: {item.hotel_code}</p>
          <p>meal_type: {item.meal_type}</p>
          <p>client_nationality: {item.client_nationality}</p>

        </div>
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

          <div className="rows">
          </div>
          {hotelviews}
        </div>
      );
    }
  }
}

export default HotelCancellation;