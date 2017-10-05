import React, { Component } from 'react'

import View from './View'
class TopNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem : 'home',
      popoverOpen: false,
    }
  }

  closePopover = () => this.setState({ popoverOpen: false })
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onOpen = (state) => this.setState({ popoverOpen: state })

  admin = () => this.props.currentUser.uid === '2RNmx77bB6dOxnlagLzVGxxTBtC3';

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

export default TopNav;
