import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import OrderList from './OrderList';
import AllProductsList from './AllProductsList';
import ProductsPerPageList from './ProductsPerPageList';
import ProductsInBasket from './ProductsInBasket';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={AllProductsList} />
        <Route path="/orders" exact component={OrderList} />
        <Route path="/page/:num" exact component={ProductsPerPageList} />
        <Route path="/basket" exact component={ProductsInBasket} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    