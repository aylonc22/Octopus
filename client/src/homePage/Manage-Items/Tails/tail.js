import {React,useEffect,useState} from 'react';
import tail from '../../../api/tail-api';
import Button from '../../../components/button/Button';
import './tail.css'
const Tail = props =>{

    const[newTail,setNewTail] = useState("");
    const [Tails,setTails] = useState([]);
    const[submitTail,setSubmitTail] = useState("");
    useEffect(()=>{
        tail.getAllTail().then(res=>res.data?setTails(res.data):console.log());//TODO when error need to change to s=mongo doesnt work page
    },[]);
    useEffect(()=>{
        let flag = false;//eslint-disable-next-line
        Tails.map(tail=>tail.ID==submitTail?flag=true:console.log());
        !flag && submitTail.length && Number.isInteger(submitTail*1)?tail.insertTail({ID:submitTail}):console.log();
        !flag && submitTail.length && Number.isInteger(submitTail*1)?setTails([...Tails,{ID:submitTail}]):console.log();
    },[submitTail,Tails])
    
    return(
    <div className = "TailsPage">
        <div className = "ManageTails">
             מה תרצה לעשות
            <div className = "">
            <textarea className = "" 
            value = {newTail}
            onChange = {(e)=>setNewTail(e.target.value)}>
            </textarea>
            <Button  func = {()=>setSubmitTail(newTail)} name = "הוסף מספר זנב"/>
            </div>
        </div>
        <div className = "TailsTable">
            {!Tails.length?"הטבלה ריקה":Tails.map(tail=><label key ={tail.id} className = "Tail">{tail.ID}</label>)}
        </div>
    </div>
)
};
export default Tail;