import { combineReducers } from 'redux';

import productsReducer from "./productsReducer";
import productsPerPageReducer from "./productsPerPageReducer";
import productsAllReducer from "./productsAllReducer";
import basketReducer from "./basketReducer";
import ordersReducer from "./ordersReducer";

let combinedReducer=combineReducers({
    products: productsReducer, 
    products_per_page: productsPerPageReducer,
    products_list: productsAllReducer,
    basket_data: basketReducer,
    orders: ordersReducer,
});

export default combinedReducer;
