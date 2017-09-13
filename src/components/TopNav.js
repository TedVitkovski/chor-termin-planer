import React, { Component } from 'react';
import { Button, Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import HeaderView from './Header.js';
import NewTerminForm from './NewTerminForm.js'

class TopNav extends Component {

  constructor(props) {
    super(props)
    this.closePopover = this.closePopover.bind(this);
    this.state = {
      activeItem : 'home',
      popoverOpen: false,
    }
  }



  closePopover() {
    this.setState({ popoverOpen: false })
  }

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
                    <Menu.Item name='terminplaner' as={ Link } to='/' active={ activeItem === 'terminkalender' } onClick={this.handleItemClick} />
                    <Menu.Item name='teilnehmer' as={ Link } to='/teilnehmer' active={ activeItem === 'teilnehmer' } onClick={this.handleItemClick} />

                    <Popup
                      trigger={<Menu.Item className='terminErstellen' name='termin erstellen' style={{height: '65px'}} active={ activeItem === 'termin erstellen' } />}
                      flowing
                      hideOnScroll={false}
                      on='click'
                      position='bottom center'
                    >
                      <NewTerminForm />
                    </Popup>

                    <Menu.Menu position='right'>
                      <Menu.Item>
                        <p>Eingeloggt als: <span style={{fontWeight: '700'}}>{this.props.currentUser.email.slice(0, -8)}</span></p>
                      </Menu.Item>
                      <Menu.Item name='hilfe' as={ Link } to='/help' active={ activeItem === 'hilfe' } onClick={this.handleItemClick} />

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
