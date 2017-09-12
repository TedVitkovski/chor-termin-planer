import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';


class NewTerminForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      closeOnSelection: true,
      disabled: false,
      openOnFocus: true,
      format: 'MM/DD/YYYY'

    }
  }
  render() {
    return(
      <div>
        <Form>
          <Form.Input placeholder='Datum...' />
        </Form>
      </div>
    )
  }
}

export default NewTerminForm;
