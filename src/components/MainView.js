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
      checkArr: [true, true, true, true, true, true, true, true]
    };
  };

  onChangeToggle = (e) => {
    const name = this.props.currentUser.email.slice(0, -8);
    const id = e.target.id;

    if (e.target.checked) {
      const i = this.state.userNames.indexOf(name);
      if (i != -1) {
        this.state.userNames.splice(i, 1);
        this.state.checkArr[id] = true;
      }
    } else {
      this.state.userNames[id] = name;
      this.state.checkArr[id] = false;
    }
    console.log(this.state.userNames);
  }



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
    const { dates } = this.props;
    const dateIds = Object.keys(dates);
    const individualdates = dates.individualdates;
    const verticalPanes = {
      'September 2017' :
      [
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>06.09.2017</span><Toggle id='0' key={1} defaultChecked={this.state.checkArr[0]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>13.09.2017</span><Toggle id='1' key={2} defaultChecked={this.state.checkArr[1]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>20.09.2017</span><Toggle id='2' key={3} defaultChecked={this.state.checkArr[2]} onChange={this.onChangeToggle} /></label></Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>27.09.2017</span><Toggle id='3' key={4} defaultChecked={this.state.checkArr[3]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
      ],
      'Oktober 2017' :
      [
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>04.10.2017</span><Toggle id='4' key={5} defaultChecked={this.state.checkArr[4]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>11.10.2017</span><Toggle id='5' key={6} defaultChecked={this.state.checkArr[5]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>18.10.2017</span><Toggle id='6' key={7} defaultChecked={this.state.checkArr[6]} onChange={this.onChangeToggle} /></label></Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
        { menuItem: <Menu.Item> <label><span style={{marginRight: "2em"}}>25.10.2017</span><Toggle id='7' key={8} defaultChecked={this.state.checkArr[7]} onChange={this.onChangeToggle} /></label> </Menu.Item>, render: () => <Tab.Pane> <TerminTable sopran='6' alt='7' tenor='5' bass='3'/> </Tab.Pane> },
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

        <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={verticalPanes[`${this.monthToString(this.state.currMonth)} ${this.state.currYear}`]} />
      </div>
    );
  }

}

export default MainView;
