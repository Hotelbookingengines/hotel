import React from 'react';
//import { render } from "react-dom";

class AddHotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      hotelifo: []
    };
    this.updateHotel = this.updateHotel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateHotel(event) {
    //var changes = this.state.hotelifo[event.target.name] = event.target.value;
    //this.setState({ changes });
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
            isLoaded: false,
            error
          });
        }
      )
  }
  handleSubmit(event) {
   //var myArray =  this.state.hotelifo; 
    var myfruit ={
      name: "asasd",
      city: "asasa",
      country: "sasd",
    };
      // for (var key in myArray) {
         //console.log("key " + key + "  >>>  value " + myArray[key]);
      // }
    event.preventDefault();

   fetch('http://127.0.0.1:8080/searchHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myfruit)
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
    const { error, isLoaded, items } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
         <form method="GET" ref="myForm" action="./addhotel/175141" className="needs-validation" onSubmit={this.handleSubmit}>
         
            <div className="form-group row">
              <div className="col-4">
                <label className="col-form-label">Hotel Name : </label>
                <input type="text" name="name" onChange={this.updateHotel} value={items.name} className="form-control" placeholder="Enter Hotel Name" />
              </div>
              <div className="col-4">
                <label className="col-form-label">Hotel Star : </label>
                <input type="text" name="star" onChange={this.updateHotel} value={items.star} className="form-control" placeholder="Enter Hotel Star" />
              </div>
              <div className="col-4">
                <label className="col-form-label">Location : </label>
                <input type="text" name="locat" onChange={this.updateHotel} value={items.locat} className="form-control" placeholder="Enter Hotel Location" />
              </div>
            </div>
            <div className="form-row">
                <label className="col-form-label">Address : </label> 
                <input type="text" name="addr" onChange={this.updateHotel} value={items.addr} className="form-control" placeholder="Enter Hotel Adderess" />
            </div>  
            <div className="form-row">
              <div className="col-4">
                <label className="col-form-label">City : </label> 
                <input type="text" name="city" onChange={this.updateHotel} className="form-control" placeholder="City" />
              </div>
              <div className="col-4">
              <label className="col-form-label"> State :</label>
                <input type="text" name="state" onChange={this.updateHotel} className="form-control" placeholder="State" />
              </div>
              <div className="col-4">
              <label className="col-form-label"> Country :</label>
                <input type="text" name="country" onChange={this.updateHotel} className="form-control" placeholder="Country" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Update Hotel detail</button>
              </div>
            </div>
            <div className="form-row">
                <label className="col-form-label">About the hotel : </label> 
                {items.facility.about.map(recipe => {
                    return (
                      <textarea className="form-control" placeholder="Enter Hotel Adderess" rows="3">{recipe}</textarea>
                    )
                  })
                  }                
            </div>  
            <div className="form-row">
                <label className="col-form-label">Location : </label> 
                {items.facility.Location.map(recipe => {
                    return (
                      <textarea className="form-control" placeholder="Enter Hotel Adderess" rows="3">{recipe}</textarea>
                    )
                  })
                  }
            </div>  
            <div className="form-row">
                <label className="col-form-label">Features : </label> 
                {items.facility.Features.map(recipe => {
                    return (
                      <textarea className="form-control" placeholder="Enter Hotel Adderess" rows="3">{recipe}</textarea>
                    )
                  })
                  }
            </div>  
            <div className="form-row">
                <label className="col-form-label">Rooms : </label> 
                {items.facility.RoomsDetails.map(recipe => {
                    return (
                      <textarea className="form-control" placeholder="Enter Hotel Adderess" rows="3">{recipe}</textarea>
                    )
                  })
                  }
            </div>  
            <div className="form-group">
                <label className="col-form-label">Amenities : </label> 
                <div className="row">
                  {items.facility.amenities.map(recipe => {
                        return (
                          <div className="col-4">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <p className="card-text">{recipe}</p>
                          </div>
                        )
                    })
                  }
                </div>  
            </div> 
            <div className="form-group">
                <label className="col-form-label">Facilities : </label> 
                <div className="row">
                  {items.facility.Facilities.map(recipe => {
                        return (
                          <div className="col-4">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <p className="card-text">{recipe}</p>
                          </div>
                        )
                    })
                  }
                </div>  
            </div>  
            <div className="form-group">
                <label className="col-form-label">Hotel Type : </label> 
                <div className="row">
                  {items.facility.type.map(recipe => {
                        return (
                          <div className="col-4">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <p className="card-text">{recipe}</p>
                          </div>
                        )
                    })
                  }
                </div>  
            </div>  
            <div className="form-group">
            
                <label className="col-form-label">Hotel themes : </label> 
                <div className="row">
                  {items.facility.themes.map(recipe => {
                        return (
                          <div className="col-4">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <p className="card-text">{recipe}</p>
                          </div>
                        )
                    })
                  }
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


export default AddHotel;