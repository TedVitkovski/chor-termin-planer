import React, { Component } from 'react';

import View from './View';

import { app } from '../../base'
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
        switch (error.code) {
          case "auth/wrong-password" :
            error.message = "Der Passwort ist falsch!";
            break;
          case "auth/invalid-email" :
            error.message = "Der Benutzername (Login) ist falsch!";
            break;
          case "auth/user-not-found" :
            error.message = "Der Benutzername (Login) ist falsch!";
        }
        this.setState({ errorMessage: error.message, visible: true });
      })
  }

  render() {
    return (
      <View 
        {...this.props}
        {...this.state}
        handleDismiss = {this.handleDismiss}
        authWithEmailPassword = {this.authWithEmailPassword}
        handleChange = {this.handleChange}
      />
    );
  }
};

export default Login;
