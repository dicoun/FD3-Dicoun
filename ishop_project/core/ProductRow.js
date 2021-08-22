import React from 'react';
import PropTypes from 'prop-types';

import {voteEvents} from './events';

class ProductRow extends React.PureComponent {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  change = (EO) => {
    voteEvents.emit('CountChanged',this.props.product.prod_id, EO.target.value);
  }

  delete = (EO) => {
    voteEvents.emit('DeleteBtnClicked',this.props.product.prod_id);
  }

  render() {
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
