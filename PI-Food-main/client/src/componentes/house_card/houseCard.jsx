import React from "react";
import { useDispatch } from 'react-redux';
import { deleteId } from "../../Redux/Action/action";
import { Link } from 'react-router-dom'
import '../Home/home.css';
const Card = (props) =>{

const dispatch = useDispatch();

const borrar = (id) => {
      dispatch(deleteId(id))
};

  return(<div className="Car">
      <button>{props.healthScore + '%'}</button>
          <img src={props.image} alt='imagen' className="img"/>

          <Link to={`/detalle/${props.id}`} >

                <h3 className="title">Title : {props.name} </h3>
          </Link>
            <ul>Tipo de plato : <hr /> {props.dishTypes ? props.dishTypes.map((x, i) => {
                                                 i = i++;
                                             return  <li key={i}> {x} </li>}) : 'no definido'
                                             } </ul>
          <ul><h3>Tipo de dieta :</h3>
          <hr />
          {
                props.diets && props.diets.map((x, i)=> {
                      i = i++ ;
                      return <li key={i}> {x} </li>
                  })}

         </ul>
            <button onClick={()=> borrar(props.id)}>borrar</button>
        
        </div>)
};

export default Card;