﻿import { PRODUCTS_LOADING, PRODUCTS_ERROR, PRODUCTS_SET/*, TAB_CHANGE*/ } from './productsAllAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function productsAllReducer(state=initState,action) {
  switch (action.type) {

    case PRODUCTS_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case PRODUCTS_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case PRODUCTS_SET: {
      let newState={
        status:3,
        data:action.products_list,
      };
      return newState;
    }
    
    default:
      return state;
  }
}

export default productsAllReducer;
