import React from 'react';
import './paginado.css';

const Pagina = ({cantidad, total, number, prev, next, state}) =>{
const arr = [];

for(let i = 1; i <= Math.ceil(total / cantidad); i++){
    arr.push(i);
}

return(<div className='paginas'>
         <input type="button" value='prev' onClick={(e)=> prev(e)}/>
         {arr && arr.map((i) => <input className={state === i ? 'activo' : null} type="button" key={i} value={i} onClick={(e) => number(i, e)} />)}
         <input type="button" value="next" onClick={(e)=> next(e, arr)} />
      </div>)

};


export default Pagina;
