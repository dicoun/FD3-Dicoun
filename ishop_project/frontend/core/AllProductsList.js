import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './AllProductsList.css';

import { productsAllThunkAC } from "../redux/fetchAllProducts";
import { addToBasketAC } from '../redux/addProductToBasket';
import ProductBlock from './ProductBlock';

class AllProductsList extends React.PureComponent {
          
  static propTypes = {
    products_list: PropTypes.object.isRequired,
    basket_data: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch( productsAllThunkAC(this.props.dispatch) );
   // this.props.dispatch( basketThunkAC(this.props.dispatch) );
  }

  SendToBasket = (prodInfo) => {
    console.log(prodInfo);
   // this.props.dispatch( basketThunkAC(this.props.dispatch) );
    console.log(this.props.dispatch(addToBasketAC(this.props.dispatch, prodInfo)));
    console.log(this.props);
  }

  render() {
    //console.log(this.props.products_list.data);
    console.log(this.props);

    if ( this.props.products_list.status<=1 )
      return "загрузка...";

    if ( this.props.products_list.status===2 )
      return "ошибка загрузки данных";

    console.log(this.props.products_list.data);

    let tableCode= this.props.products_list.data && this.props.products_list.data.map( (prodInfo,index) =>
     // <li key={index}>{prodInfo['title']}</li>
      <ProductBlock key={index} cbAddToBasket={this.SendToBasket} prodInfo={prodInfo}></ProductBlock>);

    return (
      <div className="productGrid" style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between'}}>
         {tableCode}
      </div>  
      // <li key={index}>{prodInfo['title']}</li>
    );

  }

}

const mapStateToProps = function (state) {
  return {
    products_list: state.products_list,
    basket_data: state.basket_data,
  };
};

export default connect(mapStateToProps)(AllProductsList);