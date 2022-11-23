import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDiets} from '../../Redux/Action/action.js'
import './createRecipe.css';
import axios from "axios";
import { Link } from "react-router-dom";

const Create = () =>{
const dispatch = useDispatch();

useEffect(()=>{
      dispatch(getDiets())
},[dispatch]);

const diets = useSelector(x => x.diets);
    const [state, setState] = useState({
        name : '',  
        summary : '',
        healthScore : '',
        analyzedInstructions : [],
        image : '',
        diets : [],
    });

const [err, setErr] = useState({
    name : 'Enter the name of the recipe',  
    summary : 'enter summary of the recipe',
    healthScore : 'Enter health Score',
    analyzedInstructions : 'Enter analyzed Instructions',
    image : 'Enter image',
    diets : 'Enter diets',
    disabled : true,
    crar : true
});

const validate = (error) =>{
const {name ,summary, healthScore, image, disabled, analyzedInstructions, diets } = error;

if( name === '' && summary === '' && 
    healthScore === '' && image === ''&&
     disabled === true && analyzedInstructions === true &&
      diets === true) setErr((state) =>({...state, disabled : false}))

};

    const recipes = (evento)=>{
           evento.preventDefault();
           const { value, name } = evento.target;
           let newE = err;
           switch(name){
            case 'name' : newE.name = value.length < 3 ? 'Name must have more than two characters' : '' || /<|>|{|}|]|#/.test(value) ? 'it can not contain strange values' : '';
            break;
            case 'summary': newE.summary = value.length < 6 ? 'the summary must have more than five characters' : '';
            break;
            case 'healthScore': newE.healthScore = value.length < 1 ? 'health score level must be more than ten' : '';
            break;
            default:
                break;
           }
           setState((state) => ({...state, [name] : value }))
           setErr((state) => ({...state, [name] : newE[name] }));
           validate(err)
        };

const stepByStep = (e) => {
   e.preventDefault();
    const { value, name } = e.target;
    let newE = err.analyzedInstructions;
     newE = value.length < 6 ? 'Analyzed Instructions you must have more than five characters' : true;
      checked(name, [value]);
      setErr((state) => ({...state, [name] : newE }));
      validate(err)
};
    const checked = (name, value) =>{
      setState((state)=>({...state, [name] : value}));
    
      let newE = err.diets;
      newE = !value.length ? 'at least you must have a diet' : true;
      validarError(name , newE)
      validate(err)
    };

const check = (evento) =>{
   const { value, name } = evento.target;
   let diet = state.diets.map(x => x);
   let idDiets = diet.filter(D => D === value);

   if(!idDiets.length) {
    checked(name, [...diet, value]);
   }else{
    diet = diet.filter(x => x !== value);
    checked(name, [...diet])
   }
};
const validarError = (name, value) =>{
    setErr((state) => ({...state, [name] : value }));
    let errImg;
    if(name === 'image') {
        errImg =  /[png,jpeg]/.test(value) ? '' : 'Image must be png or jpeg type';
        setErr((state) => ({...state, image : errImg }));
    }
    validate(err)  
}

const send =async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/recipes', state)
 .then(Response => alert(Response.data))
 .catch(err => alert(err.data))
 
 setState((state)=>({...state, name : '', summary : '',
               healthScore : '', analyzedInstructions : [], 
               image : '', diets : []}));

      setErr((state) => ({...state,
        name : 'Enter the name of the diet',  
        summary : 'enter summary of the recipe',
        healthScore : 'Enter health Score',
        analyzedInstructions : 'Enter analyzed Instructions',
        image : 'Enter image',
        diets : 'Enter diets',
        disabled : true,
        crar : false
     }));

};
const imge = (e) =>{
    const { files, name, value } = e.target;
    let url = URL.createObjectURL(files[0]);
    setState((state)=>({...state, image : url}));
    validarError(name, value);
}

if(err.crar) return(<div className="createRecipe">
            <Link to={'/Home'}><button>Home</button></Link>
            <h1>Recipes</h1>
            <form onSubmit={(e)=>send(e)}>
                <label>Enter the name of the recipe</label>
                <input className={err.name ? 'err' : 'ok'} type="text" name ='name' value={state.name} 
                onChange={(e) => recipes(e)} placeholder='Enter the name of the recipe'/>
                 <p className={err.name && "errP"}>{err.name}</p>
                
                <label>step by step</label>
                <input className={err.analyzedInstructions.length ? 'err' : 'ok'} type="text" name="analyzedInstructions"
                 value={state.analyzedInstructions } onChange={(e)=> stepByStep(e)} placeholder='step by step'/>
                 <p className={err.analyzedInstructions && "errP"}>{err.analyzedInstructions}</p>
               
                <label>summary</label>
                <input className={err.summary ? 'err' : 'ok'} name="summary" value={state.summary}
                 onChange={(e) => recipes(e)} placeholder='Enter summary'/> 
                <p className={err.summary && "errP"}>{err.summary}</p>
                
                <label>Enter the recipe image </label>
                <input type="file" name="image" className={err.image ? 'err' : 'ok'} onChange={(e)=>imge(e)} />
                <p className={err.image && "errP"}>{err.image}</p>
                
                <ul className={err.diets.length && 'err'}>Diets
                <hr className="hr"/>
                {diets ? diets.map((D) =>{
                    return   <li className="chek" key={D.id}>
                               {D.name}
                               <hr/>
                               <input type='checkbox'
                                 className="chek"
                                 name='diets'
                                 value={D.id}
                                 onChange={(e) => check(e)}
                                 />
                              </li>
                }): null}</ul>
                <p className={err.diets && "errP"}>{err.diets}</p>

                <label>Health score</label>
                <input type="range" name="healthScore" className={err.healthScore ? 'err' : 'ok'}
                   value={state.healthScore} onChange={(e)=> recipes(e)} />
                 <p className={err.healthScore && "errP"}>{err.healthScore}</p>

                <button className={err.disabled ? 'okB' : 'errB'} type="submit" disabled={err.disabled} >Send...</button>
            </form>
           </div>)
            return  (<div className="BTN">
                       <h1>Want to create a new recipe </h1>
                        <button type="submit" onClick={()=> setErr(err => ({...err, crar : true}))} >
                            Create new recipe
                        </button>
                        <button><Link to={'/Home'}>Home</Link></button>
                        <button><Link to={'/'}>start</Link></button>
                   </div>)
};

export default Create;