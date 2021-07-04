"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let count = 0;
let Frame = '';

colors.forEach(color => 
{ 
    if(!count){
        Frame = <RainbowFrame color={color}><div className='firstFrame'>Hello!</div></RainbowFrame>;
    }
    else{
        Frame = <RainbowFrame color={color}>{Frame}</RainbowFrame>;
    }
    count++;
});


ReactDOM.render(
    <div>{Frame}</div>,
    document.getElementById('container') 
);
