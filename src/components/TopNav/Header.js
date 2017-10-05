import React from 'react';
import { Header } from 'semantic-ui-react';

const HeaderView = (props) => (
    <Header as='h2' textAlign='center'>
        <Header.Content style={{ fontWeight: '200', color: 'rgba(243,125,47, 1)' }}>
              Chor Terminplaner
        </Header.Content>
    </Header>
  )

export default HeaderView;
