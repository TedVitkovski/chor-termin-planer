import React, { Component } from "react";
import { Table } from "semantic-ui-react";

import { base } from "../base";

import DynamicTableRow from "./DynamicTableRow.js";

class TerminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teilnehmer: {}
    };
  }
  
  componentDidMount() {
	  this.teilnehmerRef = base.syncState("teilnehmer", {
	  context: this,
	  state: "teilnehmer"
    })
  }
  
  componentWillUnmount() {
	  base.removeBinding(this.teilnehmerRef);
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
      for (let j = 0; j < this.state.teilnehmer.length; j++) {
        let userName = this.props.names[i];
        let userRealName = this.capitalizeName(userName.slice(0, -1));
        if (this.state.teilnehmer[j]["vorname"] === userRealName) {
          let nachname = this.state.teilnehmer[j]["name"];
          let userFullName = userRealName + " " + nachname;
          let userVoice = this.props.userVoices[userName];
          switch (userVoice) {
            case "Sopran": {
              soprans.push(userFullName);
              break;
            }
            case "Alt": {
              alts.push(userFullName);
              break;
            }
            case "Tenor": {
              tenors.push(userFullName);
              break;
            }
            case "Bass": {
              basses.push(userFullName);
              break;
            }
          }
        }
      }
    }
    users["soprans"] = soprans;
    users["alts"] = alts;
    users["tenors"] = tenors;
    users["basses"] = basses;
    return users;
  };

  render() {
    const users = this.createVoicesToNames();

    return (
      <Table
        color="orange"
        size="large"
        celled
        padded="normal"
        textAlign="center"
        columns={4}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sopran</Table.HeaderCell>
            <Table.HeaderCell>Alt</Table.HeaderCell>
            <Table.HeaderCell>Tenor</Table.HeaderCell>
            <Table.HeaderCell>Bass</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <DynamicTableRow users={users} rowNumber={0} />
          <DynamicTableRow users={users} rowNumber={1} />
          <DynamicTableRow users={users} rowNumber={2} />
          <DynamicTableRow users={users} rowNumber={3} />
          <DynamicTableRow users={users} rowNumber={4} />
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell style={{ fontWeight: "700" }}>
              {this.props.sopran}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ fontWeight: "700" }}>
              {this.props.alt}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ fontWeight: "700" }}>
              {this.props.tenor}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ fontWeight: "700" }}>
              {this.props.bass}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default TerminTable;
