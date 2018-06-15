import React from 'react';
//import { Redirect } from 'react-router-dom';
//import { queryString } from 'query-string';


class hotelList extends React.Component {
  constructor(props) {
    super(props);
    var urlStoreR = window.location.toString();
    var urlStoreRed = urlStoreR.split("?");

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      totalRecord: 0,
      itemPrice: [],
      itemCode: [],
      urlStore: urlStoreRed[1],
      shows: 10
    };
    this.showMore = this.showMore.bind(this);
  }
  showMore(event) {
    var finalshow = this.state.shows + 10;
    this.setState({shows: finalshow});

    var strUrl = '';
    if(this.props.queryStringUrl === ''){
        strUrl = '?l1='+ finalshow +'&l2='+ finalshow;
    }else{
        strUrl = this.props.queryStringUrl +'&l1=500&l2='+ finalshow;
    }

     

    fetch("http://127.0.0.1:8080/hotel/hotellist"+ strUrl)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('Component DID UPDATE');
          this.setState({
            isLoaded: true,
            items: result[0].hotel,
            totalRecord: result[0].hotel.length,
            itemPrice: result[0].prices,
            itemCode: result[0].codes
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

  componentDidUpdate(prevProps, prevState) {


    if (prevProps.queryStringUrl !== this.props.queryStringUrl) {

      fetch("http://127.0.0.1:8080/hotel/hotellist" + this.props.queryStringUrl +"&l1=500&l2="+ this.state.shows)
        .then(res => res.json())
        .then(
          (result) => {
            //console.log(result);
            this.setState({
              isLoaded: true,
              items: result[0].hotel,
              totalRecord: result[0].hotel.length,
              itemPrice: result[0].prices,
              itemCode: result[0].codes
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


    fetch("http://127.0.0.1:8080/hotel/hotellist?l1="+ this.state.shows +'&l2='+ this.state.shows)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log('Component DID UPDATE');
          this.setState({
            isLoaded: true,
            items: result[0].hotel,
            totalRecord: result[0].hotel.length,
            itemPrice: result[0].prices,
            itemCode: result[0].codes
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

    const { error, isLoaded, items, itemPrice, itemCode, urlStore } = this.state;
 
    var hotelviews = items.map((item, key) => {
      var code = (item.code);
      var codeindex = itemCode.indexOf(code);
      var Pricesview = itemPrice[codeindex];
      var starLab = item.star;
      if(item.star === 11){  starLab = ""; } 
      return (
        <div className="card mt-md-2">
          <div className="row">
            <div className="col-xs-2 col-lg-2">
              <img className="card-img-top" src={item.img} alt={item.name} />
            </div>
            <div className="col">
              <div className="card-body">
                <h5 className="card-title">{item.name} / start: {starLab} <span className="float-right">${Pricesview}  </span> </h5>
                <p className="card-text">address: {item.addr} / Zip: {item.zip} <span className="float-right"> <a target="_blank" href={"/hotel/" + item.code + '?' + urlStore} className="btn btn-primary"> - Select Rooms</a></span> </p>
              </div>
            </div>
          </div>
        </div>

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
          view record : {items.length}
          {hotelviews}

{this.state.totalRecord === 0 && <h1>hotel are not available</h1>}
{this.state.totalRecord !== 0 && <p><button onClick={this.showMore}>ShowMore</button></p>}
          
        </div>
      );
    }
  }
}

export default hotelList;