import {React,useEffect,useState} from 'react';
//axios
import tail from '../../../api/tail-api';
//components 
import Button from '../../../components/button/Button';
import ManageNav from '../../../components/managebar/ManageNav';
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
               <div className = "TailsTable">
                   {!Tails.length?(<label className ="EmptyTable" >הטבלה ריקה</label>):Tails.map(tail=><label key ={tail.id} className = "Tail">{tail.ID}</label>)}
               </div>
         </div>
    );
    const error = <label>TODO MAKE ERROR PAGE FOR MONGO</label>;//TODO MAKE ERROR PAGE FOR MONGO 
    return(
        <div>
            <ManageNav url="/tail"/>
            {_success?success:error}
        </div>
    );
};
export default Tail;