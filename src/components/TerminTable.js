import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TerminTable extends Component {
  constructor(props) {
    super(props);
  };

  render() {
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
          <Table.Row>
            <Table.Cell style={{textDecoration: 'line-through'}}>Juliane</Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}></Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}>Claas</Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{textDecoration: 'line-through'}}>Sabine</Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}></Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}></Table.Cell>
            <Table.Cell style={{textDecoration: 'line-through'}}></Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>{this.props.sopran}</Table.HeaderCell>
            <Table.HeaderCell>{this.props.alt}</Table.HeaderCell>
            <Table.HeaderCell>{this.props.tenor}</Table.HeaderCell>
            <Table.HeaderCell>{this.props.bass}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    );
  }
}

export default TerminTable;
