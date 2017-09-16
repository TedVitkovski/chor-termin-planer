import React, { Component } from "react";

import { Table } from "semantic-ui-react";

class DynamicTableRow extends Component {
  render() {

    return (
      <Table.Row>
        <Table.Cell style={{ textDecoration: "line-through" }}>
          {this.props.users["soprans"][this.props.rowNumber]}
        </Table.Cell>
        <Table.Cell style={{ textDecoration: "line-through" }}>
          {this.props.users["alts"][this.props.rowNumber]}
        </Table.Cell>
        <Table.Cell style={{ textDecoration: "line-through" }}>
          {this.props.users["tenors"][this.props.rowNumber]}
        </Table.Cell>
        <Table.Cell style={{ textDecoration: "line-through" }}>
          {this.props.users["basses"][this.props.rowNumber]}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default DynamicTableRow;
