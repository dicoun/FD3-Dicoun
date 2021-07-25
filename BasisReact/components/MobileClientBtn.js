import React from 'react'; 
import PropTypes from 'prop-types'; 
 
const MobileClientBtn = props => { 
  //return <div className='MobileClientBtn'>{props.question}</div>; 
  return <input type='button' data-kind={props.dataKind} className={props.className} value={props.value} onClick={props.onClick}></input> 
} 
 
MobileClientBtn.propTypes = { 
  dataKind: PropTypes.string.isRequired, 
  className: PropTypes.string.isRequired, 
  value: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired, 
}; 
 
export default MobileClientBtn;