import React from "react";
import './detail.css';
import { Link } from 'react-router-dom'

const CardDetail = (props) =>{

    return(<div className="detail">
      <Link to={'/Home'}><button>Home</button></Link> 
      <Link to={'/Create'}><button>Crear receta</button></Link> 
             
             <img src={props.image} alt="imagen" />

             <h3>{props.name}</h3>
             
             <ul> <h4> Tipo de dieta : </h4>
             
             {
                props.diets && props.diets.map((x, i) => {
                   i = i++;
                   return <li key={i}>{x}</li>
             })}

             </ul>
             <p>{props.summary}</p>
             <p>Nivel de comida saludable {`${props.healthScore} %`}</p>
             <ul> Paso a paso : {
              props.analyzedInstructions && props.analyzedInstructions.map((d, i) => {
              i = i++
             return <li key={i}>{d}</li>})
             }</ul>

          </div>)

};

export default CardDetail;