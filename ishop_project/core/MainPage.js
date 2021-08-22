import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { NavLink } from 'react-router-dom';

import './MainPage.css';

class MainPage extends React.PureComponent {
  
  state = {
    clickNum: 0
  };

  click = () => {
    var clickNum=this.state.clickNum + 1;
    this.setState({clickNum: clickNum});
  }

  render() {

    return (
          <div>
              <h1 className="shopName">MyGreenShop</h1>
              <div className="content">
                <NavLink to="/" exact className="nav-link" activeClassName="active" onClick={this.click}>Список товаров</NavLink>
                <NavLink to="/page/1" className="nav-link" activeClassName="active" onClick={this.click}>Список товаров постранично</NavLink>
                <NavLink to="/orders" className="nav-link" activeClassName="active" onClick={this.click}>Список заказов</NavLink>
                <NavLink to="/basket" className="nav-link" activeClassName="active" onClick={this.click}>Корзина</NavLink>
              </div>
          </div>
    );

  }

}

export default MainPage;
