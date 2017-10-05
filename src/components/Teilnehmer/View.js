import React from 'react';

import { Table } from "semantic-ui-react";

const View = ({
    printTeilnehmer
}) => (
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

            <Table.Body>
                {printTeilnehmer()}
            </Table.Body>
        </Table>
    </div>
)

export default View;