import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const newSongStyles = {
  padding: '10px'
}

class NewTerminForm extends Component {

  constructor(props) {
    super(props);
    this.createTermin = this.createTermin.bind(this);
    this.state = {
      startDate: moment()
    }
  }

  createTermin(event) {
    event.preventDefault();

    console.log('This was hit');

    this.terminForm.reset();
    this.props.postSubmitHandler();
  }

  render() {
    return(
      <Form style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <DatePicker
            dateFormat='DD/MM/YYYY'
            selected={this.state.startDate}
            onChange={this.handleChange.bind(this)}
        />
        <Form.Button style={{marginLeft: '1em'}}>Erstellen</Form.Button>
      </Form>
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
}

export default NewTerminForm;
