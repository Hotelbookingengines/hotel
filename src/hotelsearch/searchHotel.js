import React from 'react';
import { Redirect } from 'react-router-dom';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const STATES = require('./../data/states');


class SearchHotel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destinations: 'Bangalore',
      startDate: moment(moment(), "DD-MM-YYYY").add(3, 'days'),
      endDate: moment(moment(), "DD-MM-YYYY").add(4, 'days'),
      rooms: 1,
      adult: 2,
      adults: ["2", "2", "2", "2", "2"],
      child: 0,
      childs: ["0", "0", "0", "0", "0"],
      childsAge: [],
      disabled: false,
      searchable: '',
      selectValueNation: 77,
      searchableNation: '',
      selectValue: 2,
      clearable: false,
      isLoaded: false,
      queryStrURL: ''

    };
    this.roomsChange = this.roomsChange.bind(this);
    this.adultsChange = this.adultsChange.bind(this);
    this.childsChange = this.childsChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.autoSearch = this.autoSearch.bind(this);
    this.autoSearchNation = this.autoSearchNation.bind(this);
    this.childAgeChange = this.childAgeChange.bind(this);
  }


  roomsChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
    console.log(this.state);
  }
  adultsChange(event) {
    var change = this.state.adults[event.target.name] = event.target.value;
    this.setState({ change });
    console.log(this.state.adults);
  }
  childsChange(event) {
    var change = this.state.childs[event.target.name] = event.target.value;
    this.setState({ change });
    console.log(this.state.childs);
  }
  childAgeChange(event) {
    //this.state.childsAge.push(event.target.value);
    var change = this.state.childsAge[event.target.name] = event.target.value;
    this.setState({ change });

  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      searchable: event.value
    });
  }
  autoSearch(event) {
    if (event !== null) {
      this.setState({
        searchable: event.label,
        selectValue: event.value
      });
    }
  }
  autoSearchNation(event) {
    if (event !== null) {
      this.setState({
        searchableNation: event.label,
        selectValueNation: event.value
      });
    }
  }

  handleSubmit(event) {
    var myArray = this.state.childsAge;
    var aaa = '';
    for (var key in myArray) {
      aaa += myArray[key] + ',';
      console.log("key " + key + " has value " + myArray[key]);
    }
 
    const dateUpdate = this.state.startDate.format('YYYY-MM-DD') + '&ed=' + this.state.endDate.format('YYYY-MM-DD');
    const strURL = 'des=' + this.state.selectValue + '&nat=' + this.state.selectValueNation + '&st=' + dateUpdate + '&r=' + this.state.rooms + '&a=' + this.state.adults + '&c=' + this.state.childs + '&h=' + aaa;

    console.log('----');
    console.log(strURL);
    console.log('----');
    this.setState({
      queryStrURL: strURL
    });

    fetch('http://127.0.0.1:8080/searchHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryUrl: strURL
      })
    })
      .then(
        (resultFilter) => {

          this.setState({
            isLoaded: true,
          });

        },

        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )


    //    this.props.history.push('/hotels?'+strURL);
    event.preventDefault();
  }


  render() {

    if (this.state.isLoaded === true) {
      var aaa = '/hotels?' + this.state.queryStrURL;
      return <Redirect to={aaa} />
    }

    const { startDate, endDate } = this.state;
    var optionsUS = STATES['US'];
    var optionsAU = STATES['AU'];



    var characteristics = this.state.adults.map((fullbox, key) => {
      if (this.state.rooms > key) {


        var childage = [];

        for (var i = 0; i < this.state.childs[key]; i++) {
          var nameofchildage = ('c' + key + '' + i);
          var childageVal = this.state.childsAge[nameofchildage];
          childage.push(
            <div className="col">
              <label>Child age: </label>
              <select name={nameofchildage} value={childageVal} className="form-control" onChange={this.childAgeChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          );
        }

        return (
          <div className="row">
            <div className="col">
              <label>Adult: </label>
              <select name={key} className="form-control" readOnly value={this.state.adults[key]} onChange={this.adultsChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col">
              <label>Child: </label>
              <select name={key} className="form-control" readOnly value={this.state.child[key]} onChange={this.childsChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            {childage}
          </div>
        );
      }
    });

    return (
      <div className="rows mt-md-3">

        <form method="GET" ref="myForm" action="./hotels" className="needs-validation" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <label>Destination</label>
              <Select
                id="state-select"
                ref={(ref) => { this.select = ref; }}
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                autoFocus
                options={optionsUS}
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
              <label>Checking Date</label><br />
              <DateRangePicker
                displayFormat="DD-MM-YYYY"
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="st" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="ed" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </div>
            <div className="col">
              <label>Nationality</label>
              <Select
                id="nationality-select"
                ref={(ref) => { this.select = ref; }}
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                autoFocus
                options={optionsAU}
                name="nationality"
                clearable={this.state.clearable}
                disabled={this.state.disabled}
                value={this.state.selectValueNation}
                onChange={this.autoSearchNation}
                rtl={this.state.rtl}
                searchable={this.state.searchableNation}
              />
            </div>

          </div>
          <div className="row mt-md-3">
            <div className="col col-xs-2 col-lg-2">
              <label>Rooms</label>
              <select name="rooms" className="form-control" value={this.state.rooms} onChange={this.roomsChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

              </select>
            </div>
            <div className="col">
              {characteristics}
            </div>
            <div className="col col-xs-2 col-lg-2">
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
