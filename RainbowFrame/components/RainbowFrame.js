import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired
  };

  render() {
    let count = 0;
    let Frame = '';

    this.props.colors.forEach(color => 
    { 
        if(!count){
            Frame = <div style={{border:"solid 8px "+ color, padding:"20px"}}>
                {this.props.children}
            </div>
        }
        else{
            Frame = <div style={{border:"solid 8px "+ color,padding:"10px"}}>
                {Frame}
            </div>
        }
        count++;
    });
      
    return Frame;

  }

}

export default RainbowFrame;