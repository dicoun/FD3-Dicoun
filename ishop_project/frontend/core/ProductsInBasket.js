import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//import './AllProductsList.css';

import { showBasketAC } from '../redux/fetchBasketProducts';
import { saveOrderAC } from '../redux/saveOrderAC';
import { clearBasketAC } from '../redux/clearBasket';
import ProductRow from './ProductRow';
import {voteEvents} from './events';

class ProductsInBasket extends React.PureComponent {
          
  static propTypes = {
    basket_data: PropTypes.object,
  };

  state = {
    basket_data: this.props.basket_data,
    amountWarning: false
  };

  componentDidMount() {
    //this.props.dispatch( productsAllThunkAC(this.props.dispatch) );
    this.props.dispatch( showBasketAC(this.props.dispatch) );
   // voteEvents.addListener('setAmountRef',this.setAmountRef);
    voteEvents.addListener('CountChanged',this.CountChanged);
    voteEvents.addListener('DeleteBtnClicked',this.DeleteBtnClicked);
  }
  componentWillUnmount = () => {
  //  voteEvents.removeListener('setAmountRef',this.setAmountRef);
    voteEvents.removeListener('CountChanged',this.CountChanged);
  };

  AddBtn = () => {
    this.props.dispatch( saveOrderAC(this.props.dispatch, this.state.basket_data.data) );
    this.setState({basket_data: {data: [], status: 3}});
  }

  DelBtn = () => {
    this.props.dispatch( clearBasketAC(this.props.dispatch) );
    this.setState({basket_data: {data: [], status: 3}});
  }

  sumCalculationRef = (ref) => {
    this.setState({basket_data: this.props.basket_data});
   // this.sumCalculation=ref;

  }
  
  DeleteBtnClicked = (prod_id) => {
    console.log(prod_id);
    //let newClients=[...this.state.clients]; // копия самого массива клиентов
    let newBasketData={...this.state.basket_data.data};
    let delIndex = 0;
    var newBasketDataArr = Object.values(newBasketData);
    newBasketDataArr.forEach( (c,i) => {
      if(c.prod_id == prod_id){
        delIndex = i;
      }
    });
    newBasketDataArr.splice(delIndex,1);
    console.log(newBasketDataArr);
    this.setState({basket_data: {data: newBasketDataArr, status: 3}});
  }

  CountChanged = (prod_id, amount) => {
    console.log(prod_id);
    let newBasketData={...this.state.basket_data.data}; 
    Object.keys(newBasketData).map(function(objectKey, i) {
      var value = newBasketData[objectKey];
      let newRow={...value}; 
      if(value.prod_id == prod_id){
          newRow.count=+amount;
          console.log(newRow);
          newBasketData[i]=newRow;
      }
    });
    this.setState({basket_data: {data:newBasketData,status:3}});
  }

  render() {
    console.log('render');
    console.log(this.props);
    console.log(this.state.amountWarning);
    let calculatedSum = 0;
    var basket_data = this.state.basket_data.data;
    console.log(basket_data);
    this.state.basket_data.data && Object.keys(basket_data).map(function(objectKey, i) {
      var value = basket_data[objectKey];
      calculatedSum += value.count*(parseFloat(value.price)); 
    
    });
    calculatedSum = calculatedSum.toFixed(2);
    this.calculatedSum = calculatedSum;

    if ( this.props.basket_data.status<=1 )
      return "загрузка...";

    if ( this.props.basket_data.status===2 )
      return "ошибка загрузки данных";

    let tableCode = [];
    var basket_data_obj = this.state.basket_data.data;
    var amountWarningState=this.state.amountWarning;

    tableCode= this.state.basket_data.data && Object.keys(basket_data_obj).map(function(objectKey, index) {
      var prodInfo = basket_data_obj[objectKey];
      return <ProductRow key={index} product={prodInfo} amountErrState={amountWarningState} />;
    }); 

    return ( 
      <div className='MobileCompany'>
        <div className='MobileCompanyClients'>
          <table className='MobileCompanyTable'>
            <tbody>
              <tr>
                <th>{'Наименование товара'}</th>
                <th>{'Количество'}</th>
                <th>{'Цена'}</th>
                <th>{'Удалить'}</th>
              </tr>
              {tableCode}
            </tbody>
          </table>
        </div>
        <hr></hr>
        <label>Сумма заказа:</label><input type="text" ref={this.sumCalculationRef} value={calculatedSum} disabled></input>
        <hr></hr>
        <input type="button" value="Сохранить заказ" onClick={this.AddBtn} />
        <input type="button" value="Отменить заказ" onClick={this.DelBtn} />
      </div>
    );
  }

}

const mapStateToProps = function (state) {
  return {
    basket_data: state.basket_data,
  };
};

export default connect(mapStateToProps)(ProductsInBasket);