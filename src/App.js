import React, { Component } from 'react';
import { Button, Loader, Dimmer, Segment, Tab, Menu, Container, Label, Popup } from 'semantic-ui-react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Toggle from 'react-toggle';

import TerminTable from './components/TerminTable.js';
import MainView from './components/MainView.js';
import TopNav from './components/TopNav.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Teilnehmer from './components/Teilnehmer.js';
import Help from './components/Help.js';
import './styles/App.css';

import { app, base } from './base';

const currDate = new Date();

class App extends Component {

  constructor() {
    super();

    this.itemsRef = app.database().ref();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.renderVerticalPanes = this.renderVerticalPanes.bind(this);

    this.state = {
      dates: { },
      useras: { },
      authenticated: false,
      currentUser: null,
      loading: true,
      checkArr: [false, false, false, false, false, false, false, false],
      month: '',
      sopran: 6,
      alt: 8,
      tenor: 5,
      bass: 4,
      userNames: {
        'julianej' : 'Sopran',
        'sabinek' : 'Sopran',
        'gerlindel' : 'Sopran',
        'annez' : 'Sopran',
        'mariannes' : 'Sopran',
        'kerstinb' : 'Alt',
        'renatep' : 'Alt',
        'angelikah' : 'Alt',
        'joerdisp' : 'Alt',
        'annelorer' : 'Alt',
        'barbaras' : 'Alt',
        'mariaw' : 'Alt',
        'martina' : 'Tenor',
        'lotharb' : 'Tenor',
        'sebastianh' : 'Tenor',
        'matthiasr' : 'Tenor',
        'hadriant' : 'Bass',
        'christofw' : 'Bass',
        'rainerw' : 'Bass',
        'alexanderk' : 'Bass'
      },
      individualDates : [
                               ['06092017', '13092017', '20092017', '27092017'],
                               ['04102017', '11102017', '18102017', '25102017'],
                        ],

    }
  }

  componentDidMount() {

    this.datesRef = base.syncState('dates', {
      context: this,
      state: 'dates'
    });

    this.usersRef = base.syncState('useras', {
      context: this,
      state: 'useras',
    });
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {

        console.log('This should change the state!!!' + user)
        this.state.currentUser = user;
        console.log('This should be the user!' + this.state.currentUser.uid);
        this.setState({
          currentUser: user,
          authenticated: true,
          loading: false,
        })

      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          loading: false,
        })
      }
    })



  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.datesRef);
    base.removeBinding(this.usersRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          useras: child.val()
        });
      });

      this.setState({
        useras: items
      })
    })
  }

  userVoiceToDecrement = (userVoice) => {

  }

  onChangeToggle = (e) => {

    const name = this.state.currentUser.email.slice(0, -8);
    const id = e.target.id;
    const dates = { ...this.state.dates };
    const useras = { ...this.state.useras };
    const { month } = this.state;
    const userVoice = this.state.userNames[name];



    console.log(id);
    let dateId = id.slice(2, 3);
    let checkArrId = id.slice(3, 4);
    const dateObj = Object.values(dates[month])[0];
    const dateObjKeys = Object.keys(dateObj);

    if (dateId == 0) {
      dateId = 3;
    } else {
      dateId = dateId - 1;
    }

    const date = dateObjKeys[dateId];

    let currSopran = dates[month].individualdates[date].sopran
    let currAlt = dates[month].individualdates[date].alt
    let currTenor = dates[month].individualdates[date].tenor
    let currBass = dates[month].individualdates[date].bass
    console.log(currSopran + ' Der SOPRANO!!');


    if (e.target.checked) {
      const i = dates[month].individualdates[date].names.indexOf(name);
      if (i != -1) {
        dates[month].individualdates[date].names.splice(i, 1);
        switch(userVoice) {
          case 'Sopran' :
            dates[month].individualdates[date].sopran = ++currSopran;
            break;
          case 'Alt' :
            dates[month].individualdates[date].alt = ++currAlt;
            console.log(dates[month].individualdates[date].alt + '??????????????????????????????');
            break;
          case 'Tenor' :
            dates[month].individualdates[date].tenor = ++currTenor;
            break;
          case 'Bass' :
            dates[month].individualdates[date].bass = ++currBass;
            break;
        }
        this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = true;
      }
    } else {
      dates[month].individualdates[date].names.push(name);
      console.log('WHY THE HELL!!!! --------- !!!!!!' + userVoice);
      switch(userVoice) {
        case 'Sopran' :
          dates[month].individualdates[date].sopran = --currSopran;
          break;
        case 'Alt' :
          dates[month].individualdates[date].alt = --currAlt;
          break;
        case 'Tenor' :
          console.log('Hilfe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          dates[month].individualdates[date].tenor = --currTenor;
          break;
        case 'Bass' :
          dates[month].individualdates[date].bass = --currBass;
          break;
      }

      this.state.useras[this.state.currentUser.uid].clickArr[checkArrId] = false;
    }
    this.setState({ dates });
    this.setState({ useras });

  }


  addItem = () => {
    const dates = { ...this.state.dates };
    const months = ['September 2017', 'Oktober 2017'];

    for (let i = 0; i < months.length; i++) {
      dates[months[i]] = {
        individualdates : {

        }
      }
    }

    for (let i = 0; i < this.state.individualDates.length; i++) {
      let individualMonthDates = this.state.individualDates[i];
      let month = months[i];
      for (let j = 0; j < individualMonthDates.length; j++){
        dates[month].individualdates[individualMonthDates[j]] = {
          names: ['Fedor'],
          sopran: '6',
          alt: '8',
          tenor: '5',
          bass: '5'
        }
      }
    }

    this.setState({ dates });
  }



  addUser = () => {
    const useras = { ...this.state.useras };
    console.log(this.state.currentUser.uid);
    useras[this.state.currentUser.uid] = {
      clickArr: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true
      }
    }
    this.setState({ useras });
  }

  setCurrentUser = (user) => {

    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true,
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  toggleView = () => {

    if (this.state.authenticated){
      this.setState(
        {authenticated: false}
      )
    } else {
      return (
        <Redirect to='/' />
      );
    }
  }

  myCallback = (dataFromChild) => {
    this.setState({ month: dataFromChild });
  }

  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  incrementBass = () => {
    const temp = this.state.bass;
    this.setState({
      bass: temp + 1,
    })
  }

  renderVerticalPanes = () => {
    console.log(Date.now())
    console.log(this.state.currentUser.uid + ' Why is the user not initialized?')
    const userId = this.state.currentUser.uid;

    console.log(userId);
    const x = JSON.parse(JSON.stringify(this.state));
    console.log(x);
    console.log(this.state.checkArr);

    return {
        'September 2017' :
        [
          { menuItem:
          <Menu.Item> <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <span style={{marginRight: "2em"}}>06.09.2017</span>
            <label><Toggle id='0900' key={0} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[0]}
            onChange={this.onChangeToggle} />
            </label>

          </div>

          </Menu.Item>,
          render: () => <Tab.Pane> <TerminTable
          names={this.state.dates['September 2017'].individualdates['06092017'].names}
          sopran={this.state.dates['September 2017'].individualdates['06092017'].sopran}
          alt={this.state.dates['September 2017'].individualdates['06092017'].alt}
          tenor={this.state.dates['September 2017'].individualdates['06092017'].tenor}
          bass={this.state.dates['September 2017'].individualdates['06092017'].bass} /> </Tab.Pane> },

          { menuItem: <Menu.Item> <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span style={{marginRight: "2em"}}>13.09.2017</span><label><Toggle id='0911' key={1} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[1]}
          onChange={this.onChangeToggle} /></label></div> </Menu.Item>,
          render: () => <Tab.Pane> <TerminTable
          names={this.state.dates['September 2017'].individualdates['13092017'].names}
          sopran={this.state.dates['September 2017'].individualdates['13092017'].sopran}
          alt={this.state.dates['September 2017'].individualdates['13092017'].alt}
          tenor={this.state.dates['September 2017'].individualdates['13092017'].tenor}
          bass={this.state.dates['September 2017'].individualdates['13092017'].bass} /> </Tab.Pane> },

          { menuItem: <Menu.Item> <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span style={{marginRight: "2em"}}>20.09.2017</span><label><Toggle id='0922' key={2} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[2]}
          onChange={this.onChangeToggle} /></label></div></Menu.Item>,
          render: () => <Tab.Pane> <TerminTable
          names={this.state.dates['September 2017'].individualdates['20092017'].names}
          sopran={this.state.dates['September 2017'].individualdates['20092017'].sopran}
          alt={this.state.dates['September 2017'].individualdates['20092017'].alt}
          tenor={this.state.dates['September 2017'].individualdates['20092017'].tenor}
          bass={this.state.dates['September 2017'].individualdates['20092017'].bass} /> </Tab.Pane> },

          { menuItem: <Menu.Item><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span style={{marginRight: "2em"}}>27.09.2017</span><label><Toggle id='0933' key={3} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[3]}
          onChange={this.onChangeToggle} /></label></div> </Menu.Item>,
          render: () => <Tab.Pane> <TerminTable
          names={this.state.dates['September 2017'].individualdates['27092017'].names}
          sopran={this.state.dates['September 2017'].individualdates['27092017'].sopran}
          alt={this.state.dates['September 2017'].individualdates['27092017'].alt}
          tenor={this.state.dates['September 2017'].individualdates['27092017'].tenor}
          bass={this.state.dates['September 2017'].individualdates['27092017'].bass} /> </Tab.Pane> },

        ],
        'Oktober 2017' :
        [
          { menuItem: <Menu.Item><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <span style={{marginRight: "2em"}}>04.10.2017</span><label><Toggle id='1004' key={4} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[4]}
          onChange={this.onChangeToggle} /></label></div> </Menu.Item>, render: () => <Tab.Pane> <TerminTable names={this.state.dates['Oktober 2017'].individualdates['04102017'].names}
          sopran={this.state.dates['Oktober 2017'].individualdates['04102017'].sopran}
          alt={this.state.dates['Oktober 2017'].individualdates['04102017'].alt}
          tenor={this.state.dates['Oktober 2017'].individualdates['04102017'].tenor}
          bass={this.state.dates['Oktober 2017'].individualdates['04102017'].bass}/> </Tab.Pane> },

          { menuItem: <Menu.Item><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <span style={{marginRight: "2em"}}>11.10.2017</span><label><Toggle id='1015' key={5} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[5]}
          onChange={this.onChangeToggle} /></label></div> </Menu.Item>, render: () => <Tab.Pane> <TerminTable names={this.state.dates['Oktober 2017'].individualdates['11102017'].names}
          sopran={this.state.dates['Oktober 2017'].individualdates['11102017'].sopran}
          alt={this.state.dates['Oktober 2017'].individualdates['11102017'].alt}
          tenor={this.state.dates['Oktober 2017'].individualdates['11102017'].tenor}
          bass={this.state.dates['Oktober 2017'].individualdates['11102017'].bass}/> </Tab.Pane> },

          { menuItem: <Menu.Item><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <span style={{marginRight: "2em"}}>18.10.2017</span><label><Toggle id='1026' key={6} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[6]}
          onChange={this.onChangeToggle} /></label></div></Menu.Item>, render: () => <Tab.Pane> <TerminTable names={this.state.dates['Oktober 2017'].individualdates['18102017'].names}
          sopran={this.state.dates['Oktober 2017'].individualdates['18102017'].sopran}
          alt={this.state.dates['Oktober 2017'].individualdates['18102017'].alt}
          tenor={this.state.dates['Oktober 2017'].individualdates['18102017'].tenor}
          bass={this.state.dates['Oktober 2017'].individualdates['18102017'].bass}/> </Tab.Pane> },

          { menuItem: <Menu.Item><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <span style={{marginRight: "2em"}}>25.10.2017</span><label><Toggle id='1037' key={7} defaultChecked={this.state.useras[this.state.currentUser.uid].clickArr[7]}
          onChange={this.onChangeToggle} /></label></div> </Menu.Item>, render: () => <Tab.Pane> <TerminTable names={this.state.dates['Oktober 2017'].individualdates['25102017'].names} sopran={this.state.dates['Oktober 2017'].individualdates['25102017'].sopran}
          alt={this.state.dates['Oktober 2017'].individualdates['25102017'].alt}
          tenor={this.state.dates['Oktober 2017'].individualdates['25102017'].tenor}
          bass={this.state.dates['Oktober 2017'].individualdates['25102017'].bass}/> </Tab.Pane> },
        ],
      }
  }

  render() {

    const { loading, authenticated, currentUser } = this.state;

    /* if (loading) {
      console.log('LOADING');
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <Dimmer active inverted>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      )
    } */

    return (
      <div>
          <BrowserRouter>
              <div>
                <TopNav authenticated={authenticated} currentUser={currentUser} onClick={this.toggleView} addTermin={this.addTermin} buttonOnClick={this.addUser}  />
                  <div className="ui container" style={{ marginTop: '3em' }}>
                    <Route exact path="/" render={(props) => {
                      console.log(authenticated + 'THIS SHOULD WORK!!');
                      if (authenticated) {
                        console.log('The authenticated has changed ' + authenticated)
                        return (
                          <MainView
                            verticalPanes = {this.renderVerticalPanes()}
                            currMonth = {currDate.getMonth()}
                            currYear = {currDate.getFullYear()}
                            callbackFromParent = {this.myCallback}
                            onClick = {this.incrementBass}
                          />
                        )
                      } else {
                        console.log('The authenticated has not changed' + this.state.authenticated)
                        return (
                          <Redirect to='/login' />
                        );
                      }
                    }} />
                    <Route path = "/teilnehmer" render={(props) => {
                      if (authenticated) {
                        return (
                          <Teilnehmer />
                        )
                      } else {
                        return (
                          <Redirect to='/login' />
                        )
                      }
                    }}/>
                    <Route path = "/help" component={Help} />
                    <Route path = "/login" render={(props) => {
                      return <Login setCurrentUser={this.setCurrentUser} {...props} />
                    }} />
                    <Route path = "/logout" component={Logout} />
                  </div>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
