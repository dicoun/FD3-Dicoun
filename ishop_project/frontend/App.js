"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from './redux/reducers.js';

import PagesRouter from './core/PagesRouter';
import MainPage from './core/MainPage';

let store=createStore(combinedReducer, applyMiddleware(thunk));

ReactDOM.render( 
  <BrowserRouter>
     <Provider store={store}>
      <div>
        <MainPage />
        <PagesRouter />
      </div>
    </Provider>
  </BrowserRouter>
, document.getElementById('container') );