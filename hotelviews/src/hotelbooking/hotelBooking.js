import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class HotelBooking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      RoomItems: [],
      RoomViewsItems: [],
      queryStrURL: '',
      RoomUsers: [],
      firstname1: 'testB',
      lastname1: 'testB',
      mobileNo: '8880174244',
      emailId: 'test@gmail.com',
      bookingCode: '',
      rooms: '',
      adult: [],
      child: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formFieldChanges = this.formFieldChanges.bind(this);
  }
  formFieldChanges(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {

    var bookurl = '';
    this.state.RoomViewsItems.map((viewroom, key) => {
      var roomcal = key + 1;

      for (var i = 1; i <= viewroom.pax.adult_quantity; i++) {
        var afn = roomcal + "afn" + i;
        var aln = roomcal + "aln" + i;
        bookurl += '&name=' + roomcal + ',' + this.refs[afn].value + ',' + this.refs[aln].value + ',adult';
      }
      var childCount = (viewroom.pax.children_ages).length;

      for (var k = 1; k <= childCount; k++) {
        var cfn = roomcal + 'cfn' + k;
        var cln = roomcal + 'cln' + k;
        var age = viewroom.pax.children_ages[k - 1];
        bookurl += '&name=' + roomcal + ',' + this.refs[cfn].value + ',' + this.refs[cln].value + ',child,' + age;
      }
    });
    const strURL = 'des=' + this.state.RoomItems.code + '&price=' + this.state.RoomItems.minimum_selling_price + '&mob=' + this.state.mobileNo + '&eid=' + this.state.emailId + '&pax=' + bookurl;

    fetch("http://127.0.0.1:8080/hotel/hotelRoomBooking?" + strURL)
      .then(res => res.json())
      .then(

        (resultFilter) => {
          this.setState({
            isLoaded: true,
            bookingCode: resultFilter.code
          });

        },

        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
    event.preventDefault();
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8080/hotel/hoteldetails" + this.props.location.search)
      .then(res => res.json())
      .then(
        (result) => {
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
    /** hotel room details */
    fetch("http://localhost:8080/hotel/hotelProvisionRoomBooking?code=" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            RoomItems: result,
            RoomViewsItems: result.rooms

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


    const { error, isLoaded, items, RoomItems, RoomViewsItems } = this.state;

    if (this.state.bookingCode !== '') {
      var url = '/voucher/' + this.state.bookingCode +'?code='+ items.code;
      return <Redirect to={url} />
    }

    console.log("===>");
    console.log(RoomItems.checkin);
    console.log(RoomItems.policies);
    var policies = '';
    if (RoomItems.policies) {
      policies = RoomItems.policies.map((i, key) => {
        console.log("===>");
        var canceldate = moment(RoomItems.checkin).subtract(i.days_remaining, 'days').format('LL');
        console.log(canceldate);
        return (
          <p>No penalty for cancellations up to {canceldate} 12:00 (GMT+3). Cancellations made after {canceldate} 12:00 (GMT+3) will be assessed 100.00%</p>
        );
      });
    }

    var roomtype = RoomItems.meal_type;
    var roomtypes = '';
    switch (roomtype) {
      case "RO":
        roomtypes = "Room Only";
        break;
      case "UL":
        roomtypes = "Ultra";
        break;
      case "AI":
        roomtypes = "All Inclusive";
        break;
      case "FB":
        roomtypes = "Full Board";
        break;
      case "HB":
        roomtypes = "Half Board";
        break;
      case "BE":
        roomtypes = "Breakfast English";
        break;
      case "BC":
        roomtypes = "Breakfast Continental";
        break;
    }
    var roomsview = RoomViewsItems.map((viewroom, key) => {
      var roomcal = key + 1;
      var indents = [];
      for (var i = 1; i <= viewroom.pax.adult_quantity; i++) {
        var afn = roomcal + "afn" + i;
        var aln = roomcal + "aln" + i;

        indents.push(<div className="row">
          <div className="col">
            <label>Adult: first Name</label>
            <input ref={afn} name={afn} onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.RoomUsers['afn']} />
          </div>
          <div className="col">
            <label>last name</label>
            <input ref={aln} name={aln} onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.RoomUsers['aln']} />
          </div>
        </div>);
      }
      var childCount = (viewroom.pax.children_ages).length;
      var childindents = [];
      for (var k = 1; k <= childCount; k++) {
        var cfn = roomcal + "cfn" + k;
        var cln = roomcal + "cln" + k;
        childindents.push(<div className="row">
          <div className="col">
            <label>Child: first Name</label>
            <input ref={cfn} name={cfn} onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.RoomUsers['cfn']} />
          </div>
          <div className="col">
            <label>last name</label>
            <input ref={cln} name={cln} onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.RoomUsers['cln']} />
          </div>
          <div className="col">
            <label>Age</label>
            <input disabled className="form-control" type="text" value={viewroom.pax.children_ages[k - 1]} />
          </div>
        </div>);
      }

      var room_type = '';
      switch (viewroom.room_type) {
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
          <div className="card">
            <div className="card-header">
             <strong>  Room Description: </strong>{viewroom.room_category} / {viewroom.room_description} / Room type:  {room_type} / Pax : {viewroom.pax.adult_quantity} / child : {childCount}
              <div className="card-body">
                {indents}
                {childindents}
              </div>
            </div>
          </div>
        </div>
      )
    }
    );


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
                  <h5 className="card-title">{items.name} / start: {items.stars} </h5>
                  <p className="card-text">address: {items.address}, {items.country}  / destination : {items.destination} / Location :  {items.zipcode}  </p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  additional information
                </div>
                <div className="card-body">
                  <div dangerouslySetInnerHTML={{ __html: RoomItems.additional_info }} />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Cancellation Policy
                </div>
                <div className="card-body">
               
                  <h4> {RoomItems.nonrefundable === false && <span> Refundable</span>}
                    {RoomItems.nonrefundable === true && <span> Non Refundable</span>} </h4>
                  {policies}
                  <p>{RoomItems.supports_cancellation === true && <b> Cancellation supports is  available</b>}
                    {RoomItems.supports_cancellation === false && <b> Cancellation supports is not available</b>}  </p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                   
                  <p>  <strong>Rooms Type : </strong> {roomtypes}  <strong>checkin : </strong>{RoomItems.checkin}  <strong>checkout :</strong> {RoomItems.checkout}</p>
                </div>
              </div>
            </div>

            <div className="rows">
              <div className="card">

                <form className="needs-validation" onSubmit={this.handleSubmit}>
                  <div className="card-body">
                    {roomsview}
                  </div>
                  <div className="card-header">
                    Contact details
                </div>
                  <div className="row">



                    <div className="col">
                      <label>Mobile number</label>
                      <input name="mobileNo" onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.mobileNo} />
                    </div>
                    <div className="col">
                      <label>email id</label>
                      <input name="emailId" onChange={this.formFieldChanges} className="form-control" type="text" value={this.state.emailId} />
                    </div>
                  </div>
                  <div className="row">
                    <p> Total amount : {RoomItems.currency}  {RoomItems.minimum_selling_price} </p>
                  </div>
                  <div className="col col-xs-2 col-lg-2">
                    <div className="mt-md-2"><br />
                      <input className="btn btn-primary" type="submit" value="Search Hotels" />
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