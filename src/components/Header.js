import React from 'react';
import { Header } from 'semantic-ui-react';

const HeaderView = (props) => {
  return (
    <Header as='h2' textAlign='center'>
        <Header.Content style={{ fontWeight: '200' }}>
              Chor Terminplaner
        </Header.Content>
    </Header>
  )
}

export default HeaderView;
