import React, { Component } from "react";

import ReactMarkdown from 'react-markdown';
import marked from 'marked';

import { Container } from 'semantic-ui-react';

import TransitionGroup from "react-transition-group/TransitionGroup";
import FadeTransition from '../animations/FadeTransition.js';

import MyMarkdown from '../help.md.js';

class Help extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpText: ''
    }

  }

  componentWillMount() {
  const firstbloodPath = require('../help.md');

  fetch(firstbloodPath)
    .then(response =>  {
      return response.text()
    })
    .then(text => {
      this.setState({
        helpText: marked(text),
      })
    })
  }


  render() {
    const { helpText } = this.state;

    return (
      <Container text style={{marginBottom: '5em'}}>
        <ReactMarkdown source={MyMarkdown} />
      </Container>
    );
  }
}

export default Help;
