import React from 'react';

class HotelVoucher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []

    };
  }
  componentDidMount() {
    //console.log('Component DID UPDATE! yogeshhhhhhhhhhhhhhh');
    fetch("http://127.0.0.1:8080/hotel?code=175141")
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
          <div className="card mt-md-2">
            <div className="rows">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{items.name} / start: {items.star}  </h5>
                  <p className="card-text">address: {items.addr} / Location :  ({items.locat})  </p>
                  <p className="card-text">address: {items.addr} / Location :  ({items.locat})  </p>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Rooms & rates
                </div>
                <div className="card-body">
                <div className="row">
                    <div className="col"><b>Deluxe Room : </b> Room only rate</div>
                    <div className="col"><b>Deluxe Room : </b> Room only rate</div>
                    <div className="w-100"></div>
                    <div className="col"><b>Check-In Date : </b>  2018-02-19</div>
                    <div className="col"><b>Check-Out Date :</b> 2018-02-20 </div>
                    <div className="col"> <b>Total Nights :  </b>  1</div>
                    <div className="col"><b>Total Price : </b> INR 1161</div>
                  </div>
                  </div>                  
              </div>
            </div>            
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Guest Details
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col"><b>Name : </b>  Yug Hotel Developer</div>
                    <div className="col"><b>Contact number :</b> +91-888-888-8888 </div>
                    <div className="w-100"></div>
                    <div className="col"> <b>city :  </b>  Delhi, India</div>
                    <div className="col"><b>Email id : </b> demo@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="card">
                <div className="card-header">
                  Terms Of Payment
                </div>
                <div className="card-body">
                  <h5 className="card-title">For xyz Pvt Ltd. </h5>
                  <p className="card-text">1. CASH : Payment is to be made directly to our cashier.</p>
                  <p className="card-text">2. CHEQUE : Cheques should be drawn in favour of Companys Name and payable at Bangalore</p>
                  <p className="card-text">3. RECEIPTS : Official Receipt duly signed will be considered valid.</p>
                  <p className="card-text">E.&O.E. Subject To Jurisdiction Only	Auth. Signatory</p>
                  <p className="card-text">Note: Please Note This is Payment Purpose Only Not a valid as a Hotel voucher This is Computer generated reciept so no need Signature</p>
                  <p className="card-text">Thanks for choosing @ . </p>
                  <h5 className="card-title"> Thanking you,</h5>
                  <p className="card-text">Registration,</p>
                  <p className="card-text">xyz Pvt Ltd. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default HotelVoucher;