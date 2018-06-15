import React from 'react';
import SearchHotel from './searchHotel';


class Home extends React.Component {
    render() {
        return (

            <div className="container">
                <div className="rows mt-md-3">
                    <h3>Search for hotels</h3>
                    <p>Over 6,00,000 hotels around the world</p>
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
                                <div className="card-footer bg-transparent">USD 80</div>
                            </div>
                        </div>
                        <div className="card ml-3">
                            <div className="card   mb-3">
                                <div className="card-header bg-transparent">ibis Bangkok Nana</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">USD 81</div>
                            </div>
                        </div>    <div className="card ml-3">
                            <div className="card   mb-3">
                                <div className="card-header bg-transparent">ibis Bangkok Riverside</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">USD 82</div>

                            </div>
                        </div>
                        <div className="card ml-3">
                            <div className="card mb-3">
                                <div className="card-header bg-transparent">Ibis Bangkok Siam</div>
                                <div className="card-body">
                                    <h5 className="card-title">Success card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer bg-transparent">USD 83</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;