import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import './MobileCompany.css';

import {voteEvents} from './events';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
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
    name: this.props.name,
    clients: this.props.clients
  };

  filterFlag = '';

  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  filterAll = () => {
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
  };

  filterActive = () => {
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
  };

  filterBlocked = () => {
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
  };

  setNewSurnameRef = (ref) => {
    this.newSurnameRef=ref;
  };

  setNewBallanceRef = (ref) => {
    this.newBallanceRef=ref;
  };

  setNewNameRef = (ref) => {
    this.newNameRef=ref;
  };

  setNewMiddleNameRef = (ref) => {
    this.newMiddleNameRef=ref;
  };

  AddBtn = () => {
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
        if ( this.newSurnameRef ) { // всегда проверяем - мало ли метод вызовется когда DOM-элемента уже нет или ещё нет?
          let newSurname=this.newSurnameRef.value;
          let newBallance=this.newBallanceRef.value;
          newClient.disabledFlag=true;
          newClient.fam=newSurname;
          newClient.balance=newBallance;
          if(c.addFlag){
            let newName=this.newNameRef.value;
            newClient.im=newName;
            let newMiddleName=this.newMiddleNameRef.value;
            newClient.otch=newMiddleName;
            newClient.addFlag=false;
          }
          newClients[i]=newClient;
        }
      }
    });
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
    var clientsCode=this.state.clients.map( client => {
        if(client.state == this.filterFlag){
          return <MobileClient key={client.id} client={client}/>;
        }
        if(this.filterFlag == 'all' || this.filterFlag == ''){
          return <MobileClient key={client.id} client={client}/>;
        }
      }
    );
    return (
      <div className='MobileCompany'>
        <input type="button" value="Velcom" onClick={this.setName2} />
        <input type="button" value="МТС" onClick={this.setName1} />
        <div className='MobileCompanyName'>Компания: {this.state.name}</div>
        <hr></hr>
        <input type="button" value="Все" onClick={this.filterAll} />
        <input type="button" value="Активные" onClick={this.filterActive} />
        <input type="button" value="Заблокированные" onClick={this.filterBlocked} />
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
        <input type="button" value="Добавить клиента" onClick={this.AddBtn} />
      </div>
    );
  }
}

export default MobileCompany;
