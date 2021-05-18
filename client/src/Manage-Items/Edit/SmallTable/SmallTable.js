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
import './SmallTable.css'


const Tail = props =>{

    const [newID,setNewID] = useState("");
    const [Data,setData] = useState([]);
    const [submitData,setSubmitData] = useState("");
    const [_success,Set_Success] = useState(true);
    const [_rightArrow,setRightArrow] = useState(9);
    const [_leftArrow,setLeftArrow] = useState(0);
    
    //Handlers
    const handleRightArrow = ()=>{
        if(Data.length && Data.length>_rightArrow)
        {
            setRightArrow(_rightArrow + 10);
            setLeftArrow(_leftArrow + 10);
        }
    };
    
    const handleLeftArrow = ()=>{
        if(Data.length && _leftArrow>0)
        {
            setRightArrow(_rightArrow - 10);
            setLeftArrow(_leftArrow - 10);
        }
    };

    const handleAdd =( <div>
    <textarea className = "InsertData" 
    maxLength= "3" //Tail can be only 3 chars
    value = {newID}
    onChange = {(e)=>setNewID(e.target.value)}>
    </textarea>
    <Button  func = {()=>{setSubmitData(newID);setNewID("")}} name = "הוסף מספר זנב"/>
    </div>);

    useEffect(()=>{
        props.getAllTable.then(res=>//props.getAllTable
            {
                res.data?setData(res.data):console.log()
                res.success?Set_Success(true):Set_Success(false)
            });//TODO when error need to change to mongo doesnt work page
    },[]);
    useEffect(()=>{
        let flag = false;//eslint-disable-next-line
        Data.map(tail=>tail.ID==submitData?flag=true:console.log());
        !flag && submitData.length && 
        Number.isInteger(submitData*1) &&
        submitData.length===props.ID_Limit*1//* to convert string to int
        ?props.insertToTable({ID:submitData}):console.log("FAILED");//props.insertToTable
        !flag && submitData.length &&
         Number.isInteger(submitData*1) &&
         submitData.length===props.ID_Limit*1//* to convert string to int
         ?setData([...Data,{ID:submitData}]):console.log("FAILED2");
    },[submitData,Data])
    const success = (
            <div className = "DataPage">
               <div className = "Manage-Icon-Data">
                   <img className = "icon" src = {Add_icon} alt = "הוסף"/>
                   <img className = "icon" src = {Edit_icon} alt = "ערוך"/>
                   <img className = "icon" src = {Trash_icon} alt = "מחק"/>
                    {handleAdd}
               </div>
               <div className = "Manage-Table-Data">
               <div className = "Manage-Table-Top"> Date Modification </div>
                   <div className = "Table">
                    <div className ="Parameter-Name-Component">
                    <label className = "Parameter-Name-Right">מס"ז</label>
                    <label className = "Parameter-Name-Left">{props.secondary}</label>
                    <label className = "Count"></label>
                    </div>
                    
                   {!Data.length?(<label className ="EmptyTable" >הטבלה ריקה</label>):Data.map((d,index)=>{
                    if(index>=_leftArrow && index<=_rightArrow)
                        return(<div className = "Data">
                        <label key ={d.id} className = "ID">{d.ID}</label>
                        <label key ={d.id} className = "Type">"Type"</label>
                        <label key ={d.id} className = "Check"></label>
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