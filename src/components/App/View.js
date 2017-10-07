import React from 'react';

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import {TransitionSwitch} from 'react-router-v4-transition';

import {
    Loader,
    Dimmer   
} from "semantic-ui-react";

import {
    isEmpty
} from "utils/helperFunctions";

import Transition from './Transition';

import MainView from "components/MainView";
import TopNav from "components/TopNav";
import Login from "components/Login";
import Logout from "components/Logout";
import Teilnehmer from "components/Teilnehmer";
import Help from "components/Help";

const currDate = new Date();

const View = ({
    setLoadingToFalse, useras, toggleView, receiveMonth, setCurrentUser, mainRenderer, addTermin, addUser, loading, authenticated, currentUser
}) => {
        if (loading) {

          if (!isEmpty(useras)) {
            setLoadingToFalse()
          }

          return (
            <div className="loader">
              <Dimmer active inverted>
                <Loader content="Lädt..." />
              </Dimmer>
            </div>
          );
        }
    
        return (
          <div>
            <BrowserRouter>
              <div className="main">

                <TopNav
                  authenticated={authenticated}
                  currentUser={currentUser}
                  onClick={toggleView}
                  addTermin={addTermin}
                  buttonOnClick={addUser}
                />

                <div className="ui container" style={{ marginTop: "3em" }}>
                  <TransitionSwitch parallel={false}>
                    
                    <Route
                      exact
                      path="/"
                      render={props => {
                        if (authenticated) {
                          return (
                            <Transition>
                              <MainView
                                verticalPanes={mainRenderer()}
                                currMonth={currDate.getMonth()}
                                currYear={currDate.getFullYear()}
                                sendMonth={receiveMonth}
                              />
                            </Transition>
                          );
                        } else {
                          return (
                            <Transition>
                                <Redirect to="/login" />
                            </Transition>
                          );
                        }
                      }}
                    />

                    <Route
                      path="/teilnehmer"
                      render={props => {
                        if (authenticated) {
                          return (
                            <Transition>
                                <Teilnehmer />
                            </Transition>
                          );
                        } else {
                          return 
                            <Transition>
                                <Redirect to="/login" />
                            </Transition>;
                        }
                      }}
                    />

                    <Route path="/help">
                      <Transition>
                        <Help />
                      </Transition>
                    </Route>

                    <Route
                      path="/login"
                      render={props => {
                        return (
                            <Transition>
                                <Login setCurrentUser={setCurrentUser} {...props} />
                            </Transition>
                        );
                      }}
                    />

                    <Route path="/logout">
                      <Transition>
                        <Logout />
                      </Transition>
                    </Route>

                  </TransitionSwitch>
                </div>
              </div>
            </BrowserRouter>
          </div>
        );
}

export default View