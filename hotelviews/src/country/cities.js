import React from 'react';


class citiesView extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      statusCheck: '',
      secondsElapsed: 0
    };
    this.dublicateCountryDelete = this.dublicateCountryDelete.bind(this);
    this.updateCityStart = this.updateCityStart.bind(this);
  }
  
  updateCityStart(event){
    if(this.state.secondsElapsed < 80534){
      this.setState({secondsElapsed: this.state.secondsElapsed + 1}); 
      console.log("current process " + this.state.secondsElapsed);
      fetch("http://localhost:8080/hotel/updateCityStart")
      .then(res => res.json())
      .then(
        (resultFilter) => {
          this.setState({
            isLoaded: true,
            statusCheck: resultFilter
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
  dublicateCountryDelete(event) {
   /* this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    var codes = this.state.items[this.state.secondsElapsed].code;
    console.log(codes);
    fetch("http://localhost:8080/hotel/dublicateCountries?code="+ codes)
      .then(res => res.json())
      .then(
        (resultFilter) => {
          this.setState({
            isLoaded: true,
            statusCheck: resultFilter
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )*/
  }
   
   
   
  
  

  componentDidMount() {
    
    fetch("http://localhost:8080/hotel/cities?code=" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          //this.interval = setInterval(this.dublicateCountryDelete, 5000);   //add country
          //this.interval = setInterval(this.updateCityStart, 3000);  //add cities
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

    const { error, isLoaded, items, statusCheck } = this.state;
    var hotelviews = items.map((item, key) => {
      return ( //code":"xc","name":"Crimea",
        <tr>
          <td>{key + 1}</td>
          
          <td><a href={"/hotellist/"+item.code} target="_blank">{item.code}</a></td>
          <td>{item.parent}</td>
          <td>{item.name}</td>
          <td>{item.country}</td>
           
          <td>{item.updated_at}</td>
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

          <div className="rows">
            <div className="card">
              
               
            </div>
          </div>


          <div className="container">
            <h2>total record: {items.length}</h2>
            
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                     <th>#</th>
                    <th>code</th>
                    <th>code</th>
                    <th>city name</th>
                    <th>country name</th>

                    <th>status</th>
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

export default citiesView;