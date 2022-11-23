import React, { useEffect } from "react";
import { cleanRecipe, getIdRecipe } from "../../Redux/Action/action";
import { useDispatch, useSelector } from 'react-redux'
import CardDetail from "../DetailCar/DetailCar";

const Details = (props) =>{

  const dispatch = useDispatch()
  
  const id = props.match.params.id;

  useEffect(()=>{
    dispatch(getIdRecipe(id));

    return ()=> dispatch(cleanRecipe());
  },[id, dispatch]);

  const recipe = useSelector((state) => state.recipeId);

    return(<div>
            <h1>Details</h1>
            {recipe ? 
            <CardDetail 
             image ={recipe.image}
             name ={recipe.name}
             diets ={recipe.diets}
             analyzedInstructions ={recipe.analyzedInstructions}
             summary ={recipe.summary}
             healthScore = {recipe.healthScore}
            />: <p>'loading...'</p>}
          </div>)
};

export default Details;