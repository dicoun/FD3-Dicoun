const PRODUCTS_LOADING='PRODUCTS_LOADING';
const PRODUCTS_ERROR='PRODUCTS_ERROR';
const PRODUCTS_SET='PRODUCTS_SET';
const PRODUCT_ADD='PRODUCT_ADD';
const BASKET_CLEAR='BASKET_CLEAR';


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

const productsSetAC=function(basket_data) {
    console.log(basket_data);
  return {
    type: PRODUCTS_SET,
    basket_data:basket_data,
  };
}

const productAddAC=function(product) {
  return {
    type: PRODUCT_ADD,
    product:product,
  };
}

const basketClearAC=function() {
  return {
    type: BASKET_CLEAR,
  };
}
//productsSaveAC

/*const tab_change=function(tabNum) {
  return {
    type: TAB_CHANGE,
    tabNum: tabNum,
  };
}*/

export {
  productsLoadingAC,PRODUCTS_LOADING,
  productsErrorAC,PRODUCTS_ERROR,
  productsSetAC,PRODUCTS_SET,
  productAddAC, PRODUCT_ADD,
  basketClearAC, BASKET_CLEAR
}