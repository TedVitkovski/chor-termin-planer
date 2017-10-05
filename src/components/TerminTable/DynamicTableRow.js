import React, { Component } from "react";

import { Table } from "semantic-ui-react";

const DynamicTableRow = (props) => (
    <Table.Row>
      <Table.Cell style={{ textDecoration: "line-through" }}>
        {props.users["soprans"][props.rowNumber]}
      </Table.Cell>
      <Table.Cell style={{ textDecoration: "line-through" }}>
        {props.users["alts"][props.rowNumber]}
      </Table.Cell>
      <Table.Cell style={{ textDecoration: "line-through" }}>
        {props.users["tenors"][props.rowNumber]}
      </Table.Cell>
      <Table.Cell style={{ textDecoration: "line-through" }}>
        {props.users["basses"][props.rowNumber]}
      </Table.Cell>
    </Table.Row>
)

export default DynamicTableRow;
