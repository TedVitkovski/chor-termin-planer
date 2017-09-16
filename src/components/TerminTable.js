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

    for (let i = 0; i < this.props.names.length; i++) {
      let userName = this.props.names[i];

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
    const users = this.createVoicesToNames();

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
          <DynamicTableRow users={users} rowNumber={0}/>
          <DynamicTableRow users={users} rowNumber={1}/>
          <DynamicTableRow users={users} rowNumber={2}/>
          <DynamicTableRow users={users} rowNumber={3}/>
          <DynamicTableRow users={users} rowNumber={3}/>
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
