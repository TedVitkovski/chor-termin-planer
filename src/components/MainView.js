import React, { Component } from 'react';
import { Button, Container, Tab, Radio, Menu } from 'semantic-ui-react';
import Toggle from 'react-toggle';

import HeaderView from './Header.js';
import TerminTable from './TerminTable.js';
import '../styles/ToggleButton.css';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMonth: props.currMonth,
      currYear: props.currYear,
      userNames: [],
    };
  };

  componentWillMount() {
    this.someFn();
  }

  /* This function changes the current month to the previous month */
  prevMonth = () => {

    const tempDate = new Date(this.state.currYear, this.state.currMonth - 1);

    this.setState({
      currMonth: tempDate.getMonth(),
      currYear: tempDate.getFullYear(),
    }, () => this.someFn());
  };

  /* This function changes the current month to the next month */
  nextMonth = () => {

    const tempDate = new Date(this.state.currYear, this.state.currMonth + 1);

    this.setState({
      currMonth: tempDate.getMonth(),
      currYear: tempDate.getFullYear(),
    }, () => this.someFn());

  };

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

  someFn = () => {
    let month = `${this.monthToString(this.state.currMonth)} ${this.state.currYear}`;
    this.props.callbackFromParent(month);
  }


  render() {

    return (
      <div>
        <Container textAlign='center' style={{ marginBottom: '3em', marginTop: '3em' }} >
          <Button.Group basic>
            <Button labelPosition='left' icon='left chevron' content='Letzter Monat' onClick={this.prevMonth} />
            <Button onClick={this.props.onClick} style={{ fontSize: '23px', fontWeight: '900', cursor: 'auto', minWidth: '250px' }}
            content={`${this.monthToString(this.state.currMonth)} ${this.state.currYear}`} />
            <Button labelPosition='right' icon='right chevron' content='Nächster Monat' onClick={this.nextMonth} />
          </Button.Group>
        </Container>

        <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={this.props.verticalPanes[`${this.monthToString(this.state.currMonth)} ${this.state.currYear}`]} />
      </div>
    );
  }

}

export default MainView;
