import React, { Component } from "react";
import { base } from "../../base";

import { Table } from "semantic-ui-react";

import View from './View';
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
      <View printTeilnehmer = {this.printTeilnehmer} />
    );
  }
}

export default Teilnehmer;
