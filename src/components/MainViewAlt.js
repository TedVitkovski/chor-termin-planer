import React, { Component } from 'react';
import { Button, Container, Tab, Grid, Menu, Segment, Radio } from 'semantic-ui-react';

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

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMonth: props.currMonth,
      currYear: props.currYear,
      activeItem: '13.09.2017'
    };
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
    const { activeItem } = this.state;
    const { dates } = this.props;
    const dateIds = Object.keys(dates);
    const individualdates = dates.individualdates;

    const verticalPanes2 =  dateIds.map((id) => {
      const date = dates[id];
      return (
        {id :
        [
          { menuItem: '06.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
          { menuItem: '13.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
          { menuItem: '20.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
          { menuItem: '27.09.2017', render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        ],}
      );
    })

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

        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item name='06.09.2017' active = {activeItem === '06.09.2017'} onClick={this.handleItemClick} >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{ marginRight: '0.2em' }}>06.09.2017</span>
                <Radio toggle />
                </div>
              </Menu.Item>
              <Menu.Item name='13.09.2017' active = {activeItem === '13.09.2017'} onClick={this.handleItemClick} />
              <Menu.Item name='20.09.2017' active = {activeItem === '20.09.2017'} onClick={this.handleItemClick} />
              <Menu.Item name='27.09.2017' active = {activeItem === '27.09.2017'} onClick={this.handleItemClick} />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              <TerminTable sopran='6' alt='7' tenor='5' bass='3'/>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}

export default MainView;
