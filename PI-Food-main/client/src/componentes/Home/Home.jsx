import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReceta } from '../../Redux/Action/action.js';
import Card from '../house_card/houseCard.jsx';
import Pagina from '../Paginado/Paginas.jsx';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () =>{

    const [recet, setRecet] = useState({
        name : '',
        'A-Z' : false,
        'Z-A' : false,
        'original' : false,
        '+Saludable' : false,
        '-Saludable' : false, 
        estado : 'All',
    });
    
    const dispatc = useDispatch();

    useEffect(()=>{
        if(recet.name === '') dispatc(getReceta());
    },[dispatc, recet.name]);

   const edit = (evento) =>{
    evento.preventDefault()
     const value = evento.target.value;
     setRecet((state) => ({...state, [evento.target.name] : value}))
   }; 
   
   const enviar = (evento) =>{
       evento.preventDefault();
       dispatc(getReceta(recet.name))
    };

    const receta = useSelector((x)=> x.arr);

    const select = (e) =>{
         e.preventDefault();
         const diet = e.target.value;
         setRecet((state) => ({...state, estado : diet}))
};

let arr = []
const diet = receta.map((d)=> d.diets)
for(const d in diet){
    for(const n in diet[d]){
      arr.push(diet[d][n])       
    }
}

arr = [...new Set(arr)];

    const [num, setNum] = useState(1);
    const cantidad = 9;
    const mult = cantidad * num;
    const rest = mult - cantidad;
    const fill = recet.estado !== 'All' ? receta.filter(x => x.diets.includes(recet.estado)) : receta;
    let newRecipe = fill.slice(rest, mult); 

    const pag = (n, e) =>{
        e.preventDefault()
        setNum(n)
    };

    const prev = (e) =>{
      e.preventDefault();
      if(num > 1)setNum(num - 1)
    };

    const next = (e, arreglo) =>{
        e.preventDefault();
         if(num < arreglo.length)setNum(num + 1)};  

    const orden = (e)=>{
        e.preventDefault();
        const value = e.target.value;
       if(value === 'A-Z') setRecet((state) =>({...state, [value] : true, 'Z-A': false, original : false , '+Saludable': false, '-Saludable' : false }));
       if(value === 'Z-A') setRecet((state) =>({...state, [value] : true, 'A-Z': false, original : false, '+Saludable': false, '-Saludable' : false}));
       if(value === 'original') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, '+Saludable': false, '-Saludable' : false}));
       if(value === '+Saludable') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, original : false, '-Saludable' : false}));
       if(value === '-Saludable') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, '+Saludable': false, original : false,}));
    }
let p = newRecipe.map(x => x.name).sort()
let t = [];

if(recet['A-Z'] === true){
    for(const l of p){
            for(const x in newRecipe){
            if(newRecipe[x].name === l)
            t.push(newRecipe[x])
        }
    }
    newRecipe = t;
};

if(recet['Z-A'] === true){
    for(const l of p){
            for(const x in newRecipe){
            if(newRecipe[x].name === l)
            t.push(newRecipe[x])
        }
    }
    newRecipe = t.reverse();
};

if(recet['-Saludable'] === true) newRecipe.sort((a,b)=> a.healthScore - b.healthScore)
if(recet['+Saludable'] === true) newRecipe.sort((a,b)=> a.healthScore - b.healthScore).reverse()

    return(<div className='Home'>
        <Link to={'/'}><button>Inicio</button></Link>
            <h1>Bienvenidos a recetas de la casa </h1>
            <form onSubmit={(evento) => enviar(evento)}>
                <label>Busca tu receta favorita</label>
                <input type="text" name='name'
                 placeholder='Buscar' value={recet.name} onChange={(evento)=>{
                    edit(evento)
                 }} />
                <select name='select' onClick={(e)=> select(e)}> 
                 <option value='All'>All</option>
                    {arr.map((x, i) =>{
                    i = i++
                   return <option key={i} value={x} > {x} </option> })}
                   </select>
                <button type="submit" onClick={(evento) => enviar(evento)}>Buscar...</button>
                <select name='select' onClick={(e)=>orden(e)}>
                <option value='original'> original </option>
                <option value='A-Z'> Ordenar de A-Z </option>
                <option value='Z-A'> Ordenar de Z-A </option>
                <option value="+Saludable">Mas saludables</option>
                <option value="-Saludable">Menos saludables</option>
                </select>
            </form>

 <Pagina
 cantidad={cantidad}
 total={fill.length}
 number={pag}
 prev = {prev}
 next = {next}
 state = {num}
 />
 
{newRecipe ? newRecipe.map((x) =>{
            return <Card 
                key = {x.id}
                id = {x.id}
                healthScore = {x.healthScore}
                image = {x.image}
                name = {x.name}
            dishTypes = {x.dishTypes}
                diets = {x.diets}
            />
            }) : <p>loader...</p>}
        </div>)
}

export default Home;