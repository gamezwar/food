import axios from 'axios';


const GET_RECIPE = 'GET_RECIPE';
const GET_ID_RECIPE = 'GET_ID_RECIPE';
const GET_DIETS = 'GET_DIETS';
const DELETE = 'DELETE';
const CLEAN_RECIPE = 'CLEAN_RECIPE'; 

const getRecipe = (name) =>{
    if(!name || name === '')
  return function(dispathc){
      return  axios.get(`http://localhost:3001/recipes`)
         .then(response => dispathc({
            type : GET_RECIPE,
            payload : response.data
         }))
        .catch(err=> alert(err.response.data))
  };

  return function(dispathc){
    return  axios.get(`http://localhost:3001/recipes?name=${name}`)
       .then(response => dispathc({
          type : GET_RECIPE,
          payload : response.data
       }))
       .catch(err=> alert(err.response.data))
};

};

const getIdRecipe = (id) =>{
    return function (dispatch){
      return  axios.get(`http://localhost:3001/recipes/${id}`)
                   .then(response => dispatch({
                        type : GET_ID_RECIPE,
                        payload : response.data
                   }))
                   .catch(err=> alert(err.response.data))
    }

};

const getDiets = () =>{
  return function(dispatch){
    return axios.get('http://localhost:3001/diets') 
          .then(response => dispatch({
            type : GET_DIETS,
            payload : response.data
          }))
          .catch(err=> alert(err.response.data))
  }
}

const deleteId = (id) =>{
   return {
    type : DELETE,
    payload : id
   }
}

const cleanRecipe = () =>{
  return {
    type : CLEAN_RECIPE,
  }
};

export {
    GET_RECIPE,
    GET_ID_RECIPE,
    GET_DIETS,
    CLEAN_RECIPE,
    DELETE,
    getRecipe,
    getIdRecipe,
    getDiets,
    deleteId,
    cleanRecipe,
};
