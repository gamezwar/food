import {
    GET_RECETA,
    GET_ID_RECETA,
    GET_DIETS,
    CLEAN_RECET,
    DELETE, //extra
 } from '../Action/action.js';

 const initState = {
    arr : [],
    idArr : {},
    diets : [],
 }



const rootReducer = (state = initState, action) =>{

    switch (action.type) {
        case GET_RECETA : return {
            ...state, 
            arr : action.payload
        };

        case GET_ID_RECETA : return{
            ...state,
              idArr : action.payload
        };

        case GET_DIETS : return{
            ...state,
                  diets : action.payload
        }
        case DELETE : return{
            ...state,
            arr : state.arr.filter(x => x.id !== action.payload)
        }
        case CLEAN_RECET :  return{
            ...state,
            idArr : {},
        }

        default: return{...state}
    }

};

export default rootReducer; 