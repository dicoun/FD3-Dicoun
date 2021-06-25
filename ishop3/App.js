"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ShopBlock from './components/ShopBlock';

let GoodsPropsArr=require('./goods.json');
let shopName = 'Smart Divices';

ReactDOM.render(
    <ShopBlock
        name={shopName}
        goods={GoodsPropsArr}
    />,
    document.getElementById('container') 
);
