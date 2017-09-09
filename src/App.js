import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import MainView from './components/MainView.js';
import './styles/App.css';

const currDate = new Date();

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '3em' }}>
        <Header as='h2' textAlign='center'>
            <Header.Content style={{ fontWeight: '200' }}>
              Chor Terminplaner
            </Header.Content>
        </Header>
        <MainView currYear={currDate.getFullYear()} currMonth={currDate.getMonth()} />

      </div>
    );
  }
}

export default App;
