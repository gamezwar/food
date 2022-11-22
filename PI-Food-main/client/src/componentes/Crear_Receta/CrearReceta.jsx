import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDiets} from '../../Redux/Action/action.js'
import './crearReceta.css';
import axios from "axios";
import { Link } from "react-router-dom";

const Create = () =>{
const dispatch = useDispatch();

useEffect(()=>{
      dispatch(getDiets())
},[dispatch]);

const diets = useSelector(x => x.diets);
    const [estado, setEstado] = useState({
        name : '',  
        summary : '',
        healthScore : '',
        analyzedInstructions : [],
        image : '',
        diets : [],
    });

const [err, setErr] = useState({
    name : 'Ingrese nombre de la dieta',  
    summary : 'Ingrese summary',
    healthScore : 'Ingrese healthScore',
    analyzedInstructions : 'Ingrese analyzedInstructions',
    image : 'Ingrese image',
    diets : 'Ingrese diets',
    disabled : true,
    crar : true
});

const validar = (error) =>{
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
            case 'name' : newE.name = value.length < 3 ? 'Name debe tener mas de 2 caracteres' : '' || /<|>|{|}|]|#/.test(value) ? 'no puede contener valores extraños' : '';
            break;
            case 'summary': newE.summary = value.length < 6 ? 'Summary debe tener mas de 5 caracteres' : '';
            break;
            case 'healthScore': newE.healthScore = value.length < 1 ? 'HealthScore debe tener almenos 1 caracteres' : '';
            break;
            default:
                break;
           }
           setEstado((state) => ({...state, [name] : value }))
           setErr((state) => ({...state, [name] : newE[name] }));
           validar(err)
        };

const pasoApaso = (e) => {
   e.preventDefault();
    const { value, name } = e.target;
    let newE = err.analyzedInstructions;
     newE = value.length < 6 ? 'AnalyzedInstructions debe tener mas de 5 caracteres' : true;
      chequeador(name, [value]);
      setErr((state) => ({...state, [name] : newE }));
      validar(err)
};
    const chequeador = (name, value) =>{
      setEstado((state)=>({...state, [name] : value}));
    
      let newE = err.diets;
      newE = !value.length ? 'Diets almenos debe tener una dieta ' : true;
      validarError(name , newE)
      validar(err)
    };

const check = (evento) =>{
   const { value, name } = evento.target;
   let diet = estado.diets.map(x => x);
   let idDiets = diet.filter(D => D === value);

   if(!idDiets.length) {
    chequeador(name, [...diet, value]);
   }else{
    diet = diet.filter(x => x !== value);
    chequeador(name, [...diet])
   }
};
const validarError = (name, value) =>{
    setErr((state) => ({...state, [name] : value }));
    let errImg;
    if(name === 'image') {
        errImg =  /[png,jpeg]/.test(value) ? '' : 'Imagen debe ser de tipo imagen';
        setErr((state) => ({...state, image : errImg }));
    }
    validar(err)  
}

const env =async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/recipes', estado)
 .then(Response => alert(Response.data))
 .catch(err => alert(err.data))
 
 setEstado((state)=>({...state, name : '', summary : '',
               healthScore : '', analyzedInstructions : [], 
               image : '', diets : []}));

      setErr((state) => ({...state,
        name : 'Ingrese nombre de la dieta',  
        summary : 'Ingrese summary',
        healthScore : 'Ingrese healthScore',
        analyzedInstructions : 'Ingrese analyzedInstructions',
        image : 'Ingrese image',
        diets : 'Ingrese diets',
        disabled : true,
        crar : false
     }));

};
const imge = (e) =>{
    const { files, name, value } = e.target;
    let url = URL.createObjectURL(files[0]);
    setEstado((state)=>({...state, image : url}));
    validarError(name, value);
}

if(err.crar) return(<div className="crearRecet">
            <Link to={'/Home'}><button>Home</button></Link>
            <h1>Recetas</h1>
            <form onSubmit={(e)=>env(e)}>
                <label>Ingresa el nombre de la receta</label>
                <input className={err.name ? 'err' : 'ok'} type="text" name ='name' value={estado.name} 
                onChange={(e) => recipes(e)} placeholder='ingresa el nombre de la receta'/>
                 <p className={err.name && "errP"}>{err.name}</p>
                
                <label>paso a paso</label>
                <input className={err.analyzedInstructions.length ? 'err' : 'ok'} type="text" name="analyzedInstructions"
                 value={estado.analyzedInstructions } onChange={(e)=> pasoApaso(e)} placeholder='ingresa el paso a paso'/>
                 <p className={err.analyzedInstructions && "errP"}>{err.analyzedInstructions}</p>
               
                <label>summary</label>
                <input className={err.summary ? 'err' : 'ok'} name="summary" value={estado.summary}
                 onChange={(e) => recipes(e)} placeholder='ingresa el resumen de la receta'/> 
                <p className={err.summary && "errP"}>{err.summary}</p>
                
                <label>Agrega la imagen de la receta</label>
                <input type="file" name="image" className={err.image ? 'err' : 'ok'} onChange={(e)=>imge(e)} />
                <p className={err.image && "errP"}>{err.image}</p>
                
                <ul className={err.diets.length && 'err'}>Dieta
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

                <label>NIVEL_DE_COMIDA_SALUDABLE</label>
                <input type="range" name="healthScore" className={err.healthScore ? 'err' : 'ok'}
                   value={estado.healthScore} onChange={(e)=> recipes(e)} />
                 <p className={err.healthScore && "errP"}>{err.healthScore}</p>

                <button className={err.disabled ? 'okB' : 'errB'} type="submit" disabled={err.disabled} >Enviar...</button>
            </form>
           </div>)
            return  (<div className="BTN">
                       <h1>Deseas crear una nueva receta </h1>
                        <button type="submit" onClick={()=> setErr(err => ({...err, crar : true}))} >
                            Crear nueva receta
                        </button>
                        <button><Link to={'/Home'}>Home</Link></button>
                        <button><Link to={'/'}>Inicio</Link></button>
                   </div>)
};

export default Create;