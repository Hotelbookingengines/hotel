import React from 'react';
//import createClass from 'create-react-class';
//import PropTypes from 'prop-types';
import Select from 'react-select';
//import fetch from 'isomorphic-fetch';


class GithubUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
    onChangeFilter(value) {
        console.log("=====");
        console.log(value);
        this.setState({
            valueFilter: value,
        });
    }
    getUsers(input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return fetch(`https://api.github.com/search/users?q=${input}`)
            .then((response) => response.json())
            .then((json) => {
                return { options: json.items };
            });
    }
    render() {
        const AsyncComponent = Select.Async;
        return (
            <div className="section">
                <AsyncComponent value={this.state.valueFilter} onChange={this.onChangeFilter} valueKey="id" labelKey="login" loadOptions={this.getUsers} />
                <div className="hint">This example uses fetch.js for showing Async options with Promises</div>
            </div>
        );
    }
};

export default GithubUsers;