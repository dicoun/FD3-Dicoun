const PRODUCTS_LOADING='PRODUCTS_LOADING';
const PRODUCTS_ERROR='PRODUCTS_ERROR';
const PRODUCTS_SET='PRODUCTS_SET';

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

const productsSetAC=function(products_list) {
  return {
    type: PRODUCTS_SET,
    products_list:products_list,
  };
}

export {
  productsLoadingAC,PRODUCTS_LOADING,
  productsErrorAC,PRODUCTS_ERROR,
  productsSetAC,PRODUCTS_SET
}
