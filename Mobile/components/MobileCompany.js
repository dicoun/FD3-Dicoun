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

  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  filterAll = () => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c, filterFlag:'all'}; // копия хэша изменившегося клиента
      newClients[i]=newClient;
    });
    this.setState({
      clients: newClients
    });
  };

  filterActive = () => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c, filterFlag:'active'}; // копия хэша изменившегося клиента
      newClients[i]=newClient;
    });
    this.setState({
      clients: newClients
    });
  };

  filterBlocked = () => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      let newClient={...c, filterFlag:'blocked'}; // копия хэша изменившегося клиента
      newClients[i]=newClient;
    });
    this.setState({
      clients: newClients
    });
  };

  /*setNewSurnameRef = (ref) => {
    this.newSurnameRef=ref;
  };

  setNewBallanceRef = (ref) => {
    this.newBallanceRef=ref;
  };*/

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

  componentDidMount = () => {
    voteEvents.addListener('EditBtnClicked',this.EditBtn);
    voteEvents.addListener('DeleteBtnClicked',this.DeleteBtn);
    /*voteEvents.addListener('setSurnameRef',this.setNewSurnameRef);
    voteEvents.addListener('setBallanceRef',this.setNewBallanceRef);*/
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EditBtnClicked',this.EditBtn);
    voteEvents.removeListener('DeleteBtnClicked',this.DeleteBtn);
    /*voteEvents.removeListener('setSurnameRef',this.setNewSurnameRef);
    voteEvents.removeListener('setBallanceRef',this.setNewBallanceRef);*/
  };
  
  render() {
    console.log("MobileCompany render");
    var clientsCode=this.state.clients.map( client => {
        if(client.state == client.filterFlag){
          return <MobileClient key={client.id} client={client}/>;
        }
        if(client.filterFlag == 'all' || client.filterFlag == undefined){
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
