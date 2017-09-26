import React, { Component } from "react";

import { Table } from "semantic-ui-react";

import { base } from "../base";

class Teilnehmer extends Component {
  constructor() {
    super();

    this.state = {
      teilnehmer: {}
    };
  }

  componentDidMount() {
    this.teilnehmerRef = base.syncState("teilnehmer", {
      context: this,
      state: "teilnehmer"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.teilnehmerRef);
  }

  printTeilnehmer = () => {
    console.log(this.state.teilnehmer[0]);
    const newObject = Object.keys(this.state.teilnehmer).map((key, index) => (
      <Table.Row key={index}>
        <Table.Cell>{this.state.teilnehmer[index]["name"]}</Table.Cell>
        <Table.Cell>{this.state.teilnehmer[index]["vorname"]}</Table.Cell>
        <Table.Cell>{this.state.teilnehmer[index]["email"]}</Table.Cell>
        <Table.Cell>{this.state.teilnehmer[index]["phone"]}</Table.Cell>
      </Table.Row>
    ));
    return newObject;
  };

  render() {
    return (
      <div style={{ marginTop: "3em" }}>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Vorname</Table.HeaderCell>
              <Table.HeaderCell>E-mail Adresse</Table.HeaderCell>
              <Table.HeaderCell>Telefon-Nummer</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.printTeilnehmer()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default Teilnehmer;
