import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { base } from 'fire/base'
import { capitalizeName } from 'utils/helperFunctions'

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

  /**
   * This method maps over all partakers and returns
   * an object with four voice arrays containg their
   * names
   * @method
   */
  mapVoicesToNames = () => {
    const users = {};

    const soprans = [];
    const alts = [];
    const tenors = [];
    const basses = [];

    for (let i = 0; i < this.props.names.length; i++) {
      for (let j = 0; j < this.state.teilnehmer.length; j++) {
        let userName = this.props.names[i];
        let userRealName = capitalizeName(userName.slice(0, -1));

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
        mapVoicesToNames = {this.mapVoicesToNames} 
      />
    )
  }
}

TerminTable.propTypes = {
  userVoices: PropTypes.object.isRequired,
  names: PropTypes.array.isRequired,
  sopran: PropTypes.number.isRequired,
  alt: PropTypes.number.isRequired,
  tenor: PropTypes.number.isRequired,
  bass: PropTypes.number.isRequired,
}

export default TerminTable;
