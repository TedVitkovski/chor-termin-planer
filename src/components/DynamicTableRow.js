import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';

import DynamicTableCell from './DynamicTableCell.js';

class DynamicTableRow extends Component {

  render() {
    console.log(this.props.users);
    return (
      <Table.Row>
        <Table.Cell style={{textDecoration: "line-through"}}>{this.props.users['soprans'][0]}</Table.Cell>
        <Table.Cell style={{textDecoration: "line-through"}}>{this.props.users['alts'][0]}</Table.Cell>
        <Table.Cell style={{textDecoration: "line-through"}}>{this.props.users['tenors'][0]}</Table.Cell>
        <Table.Cell style={{textDecoration: "line-through"}}>{this.props.users['basses'][0]}</Table.Cell>
      </Table.Row>
    )
  }
}

export default DynamicTableRow;
