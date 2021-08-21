const PRODUCTS_LOADING='PRODUCTS_LOADING';
const PRODUCTS_ERROR='PRODUCTS_ERROR';
const PRODUCTS_PER_PAGE_SET= 'PRODUCTS_PER_PAGE_SET';

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

const productsPerPageSetAC=function(products_per_page) {
  return {
    type: PRODUCTS_PER_PAGE_SET,
    products_per_page:products_per_page,
  };
}

/*const tab_change=function(tabNum) {
  return {
    type: TAB_CHANGE,
    tabNum: tabNum,
  };
}*/

export {
  productsLoadingAC,PRODUCTS_LOADING,
  productsErrorAC,PRODUCTS_ERROR,
  productsPerPageSetAC,PRODUCTS_PER_PAGE_SET
}
