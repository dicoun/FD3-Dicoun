import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import './MobileCompany.css';

import {voteEvents} from './events';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        disabledFlag: PropTypes.bool.isRequired
      })
    ),
  };

  state = {
    clients: this.props.clients
  };

  filterFlag = '';
  newNameRef = [];
  newSurnameRef = [];
  newBallanceRef = [];
  newMiddleNameRef = [];

  
  filterAll = () => {
    if(this.state.clients){
      let newClients=[...this.state.clients]; // копия самого массива клиентов
      newClients.forEach( (c,i) => {
        if(c.renderFlag == false){
          let newClient={...c, renderFlag:true}; // копия хэша изменившегося клиента
          newClients[i]=newClient;
        }
      });
      this.filterFlag = 'all';
      this.setState({
        clients: newClients
      });
    }
  };

  filterActive = () => {
    if(this.state.clients){
      let newClients=[...this.state.clients]; // копия самого массива клиентов
      newClients.forEach( (c,i) => {
        if((c.state == 'active') && (c.renderFlag == false)){
          let newClient={...c, renderFlag:true}; // копия хэша изменившегося клиента
          newClients[i]=newClient;
        }
      });
      this.filterFlag = 'active';
      this.setState({
        clients: newClients
      });
    }
  };

  filterBlocked = () => {
    if(this.state.clients){
      let newClients=[...this.state.clients]; // копия самого массива клиентов
      newClients.forEach( (c,i) => {
        if((c.state == 'blocked') && (c.renderFlag == false)){
          let newClient={...c, renderFlag:true}; // копия хэша изменившегося клиента
          newClients[i]=newClient;
        }
      });
      this.filterFlag = 'blocked';
      this.setState({
        clients: newClients
      });
    }
  };

  setNewSurnameRef = (ref, id) => {
    this.newSurnameRef.push({ref:ref,id:id});
  };

  setNewBallanceRef = (ref, id) => {
    this.newBallanceRef.push({ref:ref,id:id});
  };

  setNewNameRef = (ref, id) => {
    this.newNameRef.push({ref:ref,id:id});
  };

  setNewMiddleNameRef = (ref, id) => {
    this.newMiddleNameRef.push({ref:ref,id:id});;
  };

  AddBtn = () => {
    if(this.state.clients){
      let newClients=[...this.state.clients]; // копия самого массива клиентов
      newClients.push({
        id: newClients.length + 1,
        fam: '',
        im: '',
        otch: '',
        balance: '',
        state: 'active',
        disabledFlag: false,
        addFlag: true
      });
      this.setState({
        clients: newClients
      });
    }
  }

  EditBtn = (id) => {
    let changed=false;
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c}; // копия хэша изменившегося клиента
      if(c.id == id){
        newClient.disabledFlag=false;
        newClients[i]=newClient;
        changed=true;
      }
    });
    if ( changed ){
      this.setState({clients: newClients});
    }
  }

  DeleteBtn = (id) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    let delIndex = 0;
    newClients.forEach( (c,i) => {
      if(c.id == id){
        delIndex = i;
      }
    });
    newClients.splice(delIndex,1);
    this.setState({clients: newClients});
  }

  SaveBtn = (id) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c}; // копия хэша изменившегося клиента
      if(c.id == id){
        if ( this.newSurnameRef.length ) { // всегда проверяем - мало ли метод вызовется когда DOM-элемента уже нет или ещё нет?
          this.newSurnameRef.forEach((rec,i) => {
            if(rec.id == id){
              if(rec.ref){
                let newSurname=rec.ref.value;
                newClient.fam=newSurname;
              }
            }
          });
        }
        if(this.newBallanceRef.length){
          this.newBallanceRef.forEach((rec,i) => {
            if(rec.id == id){
              if(rec.ref){
                let newBallance=rec.ref.value;
                newClient.balance=newBallance;
              }
            }
          });
        }
        newClient.disabledFlag=true;
        if(c.addFlag){
          if(this.newNameRef.length){
            this.newNameRef.forEach((rec,i) => {
              if(rec.id == id){
                if(rec.ref){
                  let newName=rec.ref.value;
                  newClient.im=newName;
                }
              }
            });
          }
          if(this.newMiddleNameRef.length){
            this.newMiddleNameRef.forEach((rec,i) => {
              if(rec.id == id){
                if(rec.ref){
                  let newMiddleName=rec.ref.value;
                  newClient.otch=newMiddleName;
                }
              } 
            });
          }
          newClient.addFlag=false;
        }
        newClients[i]=newClient;
      }
    });
    this.newSurnameRef = [];
    this.newBallanceRef = [];
    this.newNameRef = [];
    this.newMiddleNameRef = [];

    this.setState({clients: newClients});
  }

  CancelBtn = (id) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c}; // копия хэша изменившегося клиента
      if(c.id == id){
        newClient.disabledFlag=true;
        if(c.addFlag){
          newClient.addFlag=false;
        }
        newClients[i]=newClient; 
      }
    });
    this.setState({clients: newClients});
  }

  componentDidMount = () => {
    voteEvents.addListener('EditBtnClicked',this.EditBtn);
    voteEvents.addListener('DeleteBtnClicked',this.DeleteBtn);
    voteEvents.addListener('SaveBtnClicked',this.SaveBtn);
    voteEvents.addListener('CancelBtnClicked',this.CancelBtn);
    voteEvents.addListener('setSurnameRef',this.setNewSurnameRef);
    voteEvents.addListener('setBallanceRef',this.setNewBallanceRef);
    voteEvents.addListener('setNameRef',this.setNewNameRef);
    voteEvents.addListener('setMiddleNameRef',this.setNewMiddleNameRef);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EditBtnClicked',this.EditBtn);
    voteEvents.removeListener('DeleteBtnClicked',this.DeleteBtn);
    voteEvents.removeListener('SaveBtnClicked',this.SaveBtn);
    voteEvents.removeListener('CancelBtnClicked',this.CancelBtn);
    voteEvents.removeListener('setSurnameRef',this.setNewSurnameRef);
    voteEvents.removeListener('setBallanceRef',this.setNewBallanceRef);
    voteEvents.removeListener('setNameRef',this.setNewNameRef);
    voteEvents.removeListener('setMiddleNameRef',this.setNewMiddleNameRef);
  };
  
  render() {
    console.log("MobileCompany render");
    var clientsCode = [];
    if(this.props.clients){
      clientsCode=this.state.clients.map( client => {
        if(client.state == this.filterFlag){
          return <MobileClient key={client.id} client={client}/>;
        }
        if(this.filterFlag == 'all' || this.filterFlag == ''){
          return <MobileClient key={client.id} client={client}/>;
        }
      });
    }
    return (
      <div className='MobileCompany'>
        <input type="button" kind="All" value="Все" onClick={this.filterAll} />
        <input type="button" kind="Active" value="Активные" onClick={this.filterActive} />
        <input type="button" kind="Blocked" value="Заблокированные" onClick={this.filterBlocked} />
        <hr></hr>
        <div className='MobileCompanyClients'>
          <table className='MobileCompanyTable'>
            <tbody>
              <tr>
                <th>{'Фамилия'}</th>
                <th>{'Имя'}</th>
                <th>{'Отчество'}</th>
                <th>{'Баланс'}</th>
                <th>{'Статус'}</th>
                <th>{'Редактировать'}</th>
                <th>{'Удалить'}</th>
              </tr>
              {clientsCode}
            </tbody>
          </table>
        </div>
        <hr></hr>
        <input type="button" kind="addClient" value="Добавить клиента" onClick={this.AddBtn} />
      </div>
    );
  }
}

export default MobileCompany;
