import React, { useEffect } from "react";
import { cleanRecet, getIdReceta } from "../../Redux/Action/action";
import { useDispatch, useSelector } from 'react-redux'
import CardDetail from "../DetailCar/DetailCar";

const Detalle = (props) =>{

  const dispatch = useDispatch()
  
  const id = props.match.params.id;

  useEffect(()=>{
    dispatch(getIdReceta(id));

    return ()=> dispatch(cleanRecet());
  },[id, dispatch]);

  const receta = useSelector((state) => state.idArr);

    return(<div>
            <h1>Detalle</h1>
            {receta ? 
            <CardDetail 
             image ={receta.image}
             name ={receta.name}
             diets ={receta.diets}
             analyzedInstructions ={receta.analyzedInstructions}
             summary ={receta.summary}
             healthScore = {receta.healthScore}
            />: <p>'loader...'</p>}
          </div>)
};

export default Detalle;