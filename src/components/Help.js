import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }
  
  render() {
    return (
      <div style={{marginTop: '5em'}}>
        <DatePicker
            selected={moment()}
            onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

}

export default Help;
