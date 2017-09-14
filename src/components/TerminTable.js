import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import DynamicTableRow from './DynamicTableRow.js';

class TerminTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: {}
    }
  }

  /*userVoiceToColumns = (userVoice, counter) => {
    switch(userVoice) {
      case 'Sopran' :
        return (
          <Table.Row>
            <Table.Cell style={{textDecoration: "line-through"}}>{this.capitalizeName(this.props.names[counter]).slice(0, -1)}</Table.Cell>
          </Table.Row>
        );
      case 'Alt' :
        return (
            <Table.Row>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}>{this.capitalizeName(this.props.names[counter]).slice(0, -1)}</Table.Cell>
            </Table.Row>
          );
      case 'Tenor' :
        return (
            <Table.Row>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}>{this.capitalizeName(this.props.names[counter]).slice(0, -1)}</Table.Cell>
            </Table.Row>
          );
      case 'Bass' :
        return (
            <Table.Row>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}></Table.Cell>
              <Table.Cell style={{textDecoration: "line-through"}}>{this.capitalizeName(this.props.names[counter]).slice(0, -1)}</Table.Cell>
            </Table.Row>
          );
    }
  } */

  componentWillMount() {
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  createVoicesToNames = () => {
    const users = {};
    const soprans = [];
    const alts = [];
    const tenors = [];
    const basses = [];
    console.log('Names before the for loop');
    console.log(this.props.names);
    for (let i = 0; i < this.props.names.length; i++) {
      let userName = this.props.names[i];
      console.log('userName inside the for loop');
      console.log(userName);
      let userRealName = this.capitalizeName(userName.slice(0, -1));
      let userVoice = this.props.userVoices[userName];
      switch (userVoice) {
        case 'Sopran' : {
          soprans.push(userRealName);
          break;
        }
        case 'Alt' : {
          alts.push(userRealName);
          break;
        }
        case 'Tenor' : {
          tenors.push(userRealName)
          break;
        }
        case 'Bass' : {
          basses.push(userRealName)
          break;
        }
      }
    }
    users['soprans'] = soprans;
    users['alts'] = alts;
    users['tenors'] = tenors;
    users['basses'] = basses;
    return users;
  }



  render() {
    /*
    const rows = [];
    for (let i = 0; i < this.props.names.length; i++) {
      let userName = this.props.names[i];
      console.log(userName);
      let userVoice = this.props.userVoices[userName];
      let userColumns = this.userVoiceToColumns(userVoice, i);
      rows.push(userColumns);
    }*/
    const users = this.createVoicesToNames();
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log(users);
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

    return (
      <Table color='orange' size='large' celled padded='normal' textAlign="center" columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sopran</Table.HeaderCell>
            <Table.HeaderCell>Alt</Table.HeaderCell>
            <Table.HeaderCell>Tenor</Table.HeaderCell>
            <Table.HeaderCell>Bass</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <DynamicTableRow users={users} />
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell style={{fontWeight: '700'}}>{this.props.sopran}</Table.HeaderCell>
            <Table.HeaderCell style={{fontWeight: '700'}}>{this.props.alt}</Table.HeaderCell>
            <Table.HeaderCell style={{fontWeight: '700'}}>{this.props.tenor}</Table.HeaderCell>
            <Table.HeaderCell style={{fontWeight: '700'}}>{this.props.bass}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    );
  }
}

export default TerminTable;
