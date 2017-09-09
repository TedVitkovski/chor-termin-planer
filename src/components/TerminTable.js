import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TerminTable extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Table columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tag</Table.HeaderCell>
            <Table.HeaderCell>Was</Table.HeaderCell>
            <Table.HeaderCell>Wo</Table.HeaderCell>
            <Table.HeaderCell>Info</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Mittwoch</Table.Cell>
            <Table.Cell>Chorprobe</Table.Cell>
            <Table.Cell>{this.props.raum}</Table.Cell>
            <Table.Cell>{this.props.info}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

    );
  }
}

export default TerminTable;
