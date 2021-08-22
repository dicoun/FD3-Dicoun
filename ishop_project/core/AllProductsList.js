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
  }

  SendToBasket = (prodInfo) => {
    this.props.dispatch(addToBasketAC(this.props.dispatch, prodInfo));
  }

  render() {

    if ( this.props.products_list.status<=1 )
      return "загрузка...";

    if ( this.props.products_list.status===2 )
      return "ошибка загрузки данных";

    let tableCode= this.props.products_list.data && this.props.products_list.data.map( (prodInfo,index) =>
      <ProductBlock key={index} cbAddToBasket={this.SendToBasket} prodInfo={prodInfo}></ProductBlock>);

    return (
        <div className="productGrid">
          {tableCode}
          <div className="footer_info">
              &copy; All Rights Reserved, 2021
          </div>  
        </div>  
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