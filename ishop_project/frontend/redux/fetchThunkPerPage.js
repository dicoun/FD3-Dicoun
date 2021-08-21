import isoFetch from 'isomorphic-fetch';

import { productsLoadingAC, productsErrorAC, productsPerPageSetAC } from "./productsPerPageAC";

function productsPerPageThunkAC(dispatch, page) {
    console.log('fetch');
  //  console.log("http://localhost:3000/api/tasks/"+page);
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        dispatch( productsLoadingAC() );
        isoFetch("http://localhost:3000/api/products/"+page) 
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    console.log('TEST_1');
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    console.log('TEST_2');
                    console.log(response);
                    return response.json();
            })
            .then( (data) => {
                console.log('TEST_3');
                console.log(data);
                dispatch( productsPerPageSetAC(data) );
            })
            .catch( (error) => {
                console.log('TEST_4');
                console.error(error);
                dispatch( productsErrorAC() );
            })
        ;
    }

}

export {productsPerPageThunkAC};
