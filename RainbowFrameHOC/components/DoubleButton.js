import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component {

  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired
  };

  firstBtnClick = () => {
    this.props.cbPressed(1);
  }

  secondBtnClick = () => {
    this.props.cbPressed(2);
  }

  render() {
    return <div className='mainDiv'><input type='button' value={this.props.caption1} onClick={this.firstBtnClick}/>{this.props.children}<input type='button' value={this.props.caption2} onClick={this.secondBtnClick}/></div>;
  }

}

export default DoubleButton;