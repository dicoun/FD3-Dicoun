import React from 'react';
import PropTypes from 'prop-types';

//import './MobileClient.css';

import {voteEvents} from './events';

class ProductRow extends React.PureComponent {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  /*state = {
    client: this.props.client
  };

  edit = (EO) => {
    voteEvents.emit('EditBtnClicked',this.props.client.id);
  }

  save = (EO) => {
    voteEvents.emit('SaveBtnClicked',this.props.client.id);
  }

  cancel = (EO) => {
    voteEvents.emit('CancelBtnClicked',this.props.client.id);
  }

  setSurnameRef = (ref) => {
    voteEvents.emit('setSurnameRef', ref);
  }

  setBallanceRef = (ref) => {
    voteEvents.emit('setBallanceRef', ref);
  }*/

  /*setAmountRef = (ref, count) => {
    voteEvents.emit('setAmountRef', ref, this.props.product.count);
  }*/

  change = (EO) => {
    console.log(EO.target.value);
    voteEvents.emit('CountChanged',this.props.product.prod_id, EO.target.value);
  }

  delete = (EO) => {
    voteEvents.emit('DeleteBtnClicked',this.props.product.prod_id);
  }

  render() {
 //   console.log("MobileClient id="+this.props.client.id+" render");
    console.log(this.props.product);
    return (
      <tr className={this.props.product.id}>
        <td>
          <label>{this.props.product.name}</label>
        </td>
        <td>
          <input type='text' className='text' value={this.props.product.count} onChange={this.change}/>
        </td>
        <td>
            <input type='text' className='text' value={this.props.product.price} disabled/>
        </td>  
        <td>
            <input type='button' className='btnInGrid' value='Удалить' onClick={this.delete}></input>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
