import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { NavLink } from 'react-router-dom';

import './MainPage.css';

class MainPage extends React.PureComponent {

  render() {

    return (
          <div>
              <h1>Продукты</h1>
              <div className="tab">
                <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Список товаров</NavLink>
                <NavLink to="/page/1" className="PageLink" activeClassName="ActivePageLink">Список товаров постранично</NavLink>
                <NavLink to="/orders" className="PageLink" activeClassName="ActivePageLink">Список заказов</NavLink>
                <NavLink to="/basket" className="BasketLink" activeClassName="ActiveBasketLink">Корзина</NavLink>
              </div>
          </div>
    );

  }

}

export default MainPage;
