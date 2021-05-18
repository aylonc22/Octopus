import {React,useEffect,useState} from 'react';
//axios
import tail from '../../../api/tail-api.js';
//components 
import Button from '../../../components/button/Button.js';
//Icons
import LeftArrow_icon from '../../../icons/left-chevron.png';
import RightArrow_icon from '../../../icons/right-chevron.png';
import Add_icon from '../../../icons/add.png';
import Edit_icon from '../../../icons/edit.png';
import Trash_icon from '../../../icons/trash.png'; // Delete Icon
//Styling
import './tail.css'


const Tail = props =>{

    const [newTail,setNewTail] = useState("");
    const [Tails,setTails] = useState([]);
    const [submitTail,setSubmitTail] = useState("");
    const [_success,Set_Success] = useState(true);
    const [_rightArrow,setRightArrow] = useState(9);
    const [_leftArrow,setLeftArrow] = useState(0);
    
    //Handlers
    const handleRightArrow = ()=>{
        if(Tails.length && Tails.length>_rightArrow)
        {
            setRightArrow(_rightArrow + 10);
            setLeftArrow(_leftArrow + 10);
        }
    };
    
    const handleLeftArrow = ()=>{
        if(Tails.length && _leftArrow>0)
        {
            setRightArrow(_rightArrow - 10);
            setLeftArrow(_leftArrow - 10);
        }
    };

    const handleAdd =( <div className = "">
    <textarea className = "InsertTail" 
    maxLength= "3" //Tail can be only 3 chars
    value = {newTail}
    onChange = {(e)=>setNewTail(e.target.value)}>
    </textarea>
    <Button  func = {()=>{setSubmitTail(newTail);setNewTail("")}} name = "הוסף מספר זנב"/>
    </div>);

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
        ?tail.insertTail({ID:submitTail}):console.log("FAILED");
        !flag && submitTail.length &&
         Number.isInteger(submitTail*1) &&
         submitTail.length===3
         ?setTails([...Tails,{ID:submitTail}]):console.log("FAILED2");
    },[submitTail,Tails])
    const success = (
            <div className = "TailsPage">
               <div className = "Manage-Icon-Tails">
                   <img className = "icon" src = {Add_icon} alt = "הוסף"/>
                   <img className = "icon" src = {Edit_icon} alt = "ערוך"/>
                   <img className = "icon" src = {Trash_icon} alt = "מחק"/>
                    {handleAdd}
               </div>
               <div className = "Manage-Table-Tails">
               <div className = "Manage-Table-Top"> Date Modification </div>
                   <div className = "Table">
                    <div className ="Parameter-Name-Component">
                    <label className = "Parameter-Name-Right">מס"ז</label>
                    <label className = "Parameter-Name-Left">סוג</label>
                    <label className = "Count"></label>
                    </div>
                    
                   {!Tails.length?(<label className ="EmptyTable" >הטבלה ריקה</label>):Tails.map((tail,index)=>{
                    if(index>=_leftArrow && index<=_rightArrow)
                        return(<div className = "Tails">
                        <label key ={tail.id} className = "Tail">{tail.ID}</label>
                        <label key ={tail.id} className = "Type">"Type"</label>
                        <label key ={tail.id} className = "Check"></label>
                        </div>);
                    else
                        return null;
                    })}
                   </div>
                    <div className = "Manage-Table-Bottom"> 
                    <img onClick = {()=>handleLeftArrow()} className ="Left-Button" src = {LeftArrow_icon} alt = "שמאל"></img>
                    <img onClick = {()=>handleRightArrow()} className ="Right-Button" src = {RightArrow_icon} alt = "ימין"></img>
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