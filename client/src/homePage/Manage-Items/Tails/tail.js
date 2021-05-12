import {React,useEffect,useState} from 'react';
import tail from '../../../api/tail-api';
const Tail = props =>{

    
    const [Tails,setTails] = useState("");
    tail.getAllTail().then(res=>res.data?setTails(res.data):setTails(res.error));
    
    
    return(
    <div>
        <h1>{Tails}</h1>
    </div>
)
};
export default Tail;