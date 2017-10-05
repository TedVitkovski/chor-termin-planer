import React, { Component } from "react";
import ReactDOM from 'react-dom';

import {TweenLite} from 'gsap';

import {TransitionSwitch} from 'react-router-v4-transition';

import {
  Button,
  Loader,
  Dimmer,
  Segment,
  Tab,
  Menu,
  Container,
  Label,
  Popup
} from "semantic-ui-react";


import FadeTransition from './animations/FadeTransition.js';
import TransitionGroup from "react-transition-group/TransitionGroup";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Toggle from "react-toggle";

import TerminTable from "./components/TerminTable";
import MainView from "./components/MainView";
import TopNav from "./components/TopNav";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Teilnehmer from "./components/Teilnehmer";
import Help from "./components/Help";

import {
  monthToString,
  sortIndividualDates,
  isEmpty,
  isInArray
} from "./helperFunctions.js";

import "./styles/App.css";

import { app, base } from "./base";

const currDate = new Date();

let d = 0.4;
class Transition extends Component {

    constructor(props) {
        super(props);
    }

    componentWillAppear(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), d, {opacity: 0}, {opacity:1, onComplete: () => cb()});
    }

    // componentDidAppear() {
    //     //do stuff on appear
    // }

    componentWillEnter(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), d, {opacity: 0}, {opacity:1, onComplete: () => cb()});
    }

    componentDidEnter() {
        //do stuff on enter
    }

    componentWillLeave(cb) {
        // if(this.mounted)
            TweenLite.to(ReactDOM.findDOMNode(this), d, {opacity:0, onComplete: () => cb()});
    }

    componentDidLeave() {
        //do stuff on leave
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }

}

class App extends Component {
  constructor() {
    super();

    this.setCurrentUser = this.setCurrentUser.bind(this);

    this.state = {
      dates: {},
      useras: {},
      userVoices: {},
      authenticated: false,
      currentUser: null,
      loading: true,
      monthYear: "",
      specialDates: ['03.12.2017', '25.12.2017', '18.03.2018']
    };
  }

  componentDidMount() {
    this.datesRef = base.syncState("dates", {
      context: this,
      state: "dates"
    });

    this.usersRef = base.syncState("useras", {
      context: this,
      state: "useras"
    });

    this.userVoicesRef = base.syncState("userVoices", {
      context: this,
      state: "userVoices"
    });

    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        this.state.currentUser = user;

        this.setState({
          currentUser: user,
          authenticated: true
        });
      } else {
        this.setState({
          currentUser: null,
          authenticated: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.teilnehmerRef)
    base.removeBinding(this.datesRef);
    base.removeBinding(this.usersRef);
    base.removeBinding(this.userVoicesRef);
  }




  /**
   * onChangeToggle gets called every time the user clicks on the Toggle button.
   * The name of the user gets pushed into the names array and the numbers on the
   * bottom of the table get updated (via switch statement). The user's clickarray
   * gets updated as well.
   * @function
   */
  onChangeToggle = e => {
    const name = this.state.currentUser.email.slice(0, -8);
    const id = e.target.id;
    const dates = { ...this.state.dates };
    const useras = { ...this.state.useras };
    const { monthYear } = this.state;
    const userVoice = this.state.userVoices[name];

    const dateId = id.slice(2, 3);
    const checkArrId = id.slice(3, id.length);

	const dateObj = Object.keys(dates[monthYear]).map(e => dates[monthYear][e])[0];

    /*const dateObj = Object.values(dates[monthYear])[0];*/
    const dateObjKeys = Object.keys(dateObj);
    const sortedDateObjKeys = sortIndividualDates(dateObjKeys);
    const date = sortedDateObjKeys[dateId];

    let currSopran = dates[monthYear].individualdates[date].sopran;
    let currAlt = dates[monthYear].individualdates[date].alt;
    let currTenor = dates[monthYear].individualdates[date].tenor;
    let currBass = dates[monthYear].individualdates[date].bass;

    if (e.target.checked) {
      const i = dates[monthYear].individualdates[date].names.indexOf(name);

      if (i != -1) {
        dates[monthYear].individualdates[date].names.splice(i, 1);
        switch (userVoice) {
          case "Sopran":
            dates[monthYear].individualdates[date].sopran = ++currSopran;
            break;
          case "Alt":
            dates[monthYear].individualdates[date].alt = ++currAlt;
            break;
          case "Tenor":
            dates[monthYear].individualdates[date].tenor = ++currTenor;
            break;
          case "Bass":
            dates[monthYear].individualdates[date].bass = ++currBass;
            break;
        }
        this.state.useras[this.state.currentUser.uid].clickArr[
          checkArrId
        ] = true;
      }
    } else {
      dates[monthYear].individualdates[date].names.push(name);
      switch (userVoice) {
        case "Sopran":
          dates[monthYear].individualdates[date].sopran = --currSopran;
          break;
        case "Alt":
          dates[monthYear].individualdates[date].alt = --currAlt;
          break;
        case "Tenor":
          dates[monthYear].individualdates[date].tenor = --currTenor;
          break;
        case "Bass":
          dates[monthYear].individualdates[date].bass = --currBass;
          break;
      }
      this.state.useras[this.state.currentUser.uid].clickArr[
        checkArrId
      ] = false;
    }
    this.setState({ dates });
    this.setState({ useras });
    this.mainRenderer();
  };

  /**
   * The mainRenderer function returns an object with all vertical panes by reading all
   * required data from the database and making a call to renderVerticalPane for each dataset.
   * @function
   */
  mainRenderer = () => {
    const dates = { ...this.state.dates };
    const months = Object.keys(dates);
    let counter = 0;

    let verticalPanesObj = {};
    let verticalPanesArr = [];

    for (let i = 0; i < months.length; i++) {
      const individualDatesUnsorted = Object.keys(
        dates[months[i]].individualdates
      );
      const individualDates = sortIndividualDates(individualDatesUnsorted);
      for (let j = 0; j < individualDates.length; j++) {
        let tempDate = individualDates[j];
        const tempMonthFirstStep = tempDate.slice(0, -4);
        const tempMonth = tempMonthFirstStep.slice(2, 4);
        const tempYear = tempDate.slice(4);
        const tempDay = tempDate.slice(0, 2);

        const stringDate =
          tempDay.toString() +
          "." +
          tempMonth.toString() +
          "." +
          tempYear.toString();

        const tempId = tempMonth.toString() + j.toString() + counter.toString();
        const checkArrId = tempId.slice(3, tempId.length);
        verticalPanesArr.push(
          this.renderVerticalPane(
            tempDate,
            stringDate,
            tempMonth,
            tempYear,
            tempId,
            checkArrId
          )
        );
        counter++;
      }
      verticalPanesObj[months[i]] = verticalPanesArr;
      verticalPanesArr = [];
    }
    return verticalPanesObj;
  };

  /**
   * The renderVerticalPane function constructs with given parameters
   * and returns exactly one vertical pane object.
   * @function
   */
  renderVerticalPane = (
    currDate,
    currDateString,
    currMonth,
    currYear,
    currId,
    checkArrId
  ) => {
    return {
      menuItem: (
        <Menu.Item key={checkArrId}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {(isInArray(this.state.specialDates, currDateString)) && <span style={{ marginRight: "2em", color: 'red', fontWeight: '900'}}>{currDateString}</span>}
            {(!isInArray(this.state.specialDates, currDateString)) && <span style={{ marginRight: "2em" }}>{currDateString}</span>}
            <label>
              <Toggle
                id={currId}
                key={checkArrId}
                checked={
                  this.state.useras[this.state.currentUser.uid].clickArr[
                    checkArrId
                  ]
                }
                onChange={this.onChangeToggle}
              />
            </label>
          </div>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <TerminTable
            userVoices={this.state.userVoices}
            teilnehmer={this.state.teilnehmer}
            names={
              this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                .individualdates[currDate].names
            }
            sopran={
              this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                .individualdates[currDate].sopran
            }
            alt={
              this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                .individualdates[currDate].alt
            }
            tenor={
              this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                .individualdates[currDate].tenor
            }
            bass={
              this.state.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                .individualdates[currDate].bass
            }
          />
        </Tab.Pane>
      )
    };
  };

  /**
   * The addTermin function does exactly what it says. It adds an appointment
   * to the calendar view with the date taken from the NewTerminForm.
   * @function
   */
  addTermin = date => {
    const dates = { ...this.state.dates };
    const yyyy = date.slice(0, -6);
    const mm = date.slice(5, 7);
    const dd = date.slice(-2);

    const formattedMonthYear = `${monthToString(mm - 1)} ${yyyy}`;
    const formattedDate = `${dd}${mm}${yyyy}`;

    if (dates.hasOwnProperty(formattedMonthYear)) {
      dates[formattedMonthYear].individualdates[formattedDate] = {
        names: [""],
        sopran: "8",
        alt: "7",
        tenor: "3",
        bass: "3"
      };
    } else {
      dates[formattedMonthYear] = {
        individualdates: {}
      };
      dates[formattedMonthYear].individualdates[formattedDate] = {
        names: [""],
        sopran: "8",
        alt: "7",
        tenor: "3",
        bass: "3"
      };
    }
    this.setState({ dates });
  };

  /**
   * The setCurrent user sets the currentUser and the authenticated status.
   * @function
   */
  setCurrentUser = user => {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      });
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      });
    }
  };

  /**
   * The toggleView function gets called when the logOut button is
   * is clicked
   */
  toggleView = () => {
    if (this.state.authenticated) {
      this.state.authenticated = false;
    } else {
      return <Redirect to="/" />;
    }
  };
  /**
   * This function set
   */
  receiveMonth = monthYear => {
    this.setState({ monthYear });
  };

  render() {
    const { loading, authenticated, currentUser } = this.state;

    if (loading) {
      if (!isEmpty(this.state.useras)) {
        this.setState({ loading: false });
      }

      return (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: "25%",
            left: "50%"
          }}
        >
          <Dimmer active inverted>
            <Loader content="Lädt..." />
          </Dimmer>
        </div>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <div className="main">
            <TopNav
              authenticated={authenticated}
              currentUser={currentUser}
              onClick={this.toggleView}
              addTermin={this.addTermin}
              buttonOnClick={this.addUser}
            />
            <div className="ui container" style={{ marginTop: "3em" }}>
              <TransitionSwitch parallel={false}>
                <Route
                  exact
                  path="/"
                  render={props => {
                    if (authenticated) {
                      return (
                        <Transition>
                          <MainView
                            verticalPanes={this.mainRenderer()}
                            currMonth={currDate.getMonth()}
                            currYear={currDate.getFullYear()}
                            sendMonth={this.receiveMonth}
                          />
                        </Transition>
                      );
                    } else {
                      return <Transition><Redirect to="/login" /></Transition>;
                    }
                  }}
                />
                <Route
                  path="/teilnehmer"
                  render={props => {
                    if (authenticated) {
                      return <Transition><Teilnehmer /></Transition>;
                    } else {
                      return <Transition><Redirect to="/login" /></Transition>;
                    }
                  }}
                />
                <Route path="/help">
                  <Transition>
                    <Help />
                  </Transition>
                </Route>
                <Route
                  path="/login"
                  render={props => {
                    return (
                      <Transition><Login setCurrentUser={this.setCurrentUser} {...props} /></Transition>
                    );
                  }}
                />
                <Route path="/logout">
                  <Transition>
                    <Logout />
                  </Transition>
                </Route>
              </TransitionSwitch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
