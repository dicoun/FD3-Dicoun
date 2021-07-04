import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    var str = this.props.text;
    var result = str.split(/<br>|<br\/>|<br \/>/g);
    var arrRes = []; 
    var resLength = result.length;
    result.forEach(el => {
        arrRes.push(el);
        if(resLength > 1){
            arrRes.push(<br key={resLength} />);
        }
        resLength -= 1;
    });

    return (
        <div className='br2jsx'>{arrRes}</div>
    );

  }

}

export default BR2JSX;