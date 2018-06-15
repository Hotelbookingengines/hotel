import React from 'react';
import moment from 'moment';

class HotelVoucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      itemsvoucher: [],
    };
  }
  componentDidMount() {
    console.log("===" + this.props.location.search);
    console.log("---" + this.props.match.params.id);

    //console.log('Component DID UPDATE! yogeshhhhhhhhhhhhhhh');
    fetch("http://127.0.0.1:8080/hotel/hoteldetails"+ this.props.location.search)
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
    fetch("http://127.0.0.1:8080/hotel/hotelVoucher?code=" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            itemsvoucher: result
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
    const { error, isLoaded, items, itemsvoucher } = this.state;
    var bookde = itemsvoucher.confirmation_numbers;
    var roomsview = '';
    var bookNames = '';

    var policies = '';
    if (itemsvoucher.policies) {
      policies = itemsvoucher.policies.map((i, key) => {
        console.log("===>");
        var canceldate = moment(itemsvoucher.checkin).subtract(i.days_remaining, 'days').format('LL');
        console.log(canceldate);
        return (
          <p>No penalty for cancellations up to {canceldate} 12:00 (GMT+3). Cancellations made after {canceldate} 12:00 (GMT+3) will be assessed 100.00%</p>
        );
      });
    }


    var rooms = '';
    var k = 0;
    if (itemsvoucher.rooms) {
      rooms = itemsvoucher.rooms.map((i, key) => {
        var adult_quantity = (i.pax.adult_quantity);
        var children_ages = (i.pax.children_ages).length;
        var namesss = '';
        for (var j = 0; j < adult_quantity; j++) {
          var iiiiii = itemsvoucher.confirmation_numbers[0].names[k];
          console.log("namesss===>" + iiiiii);
          namesss += '<div className="row"><b>Name : </b> ' + iiiiii + '</div>';
          k++;
        }

        var room_type = '';
      switch (i.room_type) {
        case "FL8", "FL7", "FL6", "FL5":
          room_type = "Family Room";
          break;
        case "QB":
          room_type = "Quad";
          break;
        case "TB":
          room_type = "Triple";
          break;
        case "TW":
          room_type = "Twin";
          break;
        case "DB":
          room_type = "Double";
          break;
        case "SB":
          room_type = "Single";
          break;
      }

        return (
          <div className="rows">
            <div className="card-header"><b>Rooms :</b> {key + 1} ( <b>adult :</b> {adult_quantity}  <b>children :</b> {children_ages} ) </div>
            <div className="col"> <b>Room category :  </b> {i.room_category} / <b>Room description :  </b> {i.room_description} / <b> Room type : </b> {room_type}</div>
            <div className="col"> <div dangerouslySetInnerHTML={{ __html: namesss }} /> </div>
            <div className="w-100"></div>
          </div>
        );
      });
    }

    if (bookde !== undefined) {
      roomsview = bookde.map((book, key) => {
        console.log(book.names);
        bookNames = book.names.map((n, key) => {
          console.log(n);
          return (
            <div className="row"><b>Name : </b>  {n}</div>
          );
        });
        return (
          <span>{book.confirmation_number}</span>
        );
      });
    }

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
                  <h5 className="card-title">Booking Details  </h5>
                  <div className="row">
                    <div className="col-xs-8 col-lg-8">
                      <p className="card-text"><b>Confirmation number: </b>  {roomsview}</p>
                      <p className="card-text"><b>status: </b>  {itemsvoucher.status}</p>
                      <p className="card-text"><b>code: </b> {itemsvoucher.code}</p> </div>
                    <div className="col-xs-4 col-lg-4"><img src="http://www.srilankaholidaystour.com/wp-content/uploads/2015/06/sri-lanka-holiday.png" alt="srilankaholidaystour" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Hotel Details
                </div>
                <div className="card-body">
                  <h5 className="card-title">{items.name} / start:   {items.stars}  </h5>
                  <p className="card-text">address: {items.address} / Location :  ({items.zipcode})  </p>
                  <div className="row">
                    <div className="col"><b>Check-In Date : </b>  {itemsvoucher.checkin}</div>
                    <div className="col"><b>Check-Out Date :</b> {itemsvoucher.checkout} </div>
                    <div className="w-100"></div>
                    <div className="col"> <b>Total Nights :  </b>  1</div>
                    <div className="col"><b>Total Price : </b> {itemsvoucher.currency} {itemsvoucher.minimum_selling_price}</div>
                    <div className="w-100"></div>

                  </div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Room Details
                </div>
                <div className="card-body">
                  {rooms}
                  <div className="rows">
                    <div className="col"><b>Contact number :</b> +91-888-888-8888 </div>
                    <div className="col"><b>Email id : </b> demo@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Cancellation Policy :
                  <strong> {itemsvoucher.nonrefundable === false && <span> Refundable</span>}
                    {itemsvoucher.nonrefundable === true && <span> Non Refundable</span>} </strong>
                </div>
                <div className="card-body">
                  <p className="card-text">{policies}</p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Terms & Conditions
                </div>
                <div className="card-body">
                  <h5 className="card-title">For Srilanka Holidays Tour. </h5>
                  <p className="card-text">* As per Government regulations, It is mandatory for all guests above 18 years of age to carry a valid photo identity card & address proof at the time of check-in.</p>
                  <p className="card-text">Thanks for choosing @Srilanka Holidays Tour. </p>
                  <h5 className="card-title"> Thanking you,</h5>
                  <p className="card-text">Registration,</p>
                  <p className="card-text">Srilanka Holidays Tour </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default HotelVoucher;