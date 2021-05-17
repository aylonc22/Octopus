import {React,useEffect,useState} from 'react';
//axios
import tail from '../../../api/tail-api.js';
//components 
import Button from '../../../components/button/Button.js';
//Icons
import LeftArrow from '../../../icons/left-chevron.png';
import RightArrow from '../../../icons/right-chevron.png';
//Styling
import './tail.css'


const Tail = props =>{

    const[newTail,setNewTail] = useState("");
    const [Tails,setTails] = useState([]);
    const[submitTail,setSubmitTail] = useState("");
    const[_success,Set_Success] = useState(true);
    useEffect(()=>{
        tail.getAllTail().then(res=>
            {
                res.data?setTails(res.data):console.log()
                res.success?Set_Success(true):Set_Success(false)
            });//TODO when error need to change to mongo doesnt work page
    },[]);
    useEffect(()=>{
        let flag = false;//eslint-disable-next-line
        Tails.map(tail=>tail.ID==submitTail?flag=true:console.log());
        !flag && submitTail.length && 
        Number.isInteger(submitTail*1) &&
        submitTail.length===3
        ?tail.insertTail({ID:submitTail}):console.log();
        !flag && submitTail.length &&
         Number.isInteger(submitTail*1) &&
         submitTail.length===3
         ?setTails([...Tails,{ID:submitTail}]):console.log();
    },[submitTail,Tails])
    const success = (
            <div className = "TailsPage">
               <div className = "ManageTails">
                   מה תרצה לעשות
                   <div className = "">
                   <textarea className = "InsertTail" 
                   maxLength= "3" //Tail can be only 3 chars
                   value = {newTail}
                   onChange = {(e)=>setNewTail(e.target.value)}>
                   </textarea>
                   <Button  func = {()=>setSubmitTail(newTail)} name = "הוסף מספר זנב"/>
                   </div>
               </div>
               <div className = "Manage-Table-Tails">
               <div className = "Manage-Table-Top"> trololololololollo </div>
                   <div className = "Table">
                    <div className ="Parameter-Name-Component">
                    <label className = "Parameter-Name-Right">מס"ז</label>
                    <label className = "Parameter-Name-Left">סוג</label>
                    <label className = "Count"></label>
                    </div>
                    
                   {!Tails.length?(<label className ="EmptyTable" >הטבלה ריקה</label>):Tails.map(tail=><div className = "Tails">
                       <label key ={tail.id} className = "Tail">{tail.ID}</label></div>)}
                   </div>
                    <div className = "Manage-Table-Bottom"> 
                    <img className ="Left-Button" src = {LeftArrow} ></img>
                    <img className ="Right-Button" src = {RightArrow} ></img>
                    </div>
               </div>
         </div>
    );
    const error = <label>TODO MAKE ERROR PAGE FOR MONGO</label>;//TODO MAKE ERROR PAGE FOR MONGO 
    return(
        <div>
            {_success?success:error}
        </div>
    );
};
export default Tail;