import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TerminTable extends Component {
  constructor(props) {
    super(props);
    console.log('TERMINTABLE' + this.props.names);

    this.state = {
      userNames: {
        'julianej' : 'Sopran',
        'sabinek' : 'Sopran',
        'gerlindel' : 'Sopran',
        'annez' : 'Sopran',
        'mariannes' : 'Sopran',
        'kerstinb' : 'Alt',
        'renatep' : 'Alt',
        'angelikah' : 'Alt',
        'joerdisp' : 'Alt',
        'annelorer' : 'Alt',
        'barbaras' : 'Alt',
        'mariaw' : 'Alt',
        'martina' : 'Tenor',
        'lotharb' : 'Tenor',
        'sebastianh' : 'Tenor',
        'matthiasr' : 'Tenor',
        'hadriant' : 'Bass',
        'christofw' : 'Bass',
        'rainerw' : 'Bass',
        'alexanderk' : 'Bass'
      }
    }
  };

  userVoiceToColumns = (userVoice, counter) => {
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
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }



  render() {
    const rows = [];
    for (let i = 0; i < this.props.names.length; i++) {
      let userName = this.props.names[i];
      console.log(userName);
      let userVoice = this.state.userNames[userName];
      let userColumns = this.userVoiceToColumns(userVoice, i);
      rows.push(userColumns);
    }
    console.log(rows + " The table rows!");
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
          {rows}
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
