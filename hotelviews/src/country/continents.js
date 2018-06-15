import React from 'react';
 


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
  }
  componentDidMount() {
  fetch("http://localhost:8080/hotel/continents")
      .then(res => res.json())
      .then(
        (result) => {
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
      return ( 
        <tr>
          <td>{key + 1}</td>
          <td><a href={"/country/" + item.code} target="_blank">{item.code}</a></td>
          <td>{item.name}</td>
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
            <h2>total continents : {items.length}</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>continent code</th>
                    <th>continent name</th>
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