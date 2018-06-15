import React from 'react';
import { Redirect } from 'react-router-dom';

class packageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      totalRecord: 0,
    };

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryStringUrl !== this.props.queryStringUrl) {
      fetch("http://127.0.0.1:8080/hotellist" + this.props.queryStringUrl)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result);
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
  }


  componentDidMount() {
    //console.log('Component DID UPDATE! yogeshhhhhhhhhhhhhhh');
    fetch("http://127.0.0.1:8080/packages")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
            totalRecord: result.length
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
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          Total : {items.length} out of {this.state.totalRecord}
          {items.map(item => (


            <div className="card mt-md-2">
              <div className="row">
                <div className="col-xs-2 col-lg-2">
                  <img className="card-img-top" src={item.img} alt="Card image" />
                </div>
                <div className="col">
                  <div className="card-body">
                    <h5 className="card-title">{item.name} / start: {item.star} <span className="float-right">Price : {item.price}  </span> </h5>
                    <p className="card-text"> <span className="float-right"> <a target="_blank" href={"/hotel/" + item.code} className="btn btn-primary">Details</a></span> </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}


export default packageList;