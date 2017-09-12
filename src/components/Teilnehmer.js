import React from 'react';

import { Table } from 'semantic-ui-react';

const Teilnehmer = (props) => {
  return (
    <div style={{marginTop: '3em'}}>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Vorname</Table.HeaderCell>
            <Table.HeaderCell>E-mail Adresse</Table.HeaderCell>
            <Table.HeaderCell>Telefon-Nummer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Jachmann</Table.Cell>
            <Table.Cell>Juliane</Table.Cell>
            <Table.Cell>julianejachmann@yahoo.de</Table.Cell>
            <Table.Cell>030 / 394 54 21, 0159-02252608</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Kirste</Table.Cell>
            <Table.Cell>Sabine</Table.Cell>
            <Table.Cell>gartenzwerge@hotmail.com</Table.Cell>
            <Table.Cell>0172 770 13 71</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Loth</Table.Cell>
            <Table.Cell>Gerlinde</Table.Cell>
            <Table.Cell>manne.Loth@gmx.de</Table.Cell>
            <Table.Cell>030 / 656 36 34</Table.Cell>
          </Table.Row>
        </Table.Body>
  </Table>
    </div>
  )
}

export default Teilnehmer;
