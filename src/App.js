import React, { Component } from 'react';
import { Button, Loader, Dimmer, Segment } from 'semantic-ui-react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import MainView from './components/MainView.js';
import TopNav from './components/TopNav.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import './styles/App.css';

import { app, base } from './base';

const currDate = new Date();

class App extends Component {

  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.state = {
      dates: { },
      authenticated: false,
      currentUser: null,
      loading: true
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('This should change the state!!!' + user)
        this.setState({
          currentUser: user,
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false,
        })
      }
    })
    console.log(this.state.authenticated);
    console.log(this.state.dates);
    this.datesRef = base.syncState('dates', {
      context: this,
      state: 'dates'
    });
  }

  addItem = () => {
    const dates = { ...this.state.songs };
    const id = 'September 2017'
    dates[id] = {
      "individualdates" : ["06.09.2017", "13.09.2017", "20.09.2017", "27.09.2017"],
      "sopran" : "6",
      "alt" : "7",
      "tenor" : "5",
      "bass" : "3"
    };

    this.setState({ dates });
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true,
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  toggleView = () => {
    if (this.state.authenticated){
      this.setState(
        {authenticated: false}
      )
    } else {
      return (
        <Redirect to='/' />
      );
    }
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.datesRef);
  }

  render() {
    const { loading, authenticated, currentUser } = this.state;
    if (loading) {
      console.log('LOADING');
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      )
    }
    return (
      <div>
          <BrowserRouter>
              <div>
                <TopNav authenticated={authenticated} currentUser={currentUser} onClick={this.toggleView} />
                  <div className="ui container" style={{ marginTop: '3em' }}>
                    <Route exact path="/" render={(props) => {
                      console.log(authenticated + 'THIS SHOULD WORK!!');
                      if (authenticated) {
                        console.log('The authenticated has changed ' + authenticated)
                        return (
                          <MainView dates={this.state.dates} currentUser={currentUser} currYear={currDate.getFullYear()} currMonth={currDate.getMonth()} />
                        )
                      } else {
                        console.log('The authenticated has not changed' + this.state.authenticated)
                        return (
                          <Redirect to='/login' />
                        );
                      }
                    }} />
                    <Route path = "/login" render={(props) => {
                      return <Login setCurrentUser={this.setCurrentUser} {...props} />
                    }} />
                    <Route path = "/logout" component={Logout} />
                  </div>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
