import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import MobileClientBtn from './MobileClientBtn.js';

import {voteEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    client: PropTypes.object
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
    voteEvents.emit('setSurnameRef', ref, this.props.client.id);
  }

  setBallanceRef = (ref) => {
    voteEvents.emit('setBallanceRef', ref, this.props.client.id);
  }

  setNameRef = (ref) => {
    voteEvents.emit('setNameRef', ref, this.props.client.id);
  }

  setMiddleNameRef = (ref) => {
    voteEvents.emit('setMiddleNameRef', ref, this.props.client.id);
  }

  render() {
    var clientsCode = null;
    if(this.props.client){
      console.log("MobileClient id="+this.props.client.id+" render");
      clientsCode = 
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
              <input type='button' data-kind='edit' className='btnInGrid' value='Редактировать' onClick={this.edit}></input>
             //<MobileClientBtn dataKind='edit' className='btnInGrid' value='Редактировать' onClick={this.edit} />
          }
          {(!this.props.client.disabledFlag) &&
              <input type='button' className='btnInGrid' value='Сохранить' onClick={this.save}></input>
          }
          </td>
          <td>
          {(this.props.client.disabledFlag) &&
              <input type='button' kind='delete' className='btnInGrid' value='Удалить' onClick={this.delete}></input>
          }
          {(!this.props.client.disabledFlag) &&
              <input type='button' className='btnInGrid' value='Отменить' onClick={this.cancel}></input>
          }
          </td>
        </tr>;
    }
    return (clientsCode);
  }
}

export default MobileClient;
