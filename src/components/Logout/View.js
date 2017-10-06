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
        <div className="loader">
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      );
}

export default View;