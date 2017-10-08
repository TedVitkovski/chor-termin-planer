import React, { Component } from 'react';

import {
    Tab,
    Menu
} from "semantic-ui-react";

import Toggle from "react-toggle";

import TerminTable from "components/TerminTable";

import {
    monthToString,
    sortIndividualDates,
    isInArray
  } from "utils/helperFunctions";

import View from "./View";

class Render extends Component {

  /**
   * The mainRenderer function returns an object with all vertical panes by reading all
   * required data from the database and making a call to renderVerticalPane for each dataset.
   * @function
   */
  mainRenderer = () => {
    const dates  = { ...this.props.dates };
    const months = Object.keys(dates);
    let counter  = 0;

    let verticalPanesObj = {};
    let verticalPanesArr = [];

    months.map(month => {
        const individualDatesUnsorted = Object.keys(dates[month].individualdates);
        const individualdates = sortIndividualDates(individualDatesUnsorted);
        verticalPanesArr = individualdates.map((date, index) => {
            const tempMonthFirstStep = date.slice(0, -4);
            const tempMonth  = tempMonthFirstStep.slice(2, 4);
            const tempYear   = date.slice(4);
            const tempDay    = date.slice(0, 2);
            const stringDate = `${tempDay.toString()}.${tempMonth.toString()}.${tempYear.toString()}`;
            const tempId     = `${tempMonth.toString()}${index.toString()}${counter.toString()}`;
            const checkArrId = tempId.slice(3, tempId.length);
            counter++;
            return this.renderVerticalPane(
                  date,
                  stringDate,
                  tempMonth,
                  tempYear,
                  tempId,
                  checkArrId
            )
        })
        verticalPanesObj[month] = verticalPanesArr;
        verticalPanesArr = []
      })
    return verticalPanesObj;
  };

  /**
   * The renderVerticalPane function constructs with given parameters
   * and returns exactly one vertical pane object.
   * @function
   */
  renderVerticalPane = (
    currDate,
    currDateString,
    currMonth,
    currYear,
    currId,
    checkArrId
  ) => {
    return {
      menuItem: (
        <Menu.Item key={checkArrId} >
          <div className="flex-center">
            {(isInArray(this.props.specialDates, currDateString)) && <span style={{ marginRight: "2em", color: 'red', fontWeight: '900'}}>{currDateString}</span>}
            {(!isInArray(this.props.specialDates, currDateString)) && <span style={{ marginRight: "2em" }}>{currDateString}</span>}
            <label>
              <Toggle
                id={currId}
                key={checkArrId}
                checked={
                  this.props.useras[this.props.currentUser.uid].clickArr[
                    checkArrId
                  ]
                }
                onChange={this.onChangeToggle}
              />
            </label>
          </div>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <TerminTable
            userVoices={this.props.userVoices}
            names={
              this.props.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                        .individualdates[currDate]
                        .names
            }
            sopran={
              this.props.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                        .individualdates[currDate]
                        .sopran
            }
            alt={
              this.props.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                        .individualdates[currDate]
                        .alt
            }
            tenor={
              this.props.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                        .individualdates[currDate]
                        .tenor
            }
            bass={
              this.props.dates[`${monthToString(currMonth - 1)} ${currYear}`]
                        .individualdates[currDate]
                        .bass
            }
          />
        </Tab.Pane>
      )
    };
  };

  /**
   * onChangeToggle gets called every time the user clicks on the Toggle button.
   * The name of the user gets pushed into the names array and the numbers on the
   * bottom of the table get updated (via switch statement). The user's clickarray
   * gets updated as well.
   * @function
   */
  onChangeToggle = e => {
    const name = this.props.currentUser.email.slice(0, -8);
    const id = e.target.id;
    const dates = { ...this.props.dates };
    const useras = { ...this.props.useras };
    const { monthYear } = this.props;
    const userVoice = this.props.userVoices[name];

    const dateId = id.slice(2, 3);
    const checkArrId = id.slice(3, id.length);

	const dateObj = Object.keys(dates[monthYear]).map(e => dates[monthYear][e])[0];

    /*const dateObj = Object.values(dates[monthYear])[0];*/
    const dateObjKeys = Object.keys(dateObj);
    const sortedDateObjKeys = sortIndividualDates(dateObjKeys);
    const date = sortedDateObjKeys[dateId];

    let currSopran = dates[monthYear].individualdates[date].sopran;
    let currAlt    = dates[monthYear].individualdates[date].alt;
    let currTenor  = dates[monthYear].individualdates[date].tenor;
    let currBass   = dates[monthYear].individualdates[date].bass;

    if (e.target.checked) {
      const i = dates[monthYear].individualdates[date].names.indexOf(name);

      if (i !== -1) {
        dates[monthYear].individualdates[date].names.splice(i, 1);
        switch (userVoice) {
          case "Sopran":
            dates[monthYear].individualdates[date].sopran = ++currSopran;
            break;
          case "Alt":
            dates[monthYear].individualdates[date].alt = ++currAlt;
            break;
          case "Tenor":
            dates[monthYear].individualdates[date].tenor = ++currTenor;
            break;
          case "Bass":
            dates[monthYear].individualdates[date].bass = ++currBass;
            break;
          default:
            break;
        }
        this.props.useras[this.props.currentUser.uid].clickArr[
          checkArrId
        ] = true;
      }
    } else {
      dates[monthYear].individualdates[date].names.push(name);
      switch (userVoice) {
        case "Sopran":
          dates[monthYear].individualdates[date].sopran = --currSopran;
          break;
        case "Alt":
          dates[monthYear].individualdates[date].alt = --currAlt;
          break;
        case "Tenor":
          dates[monthYear].individualdates[date].tenor = --currTenor;
          break;
        case "Bass":
          dates[monthYear].individualdates[date].bass = --currBass;
          break;
        default:
          break;
      }
      this.props.useras[this.props.currentUser.uid].clickArr[
        checkArrId
      ] = false;
    }
    this.props.setStateOfApp(dates, useras);
    this.mainRenderer();
  };

  render() {
      return (
        <View 
            {...this.props} 
            mainRenderer = {this.mainRenderer}
        />
      )
  }
}

export default Render