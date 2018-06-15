import React from 'react';
import { render } from "react-dom";

class PackageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      holidayinfo: []
    };
    
    this.deleteItem = this.deleteItem.bind(this);
    this.updateHotel = this.updateHotel.bind(this);
  }

  deleteItem(event) {
    console.log("========================");
    console.log(event.target.value);
    console.log("========================");
    const deleteCode = (event.target.value);
    fetch("http://127.0.0.1:8080/packageCode?code="+ deleteCode)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            holidayinfo: result
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
  updateHotel(event) {
    var change = this.state.holidayinfo[event.target.name] = event.target.value;
    this.setState({ change });
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8080/packages")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            holidayinfo: result
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

 

  render() {
    const { error, isLoaded, holidayinfo } = this.state;

    var holidayviews = holidayinfo.map((item, key) => {
      return (
        <tbody>
          <tr>
            <td>{item.code} / {item._id} </td>
            <td>{item.name}</td>
            <td>{item.days}</td>
            <td>{item.price}</td>
            <td>
              <a target="_blank" href={"/packageEdit/" + item.code} className="btn btn-primary">Edit</a> &nbsp;
              <button className="btn btn-primary" onClick={this.deleteItem} value={item.code}>Delete</button></td>
          </tr>
       </tbody>
      );
    });

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="rows">
          <div className="container">
            <h2>Holiday packages</h2>
            <p>offers best deals on tour packages. Book your perfect holiday package in India from a wide range of vacation packages and explore all exciting tourist destinations in India.</p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Holiday Name</th>
                    <th>Day</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {holidayviews}
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default PackageView;