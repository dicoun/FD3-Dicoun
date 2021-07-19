import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import {voteEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    client: PropTypes.object.isRequired
  };

  state = {
    client: this.props.client
  };

  edit = (EO) => {
    voteEvents.emit('EditBtnClicked',this.props.client.id);
  }

  delete = (EO) => {
    voteEvents.emit('DeleteBtnClicked',this.props.client.id);
  }

  /*setSurnameRef = (ref) => {
    voteEvents.emit('setSurnameRef', ref);
  }

  setBallanceRef = (ref) => {
    voteEvents.emit('setBallanceRef', ref);
  }*/

  render() {
    console.log("MobileClient id="+this.props.client.id+" render");
    return (
      <tr className={this.state.client.id}>
        <td>
          {(this.props.client.disabledFlag) &&
            <input type='text' className='text' defaultValue={this.state.client.fam} /*ref={this.setSurnameRef}*/ disabled/>
          }
          {(!this.props.client.disabledFlag ) &&
            <input type='text' className='text' defaultValue={this.state.client.fam} /*ref={this.setSurnameRef}*//>
          }
        </td>
        <td>
          {(!this.props.client.addFlag) &&
              <input type='text' className='text' defaultValue={this.state.client.im} disabled/>
          }
          {(this.props.client.addFlag) &&
              <input type='text' className='text' defaultValue={this.state.client.im}/>
          }
        </td>
        <td>
          {(!this.props.client.addFlag) &&
            <input type='text' className='text' defaultValue={this.state.client.otch} disabled/>
          }
          {(this.props.client.addFlag) &&
            <input type='text' className='text' defaultValue={this.state.client.otch}/>
          }
        </td>
        <td>
          {(this.props.client.disabledFlag) &&
              <input type='text' className='text' defaultValue={this.state.client.balance} /*ref={this.setBallanceRef}*/ disabled/>
          }
          {(!this.props.client.disabledFlag) &&
              <input type='text' className='text' defaultValue={this.state.client.balance} /*ref={this.setBallanceRef}*//>
          }
        </td>
        {(this.props.client.state == 'active') && 
          <td className='StateActive'>
             <span className='State'>{this.state.client.state}</span>
          </td>
        }
        {(this.props.client.state == 'blocked') && 
          <td className='StateBlocked'>
             <span className='State'>{this.state.client.state}</span>
          </td>
        }   
        <td>
            <input type='button' value='Редактировать' onClick={this.edit}></input>
        </td>
        <td>
            <input type='button' value='Удалить' onClick={this.delete}></input>
        </td>
      </tr>
    );
  }
}

export default MobileClient;
