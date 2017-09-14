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

import { monthToString } from './helperFunctions.js';

import './styles/App.css';

import { app, base } from './base';


const currDate = new Date();


class App extends Component {

  constructor() {
    super();

    this.setCurrentUser = this.setCurrentUser.bind(this);

    this.state = {
      dates: { },
      useras: { },
      authenticated: false,
      currentUser: null,
      loading: true,
      monthYear: '',
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

  /**
   * onChangeToggle gets called every time the user clicks on the Toggle button.
   * The name of the user gets pushed into the names array and the numbers on the
   * bottom of the table get updated (via switch statement). The user's clickarray
   * gets updated as well.
   * @function
   */
  onChangeToggle = (e) => {

    const name = this.state.currentUser.email.slice(0, -8);
    const id = e.target.id;
    const dates = { ...this.state.dates };
    const useras = { ...this.state.useras };
    const { monthYear } = this.state;
    const userVoice = this.state.userNames[name];

    const dateId = id.slice(2, 3);
    const checkArrId = id.slice(3, id.length);
    console.log(checkArrId);
    console.log(id);

    const dateObj = Object.values(dates[monthYear])[0];
    const dateObjKeys = Object.keys(dateObj);
    const sortedDateObjKeys = this.sortIndividualDates(dateObjKeys);
    const date = sortedDateObjKeys[dateId];
    console.log('::::::::::::::::::::::::::::::::::::::::')
    console.log(date);
    console.log('::::::::::::::::::::::::::::::::::::::::')
    let currSopran = dates[monthYear].individualdates[date].sopran
    let currAlt = dates[monthYear].individualdates[date].alt
    let currTenor = dates[monthYear].individualdates[date].tenor
    let currBass = dates[monthYear].individualdates[date].bass

    if (e.target.checked) {
      const i = dates[monthYear].individualdates[date].names.indexOf(name);

      if (i != -1) {
        dates[monthYear].individualdates[date].names.splice(i, 1);
        switch(userVoice) {
          case 'Sopran' :
            dates[monthYear].individualdates[date].sopran = ++currSopran;
            break;
          case 'Alt' :
            dates[monthYear].individualdates[date].alt = ++currAlt;
            break;
          case 'Tenor' :
            dates[monthYear].individualdates[date].tenor = ++currTenor;
            break;
          case 'Bass' :
            dates[monthYear].individualdates[date].bass = ++currBass;
            break;
        }
        this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = true;
      }
    } else {
      dates[monthYear].individualdates[date].names.push(name);
      switch(userVoice) {
        case 'Sopran' :
          dates[monthYear].individualdates[date].sopran = --currSopran;
          break;
        case 'Alt' :
          dates[monthYear].individualdates[date].alt = --currAlt;
          break;
        case 'Tenor' :
          dates[monthYear].individualdates[date].tenor = --currTenor;
          break;
        case 'Bass' :
          dates[monthYear].individualdates[date].bass = --currBass;
          break;
      }
      this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = false;
    }
    this.setState({ dates });
    this.setState({ useras });
  }

  sortIndividualDates = (individualDates) => {
    let sortedArr = [];
    let days = [];
    for (let i = 0; i < individualDates.length; i++) {
      let tempDate = individualDates[i];
      const tempDay = tempDate.slice(0, 2);
      days.push(tempDay);
    }
    days.sort();
    for (let i = 0; i < individualDates.length; i++) {
      let tempDate = individualDates[i];
      const tempRest = tempDate.slice(2, 8);
      const newDate = days[i] + tempRest;
      sortedArr.push(newDate);
    }
    return sortedArr;
  }


  /**
   * The mainRenderer function returns an object with all vertical panes by reading all
   * required data from the database and making a call to renderVerticalPane for each dataset.
   * @function
   */
  mainRenderer = () => {
    const dates = { ...this.state.dates }
    console.log('---------------------------------------')
    console.log(dates);
    console.log('---------------------------------------')
    const months = Object.keys(dates);
    let counter = 0;

    let verticalPanesObj = {};
    let verticalPanesArr = [];

    for (let i = 0; i < months.length; i++) {
      const individualDatesUnsorted = Object.keys(dates[months[i]].individualdates);
      const individualDates = this.sortIndividualDates(individualDatesUnsorted);
      for (let j = 0; j < individualDates.length; j++) {
        let tempDate = individualDates[j];
        const tempMonthFirstStep = tempDate.slice(0, -4);
        const tempMonth = tempMonthFirstStep.slice(2, 4);
        const tempYear = tempDate.slice(4);
        const tempDay = tempDate.slice(0, 2)

        const stringDate = tempDay.toString() + '.' + tempMonth.toString() + '.' + tempYear.toString()

        const tempId = tempMonth.toString()  + j.toString() + counter.toString();
        verticalPanesArr.push(this.renderVerticalPane(tempDate, stringDate, tempMonth, tempYear, tempId));
        counter++;
      }
      verticalPanesObj[months[i]] = verticalPanesArr;
      verticalPanesArr = [];
    }
    return verticalPanesObj;
  }

  /**
   * The renderVerticalPane function constructs with given parameters
   * and returns exactly one vertical pane object.
   * @function
   */
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
        () =>
        <Tab.Pane>
          <TerminTable
            names={this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`].individualdates[currDate].names}
            sopran={this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`].individualdates[currDate].sopran}
            alt={this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`].individualdates[currDate].alt}
            tenor={this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`].individualdates[currDate].tenor}
            bass={this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`].individualdates[currDate].bass}
          />
        </Tab.Pane>
    }
  }

  /**
   * The addTermin function does exactly what it says. It adds an appointment
   * to the calendar view with the date taken from the NewTerminForm.
   * @function
   */
  addTermin = (date) => {
      const dates = { ...this.state.dates };
      const yyyy = date.slice(0, -6);
      const mm = date.slice(5, 7);
      const dd = date.slice(-2);

      const formattedMonthYear = `${monthToString(mm - 1)} ${yyyy}`;
      const formattedDate = `${dd}${mm}${yyyy}`;

      if (dates.hasOwnProperty(formattedMonthYear)) {
        dates[formattedMonthYear].individualdates[formattedDate] = {
          names: [''],
          sopran: '6',
          alt: '8',
          tenor: '5',
          bass: '5'
        }
      } else {
        dates[formattedMonthYear] = {
          individualdates : {

          }
        }
        dates[formattedMonthYear].individualdates[formattedDate] = {
          names: [''],
          sopran: '6',
          alt: '8',
          tenor: '5',
          bass: '5'
        }
      }
      this.setState({ dates });
    }

  /**
   * The addUser function adds a user to the database.
   * @function
   */
  addUser = () => {
    const useras = { ...this.state.useras };

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

  /**
   * The setCurrent user sets the currentUser and the authenticated status.
   * @function
   */
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

  /**
   * The toggleView function gets called when the logOut button is
   * is clicked
   */
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
  /**
   * This function set
   */
  receiveMonth = (monthYear) => {
    this.setState({ monthYear });
  }

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
                            sendMonth = {this.receiveMonth}
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
