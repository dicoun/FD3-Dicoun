import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './ProductsInBasket.css';

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
    basket_data: this.props.basket_data
  };

  componentDidMount() {
    this.props.dispatch( showBasketAC(this.props.dispatch) );
    voteEvents.addListener('CountChanged',this.CountChanged);
    voteEvents.addListener('DeleteBtnClicked',this.DeleteBtnClicked);
  }
  componentWillUnmount = () => {
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
  }
  
  DeleteBtnClicked = (prod_id) => {
    let newBasketData={...this.state.basket_data.data};
    let delIndex = 0;
    var newBasketDataArr = Object.values(newBasketData);
    newBasketDataArr.forEach( (c,i) => {
      if(c.prod_id == prod_id){
        delIndex = i;
      }
    });
    newBasketDataArr.splice(delIndex,1);
    this.setState({basket_data: {data: newBasketDataArr, status: 3}});
  }

  CountChanged = (prod_id, amount) => {
    var num = +amount;
    if(Number.isNaN(num)){
      num = 0;
    }
    let newBasketData={...this.state.basket_data.data}; 
    Object.keys(newBasketData).map(function(objectKey, i) {
      var value = newBasketData[objectKey];
      let newRow={...value}; 
      if(value.prod_id == prod_id){
          newRow.count=num;
          newBasketData[i]=newRow;
      }
    });
    var newBasketDataArr = Object.values(newBasketData);
    this.setState({basket_data: {data:newBasketDataArr,status:3}});
  }

  render() {
    let calculatedSum = 0;
    var basket_data = this.state.basket_data.data;
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

    tableCode= this.state.basket_data.data && Object.keys(basket_data_obj).map(function(objectKey, index) {
      var prodInfo = basket_data_obj[objectKey];
      return <ProductRow key={index} product={prodInfo}/>;
    }); 

    return ( 
      <div className='BasketBlock'>
        <div>
          <table className='BacketTable'>
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
        <div className="buttonGroup">
          <input type="button" value="Сохранить заказ" onClick={this.AddBtn} />
          <input type="button" value="Отменить заказ" onClick={this.DelBtn} />
        </div>
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