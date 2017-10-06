import React from 'react'

import { Table } from "semantic-ui-react"
import DynamicTableRow from "./DynamicTableRow"

const View = ({
    sopran, alt, tenor, bass, mapVoicesToNames
}) => {
    const users = mapVoicesToNames();
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
                        {sopran}
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: "700" }}>
                        {alt}
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: "700" }}>
                        {tenor}
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: "700" }}>
                        {bass}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default View