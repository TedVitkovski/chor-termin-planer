import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import HeaderView from './Header.js';

class TopNav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state;
    return (
        <div style={{marginBottom: '4em'}}>
          {console.log('TOPNAV' + this.props.authenticated)}
          {this.props.authenticated
              ? (<Menu size='large'>
                    <Menu.Menu>
                      <Menu.Item>
                        <HeaderView />
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Item name='terminplaner' active={ activeItem === 'terminkalender' } onClick={this.handleItemClick} />
                    <Menu.Item name='teilnehmer' active={ activeItem === 'teilnehmer' } onClick={this.handleItemClick} />
                    <Menu.Item name='termin erstellen' active={ activeItem === 'termin erstellen' } onClick={this.handleItemClick} />

                    <Menu.Menu position='right'>
                      <Menu.Item>
                        <p>Eingeloggt als: <span style={{fontWeight: '700'}}>{this.props.currentUser.email.slice(0, -8)}</span></p>
                      </Menu.Item>
                      <Menu.Item name='hilfe' active={ activeItem === 'hilfe' } onClick={this.handleItemClick} />

                      <Menu.Item>
                        <Link to='/logout'>
                          <Button basic color='orange' onClick={this.props.onClick}>Abmelden</Button>
                        </Link>
                      </Menu.Item>
                    </Menu.Menu>
                 </Menu>
               )
              : (<Menu size='large'>
                    <Menu.Menu>
                      <Menu.Item>
                        <HeaderView />
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                      <Menu.Item name='hilfe' active={ activeItem === 'hilfe' } onClick={this.handleItemClick} />
                      <Menu.Item>
                          <Link to='/login'>
                            <Button basic color='orange' onClick={this.props.onClick}>Anmelden</Button>
                          </Link>
                      </Menu.Item>
                    </Menu.Menu>
                 </Menu>
               )
          }
        </div>
    );
  }
}

export default TopNav;
