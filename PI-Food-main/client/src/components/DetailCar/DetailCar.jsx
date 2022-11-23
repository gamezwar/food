import React from "react";
import './detail.css';
import { Link } from 'react-router-dom'

const CardDetail = (props) =>{
console.log(props);
if(props.image)
    return(<div className="detail">
      <Link to={'/Home'}><button>Home</button></Link> 
      <Link to={'/Create'}><button>Create recipe</button></Link> 
             
             <img src={props.image} alt="not found" />

             <h3>{props.name}</h3>
             
             <ul> <h4> Diets type : </h4>
             
             {
                props.diets && props.diets.map((x, i) => {
                   i = i++;
                   return <li key={i}>{x}</li>
             })}

             </ul>
             <p>{props.summary}</p>
             <p>Healthcare level {`${props.healthScore} %`}</p>
             <ul>Step by step : {
              props.analyzedInstructions && props.analyzedInstructions.map((d, i) => {
              i = i++
             return <li key={i}>{d}</li>})
             }</ul>

          </div>)
          else return ( <div className="detail">
                        <h1>Not found</h1>
                         <Link to={'/Home'}><button>Home</button></Link> 
                      </div>)

};

export default CardDetail;