import { PRODUCTS_LOADING, PRODUCTS_ERROR, PRODUCTS_SET, PRODUCT_ADD, BASKET_CLEAR/*, TAB_CHANGE*/ } from './basketAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function basketReducer(state=initState,action) {
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
        data:action.basket_data,
      };
      return newState;
    }

    case PRODUCT_ADD: {
      console.log(state);
      //console.log(action.pr);
      var basket_products;
      if(!state.data){
        basket_products = [];
        basket_products.push(action.product);
      }
      else{
        basket_products = state.data;
        basket_products.push(action.product);
      }
      let newState={
        status:4,
        data:basket_products,
      };
      return newState;
    }

    case BASKET_CLEAR: {
      let newState={
        status:5
      };
      return newState;
    }

  /*  case TAB_CHANGE: {
      console.log('action:',action);
      console.log('state до обработки редьюсером:',state);
      let newState={...state,
        tabNum:{...state.tabNum,
          [action.tabNum]:action.tabNum
        }
      };
      console.log('state после обработки редьюсером:',newState);
      return newState;
    }*/
    
    default:
      return state;
  }
}

export default basketReducer;