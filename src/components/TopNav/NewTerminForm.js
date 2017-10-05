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
      date: ''
    }
  }

  createTermin(event) {
    event.preventDefault();

    this.props.addTermin(this.state.date);

    this.terminForm.reset();
    this.props.postSubmitHandler();
  }

  render() {
    return(
      <form
        onSubmit={(event => this.createTermin(event))}
        ref={(form) => this.terminForm = form}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <TextField
          id="date"
          ref={(input) => { this.dateInput = input }}
          label="Datum"
          type="date"
          style={{maxWidth: '150px'}}
          value={this.state.date}
          onChange={event => this.setState({ date: event.target.value })}
        />
        <Form.Button
          type='submit'
          style={{marginLeft: '1em'}}
        >
          Erstellen
        </Form.Button>
      </form>
    )
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
}

export default NewTerminForm;
