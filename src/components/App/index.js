import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import {
  monthToString
} from "utils/helperFunctions";

import "styles/App.css";

import Render from './Render';

import { app, base } from "fire/base";

class App extends Component {

  constructor() {
    super();

    this.state = {
      dates: {},
      useras: {},
      userVoices: {},
      authenticated: false,
      currentUser: null,
      loading: true,
      monthYear: "",
      specialDates: []
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

    this.specialDatesRef = base.syncState("specialDates", {
      context: this,
      state: "specialDates"
    })

    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
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
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.teilnehmerRef)
    base.removeBinding(this.datesRef);
    base.removeBinding(this.usersRef);
    base.removeBinding(this.userVoicesRef);
    base.removeBinding(this.specialDatesRef)
  }

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
   * @function
   */
  toggleView = () => {
    if (this.state.authenticated) {
      this.state.authenticated = false;
    } else {
      return <Redirect to="/" />;
    }
  };
  
  receiveMonth = monthYear => this.setState({ monthYear });

  setLoadingToFalse = () => this.setState({ loading: false });

  setStateOfApp = (dates, useras) => {
    this.setState({ dates });
    this.setState({ useras });
  }

  render() {
    return (
      <Render
        {...this.state}
        setLoadingToFalse = {this.setLoadingToFalse}
        toggleView = {this.toggleView}
        addTermin = {this.addTermin}
        addUser = {this.addUser}
        receiveMonth = {this.receiveMonth}
        setCurrentUser = {this.setCurrentUser}
        setStateOfApp = {this.setStateOfApp}
      />
    )
  }
}

export default App;
