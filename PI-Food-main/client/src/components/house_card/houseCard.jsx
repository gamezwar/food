import React from "react";
import { Link } from 'react-router-dom'
import '../Home/home.css';


const Card = (props) =>{

  return(<div className="Car">
      <div>
      <label className = {props.healthScore > 50 ? 'Healthier' : 'less_healthy' }>
      {
         ` Is healthier ${props.healthScore} % `
      }
      </label>
          <img src={props.image} alt="not found"/>

          <Link to={`/detail/${props.id}`} >

                <h3>{props.name} </h3>
          </Link>
            <ul>Dish <hr /> {props.dishTypes ? props.dishTypes.map((x, i) => {
                                                 i = i++;
                                             return  <li key={i}> {x} </li>}) : 'not defined'
                                             } </ul>
          <ul><h3>Diets type :</h3>
          <hr />
          {
                props.diets && props.diets.map((x, i)=> {
                      i = i++ ;
                      return <li key={i}> {x} </li>
                  })}

         </ul>
            </div>
        </div>)
};

export default Card;