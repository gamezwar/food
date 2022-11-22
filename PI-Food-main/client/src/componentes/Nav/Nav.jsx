import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

const Nav = () =>{

    return(<> 
           <div className ='nav' >
            <h1>Componente Nav </h1>
                <button><Link to={'/Home'}>Home</Link></button>
                <button><Link to={'/Create'}>Crea tu receta</Link></button>
          </div>
          </>)
};

export default Nav;