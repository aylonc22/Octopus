import {React,useEffect,useState} from 'react';
import {insertTail,getAllTail} from '../../../api/tail-api';
const Tail = props =>{

    const [Tails,setTails] = useState(getAllTail);
console.log(Tails)
    return(
    <div>
        <h1>h</h1>
    </div>
)
};
export default Tail;