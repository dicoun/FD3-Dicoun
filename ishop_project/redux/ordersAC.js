const PRODUCTS_LOADING='PRODUCTS_LOADING';
const PRODUCTS_ERROR='PRODUCTS_ERROR';
const PRODUCTS_SET='PRODUCTS_SET';
const BASKET_SAVE='BASKET_SAVE';

const productsLoadingAC=function() {
  return {
    type: PRODUCTS_LOADING,
  };
}

const productsErrorAC=function() {
  return {
    type: PRODUCTS_ERROR,
  };
}

const productsSetAC=function(orders) {
  return {
    type: PRODUCTS_SET,
    orders:orders,
  };
}

const backetSaveAC=function(orders) {
  return {
    type: BASKET_SAVE,
    orders:orders,
  };
}

export {
  productsLoadingAC,PRODUCTS_LOADING,
  productsErrorAC,PRODUCTS_ERROR,
  productsSetAC,PRODUCTS_SET,
  backetSaveAC, BASKET_SAVE
}