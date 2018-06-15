import React from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const STATES = require('./cities');


class SearchHotel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      searchable: "DURRES, ALBANIA",
      selectValue: 2,
      clearable: false,
      isLoaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.autoSearch = this.autoSearch.bind(this);
  }
  autoSearch(event) {
    if (event !== null) {
      this.setState({
        searchable: event.label,
        selectValue: event.value
      });
    }
  }

  handleSubmit(event) {
    this.setState({
      isLoaded: true,
    });
    event.preventDefault();
  }

  render() {
    if (this.state.isLoaded === true) {
      var aaa = '/packages?id=' + this.state.selectValue;
      return <Redirect to={aaa} />
    }

    const { startDate, endDate } = this.state;
    var optionsIN = STATES['IN']; 

    return (
      <div className="rows mt-md-3">

        <form method="GET" ref="myForm" className="needs-validation" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <label>Destination</label>
              <Select
                id="state-select"
                ref={(ref) => { this.select = ref; }}
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                autoFocus
                options={optionsIN}
                name="des"
                clearable={this.state.clearable}
                disabled={this.state.disabled}
                value={this.state.selectValue}
                onChange={this.autoSearch}
                rtl={this.state.rtl}
                searchable={this.state.searchable}
              />
            </div>

            <div className="col">
              <div className="mt-md-2"><br />
                <input className="btn btn-primary" type="submit" value="Search Hotels" />
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default SearchHotel;
