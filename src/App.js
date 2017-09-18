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

import TerminTable from "./components/TerminTable.js";
import MainView from "./components/MainView.js";
import TopNav from "./components/TopNav.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import Teilnehmer from "./components/Teilnehmer.js";
import Help from "./components/Help.js";

import {
  monthToString,
  sortIndividualDates,
  isEmpty
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
      teilnehmer: {},
      authenticated: false,
      currentUser: null,
      loading: true,
      monthYear: ""
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

    this.teilnehmerRef = base.syncState("teilnehmer", {
      context: this,
      state: "teilnehmer"
    })

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

    const dateObj = Object.values(dates[monthYear])[0];
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
            <span style={{ marginRight: "2em" }}>{currDateString}</span>
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
   * The addTeilnehmer function does exactly what it says. It adds an appointment
   * to the calendar view with the date taken from the NewTerminForm.
   * @function
   */
  addTeilnehmer = () => {

    const teilnehmer = { ...this.state.teilnehmer };
    const namen = ['Jachmann', 'Kirste', 'Loth', 'Pohl', 'Zöllner', 'Schade', 'Matthäus', 'Rück', 'Brüggermann', 'Dr. Plass', 'Herrmann', 'Papadopoulos', 'Reither', 'Scharfe', 'Ohm', 'Wittkowsky', 'Abel', 'Butszies', 'Härter', 'Hoffmann', 'Teasdale', 'Weigt', 'Weser', 'Range', 'Range-Makel'];
    const vornamen = ['Juliane', 'Sabine', 'Gerlinde', 'Heide', 'Anne', 'Marianne', 'Laura', 'Kressen', 'Kerstin', 'Renate', 'Angelika', 'Jördis', 'Annelore', 'Barbara', 'Agnes', 'Maria', 'Martin', 'Lothar', 'Sebastian', 'Claas', 'Hadrian', 'Christof', 'Rainer', 'Matthias', 'Sabine'];
    const emails = ['juianejachmann@yahoo.de', 'gartenzwerge@hotmail.com', 'manne.Loth@gmx.de', 'heide-pohl@gmx.de', 'gf@pro-gemeinsinn.de', 'Struehn@gmail.com', 'Laumatth@gmx.net', 'rueck.kressen@gmail.com', 'fam.brueggemann@outlook.de', '', 'herrmanngela@web.de', 'joerdis.papadopoulos@web.de', 'a.reither@mailbox.org', 'barbara.scharfe13@gmail.com', 'agnesohm@web.de', 'vad265@yandex.ru', 'abel.martin@t-online.de', '', 'se.h@posteo.de', 'Claasvommars@yahoo.com', 'hadrian.teasdale@gmx.de', 'christof-weigt@web.de', 'weser-schuhe@arcor.de', 'matthiasrange@t-online.de', 'sabine.range-makel@arcor.de'];
    const phones = ['030 / 394 54 21, 0159-02252608','0172 770 13 71', '030 / 656 36 34', '0176 47 38 31 25', '0151 16 25 30 29', '030 / 92 15 72 26', '030/ 22 43 84 70', '0176 66680246', '030 / 442 26 61', '030 / 445 67 49', '033362 / 71 92 05', '030 / 68 08 13 59', '0170 492 8033, 030/46726739', '0151 50 45 36 87', '0179 450 55 69', '0176 20781209', '030 / 86318383,  0151 27668291', '030 / 282 05 46', '0163 2002291', '0176 57 38 45 35', '0176 52 45 22 53', '0152 29 77 89 01', '030 / 414 46 83', '030 / 656 59 61', '030 / 65 48 79 36']

    for (let i = 0; i < namen.length; i++) {
      teilnehmer[i] = {
        name: namen[i],
        vorname: vornamen[i],
        email: emails[i],
        phone: phones[i]
      }
    }

    this.setState({ teilnehmer });
  };

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
        7: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: true,
        20: true,
        21: true,
        22: true,
        23: true,
        24: true,
        25: true,
        26: true,
        27: true,
        28: true,
        29: true,
        30: true,
        31: true,
        32: true,
        33: true,
        34: true,
        35: true,
        36: true,
        37: true,
        38: true,
        39: true,
        40: true,
        41: true,
        42: true,
        43: true,
        44: true,
        45: true,
        46: true,
        47: true,
        48: true,
        49: true,
        50: true,
        51: true,
        52: true,
        53: true,
        54: true,
        55: true,
        56: true,
        57: true,
        58: true,
        59: true,
        60: true,
        61: true,
        62: true,
        63: true,
        64: true,
        65: true,
        66: true,
        67: true,
        68: true,
        69: true,
        70: true,
        71: true,
        72: true,
        73: true,
        74: true,
        75: true,
        76: true,
        77: true,
        78: true,
        79: true,
        80: true,
        81: true,
        82: true,
        83: true,
        84: true,
        85: true,
        86: true,
        87: true,
        88: true,
        89: true,
        90: true,
        91: true,
        92: true,
        93: true,
        94: true,
        95: true,
        96: true,
        97: true,
        98: true,
        99: true,
        100: true,
        101: true,
        102: true,
        103: true
      }
    };
    this.setState({ useras });
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
      this.setState({ authenticated: false });
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
              buttonOnClick={this.addTeilnehmer}
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
                      return <Transition><Teilnehmer teilnehmer={this.state.teilnehmer} /></Transition>;
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
