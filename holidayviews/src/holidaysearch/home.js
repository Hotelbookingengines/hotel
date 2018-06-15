import React from 'react';
import SearchHotel from './searchHotel';


class Home extends React.Component {
    render() {
        return (

            <div className="container">
                <div className="rows mt-md-3">
                    <h3>Customize & Book</h3>
                    <h3>Amazing Holiday Packages</h3>
                    <p>650+ Travel Agents serving 65+ Destinations worldwide</p>
                </div>

                <SearchHotel />

                <div className="row mt-5">
                    <div className="card-group">

                        <div className="card ml-3">
                            <div className="card">
                                <div className="card-header bg-transparent">ibis Bangkok Sathorn</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">Price : RS 80</div>
                            </div>
                        </div>
                        <div className="card ml-3">
                            <div className="card   mb-3">
                                <div className="card-header bg-transparent">ibis Bangkok Nana</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">Price : RS 81</div>
                            </div>
                        </div>    <div className="card ml-3">
                            <div className="card   mb-3">
                                <div className="card-header bg-transparent">ibis Bangkok Riverside</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">Price : RS 82</div>

                            </div>
                        </div>
                        <div className="card ml-3">
                            <div className="card mb-3">
                                <div className="card-header bg-transparent">Ibis Bangkok Siam</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">Price : RS 83</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;