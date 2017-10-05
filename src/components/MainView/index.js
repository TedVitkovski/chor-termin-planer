import React, { Component } from "react";
import { Button, Container, Tab, Radio, Menu } from "semantic-ui-react";
import Toggle from "react-toggle";

import "../../styles/ToggleButton.css";

import FadeTransition from '../../animations/FadeTransition.js';
import TransitionGroup from "react-transition-group/TransitionGroup";

import { monthToString } from "../../helperFunctions.js";

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMonth: props.currMonth,
      currYear: props.currYear,
      userNames: []
    };
  }

  getMonthYear = () => {
    return `${monthToString(this.state.currMonth)} ${this.state.currYear}`;
  };

  componentWillMount() {
    this.formatMonthYear();
  }

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

  /**
   * This function formats the month and year and sends it
   * to the main App component
   */
  formatMonthYear = () => {
    this.props.sendMonth(this.getMonthYear());
  };

  render() {
    return (
      <div>
        <Container
          textAlign="center"
          style={{ marginBottom: "3em", marginTop: "3em" }}
        >
          <Button.Group basic>
            <Button
              labelPosition="left"
              icon="left chevron"
              content="Letzter Monat"
              onClick={this.prevMonth}
            />
            <Button
              onClick={this.props.onClick}
              style={{
                fontSize: "23px",
                fontWeight: "900",
                cursor: "auto",
                minWidth: "250px"
              }}
              content={this.getMonthYear()}
            />
            <Button
              labelPosition="right"
              icon="right chevron"
              content="Nächster Monat"
              onClick={this.nextMonth}
            />
          </Button.Group>

        </Container>

        <Tab
          menu={{ fluid: true, vertical: true, tabular: "left" }}
          panes={this.props.verticalPanes[this.getMonthYear()]}
        />
      </div>
    );
  }
}

export default MainView;
