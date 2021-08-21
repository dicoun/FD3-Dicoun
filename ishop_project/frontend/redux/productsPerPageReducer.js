import { PRODUCTS_LOADING, PRODUCTS_ERROR, PRODUCTS_PER_PAGE_SET/*, TAB_CHANGE*/ } from './productsPerPageAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function productsPerPageReducer(state=initState,action) {
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

    case PRODUCTS_PER_PAGE_SET: {
      let newState={
        status:3,
        data:action.products_per_page,
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

export default productsPerPageReducer;
