import {
    GET_RECIPE,
    GET_ID_RECIPE,
    GET_DIETS,
    CLEAN_RECIPE,
 } from '../Action/action.js';

 const initState = {
    newRecipes : [],
    recipeId : {},
    diets : [],
 }



const rootReducer = (state = initState, action) =>{

    switch (action.type) {
        case GET_RECIPE : return {
            ...state, 
            newRecipes : action.payload
        };

        case GET_ID_RECIPE : return{
            ...state,
              recipeId : action.payload
        };

        case GET_DIETS : return{
            ...state,
                  diets : action.payload
        }
        case CLEAN_RECIPE :  return{
            ...state,
            recipeId : {},
        }

        default: return{...state}
    }

};

export default rootReducer; 