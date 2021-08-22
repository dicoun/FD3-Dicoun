import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { productsPerPageThunkAC } from "../redux/fetchThunkPerPage";
import { NavLink } from 'react-router-dom';

import { addToBasketAC } from '../redux/addProductToBasket';
import ProductBlock from './ProductBlock';

import './ProductsPerPageList.css';

class ProductsPerPageList extends React.PureComponent {

  static propTypes = {
    products_per_page: PropTypes.object.isRequired,
    basket_data: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch( productsPerPageThunkAC(this.props.dispatch, this.props.match.params.num) );
  }

  changePage = (EO) => {
    let page = EO.target.innerText;
    this.props.dispatch( productsPerPageThunkAC(this.props.dispatch, page) );
  }

  SendToBasket = (prodInfo) => {
    this.props.dispatch(addToBasketAC(this.props.dispatch, prodInfo));
  }

  render() {
    if ( this.props.products_per_page.status<=1 )
      return "загрузка...";

    if ( this.props.products_per_page.status===2 )
      return "ошибка загрузки данных";

      let tableCode= this.props.products_per_page.data && this.props.products_per_page.data.map( (prodInfo,index) =>{
        if(typeof prodInfo === 'object' ){
          return <ProductBlock key={index} cbAddToBasket={this.SendToBasket} prodInfo={prodInfo}></ProductBlock>
        }
      })
      if(this.props.products_per_page.data){
        var last=this.props.products_per_page.data.length-1;
        let navLinks=this.props.products_per_page.data[last]
        var navLinksArr=[];
        for (var i = 1; i <= navLinks; i++) {
          navLinksArr.push(<NavLink key={i} to={'/page/'+ i} className="page-link" activeClassName="active" onClick={this.changePage}>{i}</NavLink>);
        }
      }

    return (
      <div className="pageBlock">
        <div className="productGrid">
          {tableCode}
          <div className="footer_info">
              &copy; All Rights Reserved, 2021
          </div> 
        </div>  
        <div className="pagination">
          <div className="links">
           {navLinksArr}
          </div>
        </div>
      </div>
    );

  }

}

const mapStateToProps = function (state) {
  return {
    products_per_page: state.products_per_page,
    basket_data: state.basket_data,
  };
};
    
export default connect(mapStateToProps)(ProductsPerPageList);
    