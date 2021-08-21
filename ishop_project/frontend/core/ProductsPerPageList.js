import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { productsPerPageThunkAC } from "../redux/fetchThunkPerPage";
import { NavLink } from 'react-router-dom';

import { addToBasketAC } from '../redux/addProductToBasket';
import ProductBlock from './ProductBlock';

class ProductsPerPageList extends React.PureComponent {

  static propTypes = {
    products_per_page: PropTypes.object.isRequired,
    basket_data: PropTypes.object,
  };

  componentDidMount() {
    console.log('did_mount');
    this.props.dispatch( productsPerPageThunkAC(this.props.dispatch, this.props.match.params.num) );
  }

  changePage = (EO) => {
    let page = EO.target.innerText;
    this.props.dispatch( productsPerPageThunkAC(this.props.dispatch, page) );
  }

  SendToBasket = (prodInfo) => {
    console.log(prodInfo);
   // this.props.dispatch( basketThunkAC(this.props.dispatch) );
    console.log(this.props.dispatch(addToBasketAC(this.props.dispatch, prodInfo)));
    console.log(this.props);
  }

  render() {
    console.log(this.props.products_per_page.data);
    console.log(this.props.match.params.num);
    console.log(this.props);

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
          console.log(i);
          navLinksArr.push(<NavLink key={i} to={'/page/'+ i} className="PageLink" activeClassName="ActivePageLink" onClick={this.changePage} style={{display:'inline-block', border: '1px solid', padding: '4px 10px', textDecoration:'none', color:'#A3A3A3'}}>{i}</NavLink>);
        }
      }

    return (
      <div>
        <div className="productGrid" style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', marginBottom:'10px'}}>
          {tableCode}
        </div>  
        <div className="pagination" style={{textAlign:'center', paddingTop: '8px', borderTop:'1px solid #c6e6e3', display: 'inline-block', width:'100%', marginBottom:'10px', textAlign:'center'}}>
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
    