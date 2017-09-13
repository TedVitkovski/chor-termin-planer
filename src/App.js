import React, { Component } from 'react';
import { Button, Loader, Dimmer, Segment, Tab, Menu, Container, Label, Popup } from 'semantic-ui-react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Toggle from 'react-toggle';

import TerminTable from './components/TerminTable.js';
import MainView from './components/MainView.js';
import TopNav from './components/TopNav.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Teilnehmer from './components/Teilnehmer.js';
import Help from './components/Help.js';
import './styles/App.css';

import { app, base } from './base';


const currDate = new Date();


class App extends Component {

  constructor() {
    super();

    this.itemsRef = app.database().ref();
    this.setCurrentUser = this.setCurrentUser.bind(this);

    this.state = {
      dates: { },
      useras: { },
      authenticated: false,
      currentUser: null,
      loading: true,
      month: '',
      userNames: {
        'julianej' : 'Sopran',
        'sabinek' : 'Sopran',
        'gerlindel' : 'Sopran',
        'annez' : 'Sopran',
        'mariannes' : 'Sopran',
        'kerstinb' : 'Alt',
        'renatep' : 'Alt',
        'angelikah' : 'Alt',
        'joerdisp' : 'Alt',
        'annelorer' : 'Alt',
        'barbaras' : 'Alt',
        'mariaw' : 'Alt',
        'martina' : 'Tenor',
        'lotharb' : 'Tenor',
        'sebastianh' : 'Tenor',
        'matthiasr' : 'Tenor',
        'hadriant' : 'Bass',
        'christofw' : 'Bass',
        'rainerw' : 'Bass',
        'alexanderk' : 'Bass'
      }

    }
  }

  componentDidMount() {

    this.datesRef = base.syncState('dates', {
      context: this,
      state: 'dates'
    });

    this.usersRef = base.syncState('useras', {
      context: this,
      state: 'useras',
    });

    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {

        this.state.currentUser = user;

        this.setState({
          currentUser: user,
          authenticated: true,
          loading: false
        })

      } else {

        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false,
        })

      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.datesRef);
    base.removeBinding(this.usersRef);
  }

  onChangeToggle = (e) => {

    const name = this.state.currentUser.email.slice(0, -8);
    const id = e.target.id;
    const dates = { ...this.state.dates };
    const useras = { ...this.state.useras };
    const { month } = this.state;
    const userVoice = this.state.userNames[name];



    console.log(id);
    let dateId = id.slice(2, 3);
    let checkArrId = id.slice(3, 4);
    const dateObj = Object.values(dates[month])[0];
    const dateObjKeys = Object.keys(dateObj);

    if (dateId == 0) {
      dateId = 3;
    } else {
      dateId = dateId - 1;
    }

    const date = dateObjKeys[dateId];

    let currSopran = dates[month].individualdates[date].sopran
    let currAlt = dates[month].individualdates[date].alt
    let currTenor = dates[month].individualdates[date].tenor
    let currBass = dates[month].individualdates[date].bass
    console.log(currSopran + ' Der SOPRANO!!');


    if (e.target.checked) {
      const i = dates[month].individualdates[date].names.indexOf(name);
      if (i != -1) {
        dates[month].individualdates[date].names.splice(i, 1);
        switch(userVoice) {
          case 'Sopran' :
            dates[month].individualdates[date].sopran = ++currSopran;
            break;
          case 'Alt' :
            dates[month].individualdates[date].alt = ++currAlt;
            break;
          case 'Tenor' :
            dates[month].individualdates[date].tenor = ++currTenor;
            break;
          case 'Bass' :
            dates[month].individualdates[date].bass = ++currBass;
            break;
        }
        this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = true;
      }
    } else {
      dates[month].individualdates[date].names.push(name);

      switch(userVoice) {
        case 'Sopran' :
          dates[month].individualdates[date].sopran = --currSopran;
          break;
        case 'Alt' :
          dates[month].individualdates[date].alt = --currAlt;
          break;
        case 'Tenor' :

          dates[month].individualdates[date].tenor = --currTenor;
          break;
        case 'Bass' :
          dates[month].individualdates[date].bass = --currBass;
          break;
      }

      this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = false;
    }
    this.setState({ dates });
    this.setState({ useras });

  }

  mainRenderer = () => {
    const dates = { ...this.state.dates }
    const months = Object.keys(dates);
    let counter = 0;

    let verticalPanesObj = {};
    let verticalPanesArr = [];

    for (let i = 0; i < months.length; i++) {
      const individualDates = Object.keys(dates[months[i]].individualdates);
      for (let j = 0; j < individualDates.length; j++) {
        console.log(individualDates[j]);
        const tempDate = individualDates[j];
        const tempMonthFirstStep = tempDate.slice(0, -4);
        const tempMonth = tempMonthFirstStep.slice(2, 4);
        const tempYear = tempDate.slice(4);
        const dd = tempDate.slice(0, 2)

        const stringDate = dd.toString() + '.' + tempMonth.toString() + '.' + tempYear.toString()



        const tempId = tempMonth.toString() + j.toString() + counter.toString();
        if (j !== individualDates.length - 1) {
          verticalPanesArr.push(this.renderVerticalPane(tempDate, stringDate, tempMonth, tempYear, tempId));
        } else {
          verticalPanesArr.unshift(this.renderVerticalPane(tempDate, stringDate, tempMonth, tempYear, tempId));
          verticalPanesObj[months[i]] = verticalPanesArr;
          verticalPanesArr = [];
        }

        if (j === individualDates.length - 1) {

        }
        console.log(this.monthToString(tempMonth - 1));
        console.log(dates[`${this.monthToString(tempMonth - 1)} ${tempYear}`].individualdates[tempDate].names);

        console.log(verticalPanesObj);
        counter++;
      }
    }
    return verticalPanesObj;
  }

  renderVerticalPane = (currDate, currDateString, currMonth, currYear, currId) => {
    return {
      menuItem:
        <Menu.Item>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{marginRight: '2em'}}>{currDateString}</span>
            <label>
              <Toggle
                id={currId}
                key={currId.slice(0, -1)}
                defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[0]}
                onChange={this.onChangeToggle}
              />
            </label>
          </div>
        </Menu.Item>,
      render:
        () => <Tab.Pane>
        <TerminTable
        names={this.state.dates[`${this.monthToString(currMonth - 1)} ${currYear}`].individualdates[`${currDate}`].names}
        sopran={this.state.dates[`${this.monthToString(currMonth - 1)} ${currYear}`].individualdates[`${currDate}`].sopran}
        alt={this.state.dates[`${this.monthToString(currMonth - 1)} ${currYear}`].individualdates[`${currDate}`].alt}
        tenor={this.state.dates[`${this.monthToString(currMonth - 1)} ${currYear}`].individualdates[`${currDate}`].tenor}
        bass={this.state.dates[`${this.monthToString(currMonth - 1)} ${currYear}`].individualdates[`${currDate}`].bass}
        /></Tab.Pane>

    }
  }


  addItem = () => {
    const dates = { ...this.state.dates };
    const months = ['September 2017', 'Oktober 2017'];

    for (let i = 0; i < months.length; i++) {
      dates[months[i]] = {
        individualdates : {

        }
      }
    }

    for (let i = 0; i < this.state.individualDates.length; i++) {
      let individualMonthDates = this.state.individualDates[i];
      let month = months[i];
      for (let j = 0; j < individualMonthDates.length; j++){
        dates[month].individualdates[individualMonthDates[j]] = {
          names: ['Fedor'],
          sopran: '6',
          alt: '8',
          tenor: '5',
          bass: '5'
        }
      }
    }

    this.setState({ dates });
  }

  addTermin = (date) => {
    console.log(date + 'YES!!');
  }



  addUser = () => {
    const useras = { ...this.state.useras };
    console.log(this.state.currentUser.uid);
    useras[this.state.currentUser.uid] = {
      clickArr: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true
      }
    }
    this.setState({ useras });
  }

  setCurrentUser = (user) => {
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

  myCallback = (dataFromChild) => {
    this.setState({ month: dataFromChild });
  }

  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  /* This helper function turn a month into a string */
  monthToString = (month) => {
    console.log('HELP ME!' + this.props.verticalPanes);
    const monthNames = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ];
    return monthNames[month];
  };


  render() {

    const { loading, authenticated, currentUser } = this.state;

    /* if (loading) {
      console.log('LOADING');
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      )
    } */

    return (
      <div>
          <BrowserRouter>
              <div>
                <TopNav authenticated={authenticated} currentUser={currentUser} onClick={this.toggleView} addTermin={this.addTermin} buttonOnClick={this.addUser}  />
                  <div className="ui container" style={{ marginTop: '3em' }}>
                    <Route exact path="/" render={(props) => {
                      console.log(authenticated + 'THIS SHOULD WORK!!');
                      if (authenticated) {
                        console.log('The authenticated has changed ' + authenticated)
                        return (
                          <MainView
                            verticalPanes = {this.mainRenderer()}
                            currMonth = {currDate.getMonth()}
                            currYear = {currDate.getFullYear()}
                            callbackFromParent = {this.myCallback}
                            onClick = {this.incrementBass}
                          />
                        )
                      } else {
                        console.log('The authenticated has not changed' + this.state.authenticated)
                        return (
                          <Redirect to='/login' />
                        );
                      }
                    }} />
                    <Route path = "/teilnehmer" render={(props) => {
                      if (authenticated) {
                        return (
                          <Teilnehmer />
                        )
                      } else {
                        return (
                          <Redirect to='/login' />
                        )
                      }
                    }}/>
                    <Route path = "/help" component={Help} />
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
