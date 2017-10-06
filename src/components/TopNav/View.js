import React from 'react'

import { Button, Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Header from './Header';
import NewTerminForm from './NewTerminForm'

const View = ({
    authenticated, activeItem, admin, onOpen, popoverOpen, addTermin, closePopover, handleItemClick, currentUser, onClick
}) => (
        <div style={{marginBottom: '4em'}}>
          {authenticated
              ? (<Menu size='large'>
                    <Menu.Menu >
                      <Menu.Item>
                        <Header />
                      </Menu.Item>
                    </Menu.Menu>

                    <Menu.Item 
                        name='terminplaner' 
                        as={ Link } 
                        to='/' 
                        active={ activeItem === 'terminplaner' } 
                        onClick={this.handleItemClick} 
                    />
                    <Menu.Item 
                        name='teilnehmer' 
                        as={ Link } 
                        to='/teilnehmer' 
                        active={ activeItem === 'teilnehmer' } 
                        onClick={this.handleItemClick} 
                    />
                    {admin() &&
                    <Popup
                      trigger={<Menu.Item className='terminErstellen' name='termin erstellen' style={{height: '65px'}} active={ activeItem === 'termin erstellen' } />}
                      flowing
                      hideOnScroll={false}
                      open={popoverOpen}
                      onOpen={onOpen}
                      on='click'
                      position='bottom center'
                    >
                        <NewTerminForm
                            addTermin={addTermin}
                            postSubmitHandler={closePopover}
                        />
                    </Popup>
                    }

                    <Menu.Menu position='right'>
                      {/*<Menu.Item
                        name='addnutzer'
                        active={ activeItem === 'addnutzer' }
                        onClick={this.props.buttonOnClick}
                      />*/}

                      <Menu.Item>
                        <p>Eingeloggt als: 
                          <span style={{fontWeight: '700'}}>
                            {currentUser.email.slice(0, -8)}
                          </span>
                        </p>
                      </Menu.Item>

                      <Menu.Item
                        name='hilfe'
                        as={ Link }
                        to='/help'
                        active={ activeItem === 'hilfe' }
                        onClick={ handleItemClick }
                      />

                      <Menu.Item>
                        <Link to='/logout'>
                          <Button
                            basic color='orange'
                            onClick={onClick}
                          >
                            Abmelden
                          </Button>
                        </Link>
                      </Menu.Item>

                    </Menu.Menu>
                  </Menu>
               )
              : (<Menu size='large'>
                    <Menu.Menu>
                      <Menu.Item>
                        <Header />
                      </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right'>
                      <Menu.Item
                        name='hilfe'
                        as={ Link }
                        to='/help'
                        active={ activeItem === 'hilfe' }
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        onClick={handleItemClick}
                      >
                          <Link to='/login'>
                            <Button
                              basic
                              color='orange'
                              onClick={onClick}
                            >
                              Anmelden
                            </Button>
                          </Link>
                      </Menu.Item>
                    </Menu.Menu>

                 </Menu>
               )
            }
        </div>
    );

export default View;