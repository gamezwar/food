import axios from 'axios';


const GET_RECETA = 'GET_RECETA';
const GET_ID_RECETA = 'GET_ID_RECETA';
const GET_DIETS = 'GET_DIETS';
const DELETE = 'DELETE';
const CLEAN_RECET = 'CLEAN_RECET'; 

const getReceta = (name) =>{
    if(!name || name === '')
  return function(dispathc){
      return  axios.get(`http://localhost:3001/recipes`)
         .then(response => dispathc({
            type : GET_RECETA,
            payload : response.data
         }))
        .catch(err=> alert(err.data))
  };

  return function(dispathc){
    return  axios.get(`http://localhost:3001/recipes?name=${name}`)
       .then(response => dispathc({
          type : GET_RECETA,
          payload : response.data
       }))
       .catch(err=> alert(err.data))
};

};

const getIdReceta = (id) =>{
    return function (dispatch){
      return  axios.get(`http://localhost:3001/recipes/${id}`)
                   .then(response => dispatch({
                        type : GET_ID_RECETA,
                        payload : response.data
                   }))
                   .catch(err=> alert(err.message))
    }

};

const getDiets = () =>{
  return function(dispatch){
    return axios.get('http://localhost:3001/diets') 
          .then(response => dispatch({
            type : GET_DIETS,
            payload : response.data
          }))
          .catch(err=> alert(err.message))
  }
}

const deleteId = (id) =>{
   return {
    type : DELETE,
    payload : id
   }
}

const cleanRecet = () =>{
  return {
    type : CLEAN_RECET,
  }
};

export {
    GET_RECETA,
    GET_ID_RECETA,
    GET_DIETS,
    CLEAN_RECET,
    DELETE,
    getReceta,
    getIdReceta,
    getDiets,
    deleteId,
    cleanRecet,
};
