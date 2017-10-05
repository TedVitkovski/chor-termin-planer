import React, { Component } from "react";
import ReactDOM from 'react-dom';

import {TweenLite} from 'gsap';

class Transition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            d: 0.4
        }
    }

    componentWillAppear(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), this.state.d, {opacity: 0}, {opacity:1, onComplete: () => cb()});
    }

    // componentDidAppear() {
    //     //do stuff on appear
    // }

    componentWillEnter(cb) {
        TweenLite.fromTo(ReactDOM.findDOMNode(this), this.state.d, {opacity: 0}, {opacity:1, onComplete: () => cb()});
    }

    componentDidEnter() {
        //do stuff on enter
    }

    componentWillLeave(cb) {
        // if(this.mounted)
            TweenLite.to(ReactDOM.findDOMNode(this), this.state.d, {opacity:0, onComplete: () => cb()});
    }

    componentDidLeave() {
        //do stuff on leave
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }

}

export default Transition