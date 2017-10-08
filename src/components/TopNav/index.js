import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isInArray } from 'utils/helperFunctions.js'

import View from './View'
class TopNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem : 'home',
      popoverOpen: false,
      admins: ['2RNmx77bB6dOxnlagLzVGxxTBtC3', 'mI6P1uHeUufZ7zwOpMs69Kd7n0r1']
    }
  }

  /**
   * This method changes the Popover state to closed.
   * It is used as a post submit handler.
   * @method
   */
  closePopover = () => this.setState({ popoverOpen: false })
  
  /**
   * This method changes the activeItem state
   * @method
   */
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  /**
   * This method changes the popoverOpen state to open.
   * @method
   */
  onOpen = (state) => this.setState({ popoverOpen: state })

  /**
   * This method checks whether the user is an admin.
   * @method
   */
  admin = () => isInArray(this.state.admins, this.props.currentUser.uid);

  render() {
    return (
      <View 
        {...this.state}
        {...this.props}
        closePopover = {this.closePopover}
        handleItemClick = {this.handleItemClick}
        onOpen = {this.onOpen}
        admin = {this.admin}
      />
    )
  };
}

TopNav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  addTermin: PropTypes.func.isRequired,
  buttonOnClick: PropTypes.func
};

export default TopNav;
