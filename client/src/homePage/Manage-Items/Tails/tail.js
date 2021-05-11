import {React,useEffect,useState} from 'react';
import tail from '../../../api/tail-api';
const Tail = props =>{

    const [Tails,setTails] = useState(tail.getAllTail);
    let test = "";
    Tails.then(res=>test = res.data.error);
    let test2 = test==="Tail not found"?"Tail not found":"LOL";
    return(
    <div>
        <h1>{test2}</h1>
    </div>
)
};
export default Tail;