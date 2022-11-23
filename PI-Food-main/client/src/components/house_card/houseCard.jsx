import React from "react";
import { useDispatch } from 'react-redux';
import { deleteId } from "../../Redux/Action/action";
import { Link } from 'react-router-dom'
import '../Home/home.css';
const Card = (props) =>{

const dispatch = useDispatch();

const remove = (id) => {
      dispatch(deleteId(id))
};

  return(<div className="Car">
      <button>{props.healthScore + '%'}</button>
          <img src={props.image} alt="not found"/>

          <Link to={`/detail/${props.id}`} >

                <h3 className="title">Title : {props.name} </h3>
          </Link>
            <ul>Dish : <hr /> {props.dishTypes ? props.dishTypes.map((x, i) => {
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
            <button onClick={()=> remove(props.id)}>remove</button>
        
        </div>)
};

export default Card;