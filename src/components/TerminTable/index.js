import React, { Component } from "react"

import { base } from "../../base"

import View from './View';

class TerminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teilnehmer: {}
    };
  }
  
  componentDidMount() {
	  this.teilnehmerRef = base.syncState("teilnehmer", {
      context: this,
      state: "teilnehmer"
    })
  }
  
  componentWillUnmount() {
	  base.removeBinding(this.teilnehmerRef);
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  createVoicesToNames = () => {
    const users = {};
    const soprans = [];
    const alts = [];
    const tenors = [];
    const basses = [];

    for (let i = 0; i < this.props.names.length; i++) {
      for (let j = 0; j < this.state.teilnehmer.length; j++) {
        let userName = this.props.names[i];
        let userRealName = this.capitalizeName(userName.slice(0, -1));

        if (this.state.teilnehmer[j]["vorname"] === userRealName) {
          let nachname = this.state.teilnehmer[j]["name"];
          let userFullName = userRealName + " " + nachname;
          let userVoice = this.props.userVoices[userName];
          switch (userVoice) {
            case "Sopran": {
              soprans.push(userFullName);
              break;
            }
            case "Alt": {
              alts.push(userFullName);
              break;
            }
            case "Tenor": {
              tenors.push(userFullName);
              break;
            }
            case "Bass": {
              basses.push(userFullName);
              break;
            }
          }
        }
      }
    }
    users["soprans"] = soprans;
    users["alts"] = alts;
    users["tenors"] = tenors;
    users["basses"] = basses;
    return users;
  };

  render() {
    return (
      <View 
        {...this.props} 
        createVoicesToNames = {this.createVoicesToNames} 
      />
    )
  }
}

export default TerminTable;
