import React, { Component } from 'react';
import { app } from '../../base';

import View from './View';

class Logout extends Component {

  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    });
  }

  render() {
    return (
      <View {...this.state} />
    )
  }
}

export default Logout;
