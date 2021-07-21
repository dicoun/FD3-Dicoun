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
  }

  setNameRef = (ref) => {
    voteEvents.emit('setNameRef', ref);
  }

  setMiddleNameRef = (ref) => {
    voteEvents.emit('setMiddleNameRef', ref);
  }

  render() {
    console.log("MobileClient id="+this.props.client.id+" render");
    return (
      <tr className={this.props.client.id}>
        <td>
          {(this.props.client.disabledFlag) &&
            <input type='text' className='text' defaultValue={this.props.client.fam} ref={this.setSurnameRef} disabled/>
          }
          {(!this.props.client.disabledFlag ) &&
            <input type='text' className='text' defaultValue={this.props.client.fam} ref={this.setSurnameRef}/>
          }
        </td>
        <td>
          {(!this.props.client.addFlag) &&
              <input type='text' className='text' defaultValue={this.props.client.im} ref={this.setNameRef} disabled/>
          }
          {(this.props.client.addFlag) &&
              <input type='text' className='text' defaultValue={this.props.client.im} ref={this.setNameRef}/>
          }
        </td>
        <td>
          {(!this.props.client.addFlag) &&
            <input type='text' className='text' defaultValue={this.props.client.otch} ref={this.setMiddleNameRef} disabled/>
          }
          {(this.props.client.addFlag) &&
            <input type='text' className='text' defaultValue={this.props.client.otch} ref={this.setMiddleNameRef}/>
          }
        </td>
        <td>
          {(this.props.client.disabledFlag) &&
              <input type='text' className='text' defaultValue={this.props.client.balance} ref={this.setBallanceRef} disabled/>
          }
          {(!this.props.client.disabledFlag) &&
              <input type='text' className='text' defaultValue={this.props.client.balance} ref={this.setBallanceRef}/>
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
         {(this.props.client.disabledFlag) &&
            <input type='button' className='btnInGrid' value='Редактировать' onClick={this.edit}></input>
         }
         {(!this.props.client.disabledFlag) &&
            <input type='button' className='btnInGrid' value='Сохранить' onClick={this.save}></input>
         }
        </td>
        <td>
         {(this.props.client.disabledFlag) &&
            <input type='button' className='btnInGrid' value='Удалить' onClick={this.delete}></input>
         }
         {(!this.props.client.disabledFlag) &&
            <input type='button' className='btnInGrid' value='Отменить' onClick={this.cancel}></input>
         }
        </td>
      </tr>
    );
  }
}

export default MobileClient;
