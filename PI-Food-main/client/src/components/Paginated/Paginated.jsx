import React from 'react';
import './paginated.css';

const Paginated = ({quantity, total, number, prev, next, state}) =>{
const arr = [];

for(let i = 1; i <= Math.ceil(total / quantity); i++){
    arr.push(i);
}

return(<div className='paginated'>
         <input type="button" value='previous' onClick={(e)=> prev(e)}/>
         {arr && arr.map((i) => <input className={state === i ? 'active' : null} type="button" key={i} value={i} onClick={(e) => number(i, e)} />)}
         <input type="button" value="next" onClick={(e)=> next(e, arr)} />
      </div>)

};


export default Paginated;
