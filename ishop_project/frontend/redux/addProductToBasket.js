import isoFetch from 'isomorphic-fetch';

import { productsLoadingAC, productsErrorAC, productsSetAC, productAddAC } from "./basketAC";

function addToBasketAC(dispatch, product) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        console.log(JSON.stringify(product));
        dispatch( productAddAC(product) );
        isoFetch("http://localhost:3000/api/basket/add", {
                method: 'POST',
                //mode: 'no-cors',
                body: JSON.stringify(product),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }) 
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .catch( (error) => {
                console.error(error);
                dispatch( productsErrorAC() );
            })
        ;
    }

}

export {addToBasketAC};
