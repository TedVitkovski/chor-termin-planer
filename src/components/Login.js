import React, { Component } from 'react';
import { Form, Container, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { app } from '../base'
class Login extends Component {

  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
      errorMessage: '',
      visible: false,
      login: '',
      password: '',
      submittedName: '',
      submittedPassword: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { login, password } = this.state;

    this.setState({redirect: true, login: '', password: '', submittedName: login, submittedPassword: password});
  }

  handleDismiss = () => {
    this.setState({ visible: false });
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    const { login, password } = this.state;

    const subLogin = login + '@mail.de';
    const subPassword = password;

    app.auth().fetchProvidersForEmail(subLogin)
      .then((providers) => {
        /*if (providers.length === 0) {
          return app.auth().createUserWithEmailAndPassword(subLogin, subPassword);
        } else { */
          return app.auth().signInWithEmailAndPassword(subLogin, subPassword);
      })
      .then((user) => {
        if (user && user.email) {
          this.props.setCurrentUser(user);
          this.setState({redirect: true, login: '', password: ''})
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message, visible: true });
      })


  }


  render() {
    const { login, password, submittedName, submittedPassword, redirect } = this.state;
    if (redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.state.visible && <Message error onDismiss={this.handleDismiss} header='Fehler!' content={this.state.errorMessage} />}
        </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4em'}}>
            <Form className='segment' size={'large'} onSubmit={this.authWithEmailPassword}>
                <Form.Input label='Login: ' type='text' name='login' value={login} placeholder='Login...' onChange={this.handleChange} />
                <Form.Input label='Passwort: ' type='password' name='password' value={password} placeholder='Passwort...' onChange={this.handleChange} width='16' />
                <Form.Button content='Einloggen' />
            </Form>
        </div>
      </div>
    );
  }
};

export default Login;
