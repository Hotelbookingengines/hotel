import React from 'react';
//import PaypalExpressBtn from 'react-paypal-express-checkout';



class countryView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      statusCheck: '',
      secondsElapsed: 0
    };
    this.addCountriesSubmit = this.addCountriesSubmit.bind(this);
    this.dublicateCountryDelete = this.dublicateCountryDelete.bind(this);


    this.addCityStart = this.addCityStart.bind(this);


  }

  addCityStart(event) {
    if (this.state.secondsElapsed < 80) {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
      console.log("current process " + this.state.secondsElapsed);
      fetch("http://localhost:8080/hotel/hotelsproCitiesAdd?page=" + this.state.secondsElapsed)
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
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    var codes = this.state.items[this.state.secondsElapsed].code;
    console.log(codes);
    fetch("http://localhost:8080/hotel/dublicateCountries?code=" + codes)
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



  addCountriesSubmit(event) {
    fetch("http://localhost:8080/hotel/addCountries")
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
    event.preventDefault();
  }


  componentDidMount() {

    fetch("http://localhost:8080/hotel/countries?code="+ this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          //this.interval = setInterval(this.dublicateCountryDelete, 20000);   //add country
          //this.interval = setInterval(this.addCityStart, 10000);  //add cities
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

   /* const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
    }

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
      console.log("Error!", err);
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = 1;

    const client = {
      sandbox: 'APP-80W284485P519543T',
      production: 'YOUR-PRODUCTION-APP-ID',
    }
      <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    */       

    const { error, isLoaded, items, statusCheck } = this.state;
    //var counter = 0;
    var hotelviews = items.map((item, key) => {
      //counter = item.count + counter;
      return ( //code":"xc","name":"Crimea",
        <tr>
          <td>{key + 1}</td>
          <td><a href={"/city/" + item.code} target="_blank">{item.code}</a></td>
          <td>{item.name}</td>
          <td>{item.count} </td>
          
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
            <div className="card">
              <form className="needs-validation" onSubmit={this.addCountriesSubmit}>
                <div className="col col-xs-2 col-lg-2">
                  <div className="mt-md-2"><br />
                    final msg: {statusCheck.status}
                    <input className="btn btn-primary" type="submit" value="add country" />
                  </div>
                </div>
              </form>

            </div>
          </div>


          <div className="container">
            <h2>country : {items.length}</h2>
            <p> Test Booking</p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>country code</th>
                    <th>country name</th>
                    <th>count</th>
                    
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

export default countryView;