import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';

const View = ({
    redirect
}) => {
    if (redirect) {
        return <Redirect to='/' />
      }
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      );
}

export default View;