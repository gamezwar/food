import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

const Nav = () =>{

    return(<> 
           <div className ='nav' >
            <h1>Welcome to save Recipes </h1>
                <button><Link to={'/Home'}>Home</Link></button>
                <button><Link to={'/Create'}>Create your recipe</Link></button>
          </div>
          </>)
};

export default Nav;