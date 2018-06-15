import React from 'react';
import { render } from "react-dom";

class PackageAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      holidayinfo: []
    };
    this.updateHotel = this.updateHotel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateHotel(event) {
    var change = this.state.holidayinfo[event.target.name] = event.target.value;
    this.setState({ change });
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      fetch("http://127.0.0.1:8080/packageCode?code=" + this.props.match.params.id)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result);
            this.setState({
              isLoaded: true,
              holidayinfo: result[0]
            });
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
    }
  }

  handleSubmit(event) {
    console.log("=====");
    console.log(this.state.holidayinfo);
    var myArray = this.state.holidayinfo;
    var myCar = new Object();
    for (var key in myArray) {
      if (key === "code" || key === "star") {
        myCar[key] = parseInt(myArray[key]);
      } else {
        myCar[key] = myArray[key];
      }
    }
    console.log("=====");
    console.log(myCar);
    console.log("=====");

    fetch('http://localhost:8080/packageAdd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myCar)
    })
      .then(
        (resultFilter) => {

          this.setState({
            isLoaded: true,
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

  render() {
    const { error, isLoaded, holidayinfo } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="rows">
          <form method="POST" ref="myForm" className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <div className="col-4">
                <label className="col-form-label">Package code : </label>
                <input type="text" name="code" onChange={this.updateHotel} value={holidayinfo.code} className="form-control" placeholder="Enter Holiday Code" />
              </div>
              <div className="col-4">
                <label className="col-form-label">Star : </label>
                <input type="text" name="star" onChange={this.updateHotel} value={holidayinfo.star} className="form-control" placeholder="Enter Holiday Star" />
              </div>
              <div className="col-4">
                <label className="col-form-label">Name : </label>
                <input type="text" name="name" onChange={this.updateHotel} value={holidayinfo.name} className="form-control" placeholder="Enter Holiday Name" />
              </div>
            </div>
            <div className="form-row">
              <div className="col-4">
                <label className="col-form-label">img : </label>
                <input type="text" name="img" onChange={this.updateHotel} value={holidayinfo.img} className="form-control" placeholder="Enter Holiday img" />
              </div>
              <div className="col-2">
                <label className="col-form-label"> days :</label>
                <input type="text" name="days" onChange={this.updateHotel} value={holidayinfo.days} className="form-control" placeholder="Enter Holiday days" />
              </div>
              <div className="col-2">
                <label className="col-form-label"> Nights :</label>
                <input type="text" name="nights" onChange={this.updateHotel} value={holidayinfo.nights} className="form-control" placeholder="Enter Holiday days" />
              </div>
              <div className="col-4">
                <label className="col-form-label"> price :</label>
                <input type="text" name="price" onChange={this.updateHotel} value={holidayinfo.price} className="form-control" placeholder="Enter Holiday price" />
              </div>
            </div>
            <div className="form-row">
              <div className="col-12">
                <label className="col-form-label">About Itinerary : </label>
                <textarea type="text" name="about" onChange={this.updateHotel} value={holidayinfo.about} className="form-control" placeholder="Enter Holiday about" />
              </div>
            </div> 
            <div className="form-row">
              <div className="col-12">
                <label className="col-form-label">Other Inclusions: </label>
                <textarea type="text" name="otherinclusions" onChange={this.updateHotel} value={holidayinfo.otherinclusions} className="form-control" placeholder="Enter Holiday other inclusions" />
              </div>
            </div> 
            <div className="form-row">
              <div className="col-12">
                <label className="col-form-label">Important Info: </label>
                <textarea type="text" name="importantinfo" onChange={this.updateHotel} value={holidayinfo.importantinfo} className="form-control" placeholder="Enter Holiday other inclusions" />
              </div>
            </div> 
            <div className="form-row">
              <div className="col-12">
                <label className="col-form-label">Cancellation Policy: </label>
                <textarea type="text" name="cancellationpolicy" onChange={this.updateHotel} value={holidayinfo.cancellationpolicy} className="form-control" placeholder="Enter Holiday other inclusions" />
              </div>
            </div> 
            
            

            <div className="form-row">
              <div className="col-12">
                <label className="col-form-label">Terms & Conditions : </label>
                <textarea type="text" name="termsconditions" onChange={this.updateHotel} value={holidayinfo.termsconditions} className="form-control" placeholder="Enter Holiday terms & conditions" />
              </div>
            </div>              
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Update Hotel detail</button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}


export default PackageAdd;