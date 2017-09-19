import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import { app } from '../base';

class Logout extends Component {

  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
	console.log('Logout is mounted!');
    app.auth().signOut().then((user) => {
	  console.log('SIGNED OUT!!!!!!!!!!')
      this.setState({ redirect: true })
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      </div>
    );
  }
}

export default Logout;
