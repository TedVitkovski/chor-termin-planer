import React from 'react';

import CSSTransition from "react-transition-group/CSSTransition";

import '../styles/FadeTransition.css'

const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames='example'
    timeout={{ enter: 1000, exit: 700 }}
  />
);

export default FadeTransition;
