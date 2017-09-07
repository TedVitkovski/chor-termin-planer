import React, { Component } from 'react';
import { Tab, Header } from 'semantic-ui-react';

import Termin from './components/Termin';
import './styles/App.css';

const verticalPanes = [
  { menuItem: '06.09.2017', render: () => <Tab.Pane> <Termin info='alle'  raum='HG 292'/> </Tab.Pane> },
  { menuItem: '13.09.2017', render: () => <Tab.Pane> <Termin info='nur Frauen' raum='A 132'/> </Tab.Pane> },
  { menuItem: '20.09.2017', render: () => <Tab.Pane> <Termin info='nur Männer' raum='E 217'/> </Tab.Pane> },
  { menuItem: '27.09.2017', render: () => <Tab.Pane> <Termin info='alle' raum='E 312'/> </Tab.Pane> },
];

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '5em' }}>
        <Header as='h2' textAlign='center'>
            <Header.Content>
              Termin Planer
            </Header.Content>
        </Header>
        <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={verticalPanes} />
      </div>
    );
  }
}

export default App;
