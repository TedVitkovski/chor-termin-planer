import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const newSongStyles = {
  padding: '10px'
}

class NewTerminForm extends Component {

  constructor(props) {
    super(props);
    this.createTermin = this.createTermin.bind(this);
    this.state = {
      startDate: new Date()
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
        <TextField
          id="date"
          label="Datum"
          type="date"
          style={{maxWidth: '150px'}}
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
