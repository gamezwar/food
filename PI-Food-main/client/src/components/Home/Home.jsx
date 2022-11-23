import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../../Redux/Action/action.js';
import Card from '../house_card/houseCard.jsx';
import Paginated from '../Paginated/Paginated.jsx'
import './home.css';
import { Link } from 'react-router-dom';

const Home = () =>{

    const [recet, setRecet] = useState({
        name : '',
        'A-Z' : false,
        'Z-A' : false,
        'original' : false,
        '+healthy' : false,
        '-healthy' : false, 
        state : 'All',
    });
    
    const dispatc = useDispatch();

    useEffect(()=>{
        if(recet.name === '') dispatc(getRecipe());
    },[dispatc, recet.name]);

   const edit = (evento) =>{
    evento.preventDefault()
     const value = evento.target.value;
     setRecet((state) => ({...state, [evento.target.name] : value}))
   }; 
   
   const send = (evento) =>{
       evento.preventDefault();
       dispatc(getRecipe(recet.name))
    };

    const recipe = useSelector((x)=> x.newRecipes);

    const select = (e) =>{
         e.preventDefault();
         const diet = e.target.value;
         setRecet((state) => ({...state, state : diet}))
};

let arr = []
const diet = recipe.map((d)=> d.diets)
for(const d in diet){
    for(const n in diet[d]){
      arr.push(diet[d][n])       
    }
}

arr = [...new Set(arr)];

    const [num, setNum] = useState(1);
    const quantity = 9;
    const multiply = quantity * num;
    const subtract = multiply - quantity;
    const filters = recet.state !== 'All' ? recipe.filter(x => x.diets.includes(recet.state)) : recipe;
    let newRecipe = filters.slice(subtract, multiply); 

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
       if(value === 'A-Z') setRecet((state) =>({...state, [value] : true, 'Z-A': false, original : false , '+healthy': false, '-healthy' : false }));
       if(value === 'Z-A') setRecet((state) =>({...state, [value] : true, 'A-Z': false, original : false, '+healthy': false, '-healthy' : false}));
       if(value === 'original') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, '+healthy': false, '-healthy' : false}));
       if(value === '+healthy') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, original : false, '-healthy' : false}));
       if(value === '-healthy') setRecet((state) =>({...state, [value] : true, 'Z-A': false, 'A-Z' : false, '+healthy': false, original : false,}));
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

if(recet['-healthy'] === true) newRecipe.sort((a,b)=> a.healthScore - b.healthScore)
if(recet['+healthy'] === true) newRecipe.sort((a,b)=> a.healthScore - b.healthScore).reverse()

    return(<div className='Home'>
        <Link to={'/'}><button>start</button></Link>
            <h1>Recipes </h1>
            <form onSubmit={(evento) => send(evento)}>
                <label>Look for your favorite recipe</label>
                <input type="text" name='name'
                 placeholder='search' value={recet.name} onChange={(evento)=>{
                    edit(evento)
                 }} />
                <select name='select' onClick={(e)=> select(e)}> 
                 <option value='All'>All</option>
                    {arr.map((x, i) =>{
                    i = i++
                   return <option key={i} value={x} > {x} </option> })}
                   </select>
                <button type="submit" onClick={(evento) => send(evento)}>search...</button>
                <select name='select' onClick={(e)=>orden(e)}>
                <option value='original'> original </option>
                <option value='A-Z'> Sort of the A-Z </option>
                <option value='Z-A'> Sort of the Z-A </option>
                <option value="+healthy">Healthier</option>
                <option value="-healthy">less healthy</option>
                </select>
            </form>

 <Paginated
 quantity={quantity}
 total={filters.length}
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
            }) : <p>loading...</p>}
        </div>)
}

export default Home;