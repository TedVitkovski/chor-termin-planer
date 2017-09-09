import React, { Component } from 'react';
import { Button, Container, Tab } from 'semantic-ui-react';

import TerminTable from './TerminTable.js';

const verticalPanes = {
  'September 2017' :
  [
    { menuItem: '06.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '13.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '20.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '27.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
  ],
  'Oktober 2017' :
  [
    { menuItem: '04.10.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '11.10.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '18.10.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '25.10.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
  ],
  'November 2017' :
  [
    { menuItem: '01.11.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '08.11.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '20.11.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '27.11.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
  ],
  'Dezember 2017' :
  [
    { menuItem: '06.12.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '13.12.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '20.12.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
    { menuItem: '27.12.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
  ],
};

class MonthSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMonth: props.currMonth,
      currYear: props.currYear,
    };
  };

  prevMonth = () => {

    const tempDate = new Date(this.state.currYear, this.state.currMonth - 1);
    console.log(tempDate.getMonth());
    console.log('-------------------------------------------------');
    console.log(this.state.currMonth);
    this.setState({
      currMonth: tempDate.getMonth(),
      currYear: tempDate.getFullYear(),
    });
  };

  nextMonth = () => {

    const tempDate = new Date(this.state.currYear, this.state.currMonth + 1);
    console.log(tempDate.getMonth());

    this.setState({
      currMonth: tempDate.getMonth(),
      currYear: tempDate.getFullYear(),
    });
  };

  monthToString = (month) => {
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
    return (
      <div>
        <Container textAlign='center' style={{ marginBottom: '3em', marginTop: '3em' }} >
          <Button.Group basic>
            <Button labelPosition='left' icon='left chevron' content='Letzter Monat' onClick={this.prevMonth} />
            <Button style={{ fontSize: '23px', fontWeight: '900', cursor: 'auto', minWidth: '250px' }}
            content={`${this.monthToString(this.state.currMonth)} ${this.state.currYear}`} />
            <Button labelPosition='right' icon='right chevron' content='Nächster Monat' onClick={this.nextMonth} />
          </Button.Group>
        </Container>

        <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={verticalPanes[`${this.monthToString(this.state.currMonth)} ${this.state.currYear}`]} />
      </div>
    );
  }

}

export default MonthSwitcher;
