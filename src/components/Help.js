import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import HelpMd from "../help.md.js";

const Help = () => (
  <Container text style={{ marginBottom: "5em" }}>
    <ReactMarkdown source={HelpMd} />
  </Container>
);

export default Help;
