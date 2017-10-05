import React, { Component } from "react"
import { monthToString } from "../../helperFunctions.js"

import View from './View'
class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMonth: props.currMonth,
      currYear: props.currYear,
      userNames: []
    };
  }

  componentWillMount() {
    this.formatMonthYear();
  }

  getMonthYear = () => {
    return `${monthToString(this.state.currMonth)} ${this.state.currYear}`;
  };

   /**
   * This function formats the month and year and sends it
   * to the main App component
   */
  formatMonthYear = () => {
    this.props.sendMonth(this.getMonthYear());
  };

  /* This function changes the current month to the previous month */
  prevMonth = () => {
    const tempDate = new Date(this.state.currYear, this.state.currMonth - 1);

    this.setState(
      {
        currMonth: tempDate.getMonth(),
        currYear: tempDate.getFullYear()
      },
      () => this.formatMonthYear()
    );
  };

  /* This function changes the current month to the next month */
  nextMonth = () => {
    const tempDate = new Date(this.state.currYear, this.state.currMonth + 1);

    this.setState(
      {
        currMonth: tempDate.getMonth(),
        currYear: tempDate.getFullYear()
      },
      () => this.formatMonthYear()
    );
  };

  render() {
    return (
      <View 
        {...this.props}
        {...this.state}
        prevMonth = {this.prevMonth}
        nextMonth = {this.nextMonth}
        getMonthYear = {this.getMonthYear}
      />
    )
  };
}

export default MainView;
