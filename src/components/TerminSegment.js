import React, { Component } from 'react';

import { Header, Segment } from 'semantic-ui-react';

class TerminSegment extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <Header as='h5'>
          Tag
        </Header>
        <Segment attached>
          Mittwoch
        </Segment>
        <Header as='h5'>
          Was
        </Header>
        <Segment attached>
          Chorprobe
        </Segment>
        <Header as='h5'>
          Wo
        </Header>
        <Segment attached>
          {this.props.raum}
        </Segment>
        <Header as='h5'>
          Info
        </Header>
        <Segment attached>
          {this.props.info}
        </Segment>
      </div>
    );
  }
}

export default TerminSegment;
