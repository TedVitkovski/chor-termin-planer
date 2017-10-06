import React, { Component } from "react"
import PropTypes from 'prop-types';

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

  /**
   * This method returns a formatted monthYear
   * @method
   */
  getMonthYear = () => {
    return `${monthToString(this.state.currMonth)} ${this.state.currYear}`;
  };

   /**
    * This method formats the month and year and sends it
    * to the main App component
    * @method
   */
  formatMonthYear = () => {
    this.props.sendMonth(this.getMonthYear());
  };

  /**
   * This method changes the current month to the previous month
   * @method
   */
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

  /**
   * This method changes the current month to the next month
   * @method
   */
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

MainView.propTypes = {
  verticalPanes: PropTypes.object.isRequired,
  currMonth: PropTypes.number.isRequired,
  currYear: PropTypes.number.isRequired,
  sendMonth: PropTypes.func.isRequired
}

export default MainView;
