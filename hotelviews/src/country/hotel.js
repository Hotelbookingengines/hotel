import React from 'react';


class hotelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      statusCheck: '',
      secondsElapsed: 130
    };
    this.dublicateCountryDelete = this.dublicateCountryDelete.bind(this);
    //this.addHotelData = this.addHotelData.bind(this);
  }
  
  /*addHotelData(event){
    if(this.state.secondsElapsed < 137){
      var codes = this.state.secondsElapsed;
      fetch("http://localhost:8080/hotel/hotelsproHotelsAdd?code="+ codes)
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
      this.setState({secondsElapsed: this.state.secondsElapsed + 1}); 
      console.log("current process hotel " + this.state.secondsElapsed);
      
    }
    

  }*/
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
    
    fetch("http://localhost:8080/hotel/hotelview?code=" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          //this.interval = setInterval(this.dublicateCountryDelete, 5000);   //add country
          //this.interval = setInterval(this.addHotelData, 13000);  //add cities
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

    //http://localhost:3000/hotel/10a395?des=12fa1&nat=in&st=2018-06-04&ed=2018-06-05&r=1&a=2,2,2,2,2&c=0,0,0,0,0&h=
    const { error, isLoaded, items, statusCheck } = this.state;
    var hotelviews = items.map((item, key) => {
      return ( //code":"xc","name":"Crimea",
        <tr>
          <td>{key + 1}</td>
          <td><a href={"/hotel/"+item.code} target="_blank">{item.code}</a></td>
          <td>{item.name}</td>
          <td>{item.stars}</td>
          <td>{item.address}</td>
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
                    <th>hotel name</th>
                    <th>stars</th>
                    <th>address</th>
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

export default hotelView;