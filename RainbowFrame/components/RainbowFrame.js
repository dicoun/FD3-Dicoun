import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired
  };

  render() {
      
    return (
            <div style={{border:"solid 8px "+ this.props.color,padding:"10px"}}>
                {this.props.children}
            </div>
    );

  }

}

export default RainbowFrame;