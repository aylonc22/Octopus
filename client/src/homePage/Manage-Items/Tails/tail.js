import {React,useEffect,useState} from 'react';
import tail from '../../../api/tail-api';
import Button from '../../../components/button/Button';
const Tail = props =>{

    const[newTail,setNewTail] = useState("");
    const [Tails,setTails] = useState("");
    tail.getAllTail().then(res=>res.data?setTails(res.data[0]):setTails(res.error));
    
    
    return(
    <div>
        <div><h1>{Tails}</h1></div>
        <div className = "ManageTails">
             מה תרצה לעשות
            <div className = "">
            <textarea className = "" 
            value = {newTail}
            onChange = {(e)=>setNewTail(e.target.value)}>
            </textarea>
            <Button func = {()=>tail.insertTail({ID:newTail})} name = "הוסף מספר זנב"/>
            </div>
        </div>
        
    </div>
)
};
export default Tail;