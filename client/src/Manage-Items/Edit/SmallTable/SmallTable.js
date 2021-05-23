import {React,useEffect,useState} from 'react';
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
    const [_rightArrow,setRightArrow] = useState(19);
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
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                console.log(res.data);
                res.data.success?Set_Success(true):Set_Success(false)
                
            });//TODO when error need to change to mongo doesnt work page
        //eslint-disable-next-line
        },[]);
    useEffect(()=>{
        let flag = false;
        const insert = props.secondary==="Type"?{ID:submitData,Type:"type"}:{ID:submitData,Location:"Location"};//eslint-disable-next-line
        Data.map(d=>d.ID==submitData?flag=true:console.log());
        !flag && submitData.length && 
        Number.isInteger(submitData*1) &&
        submitData.length===props.ID_Limit*1//* to convert string to int
        ?props.insertToTable(insert):console.log();//props.insertToTable
        !flag && submitData.length &&
         Number.isInteger(submitData*1) &&
         submitData.length===props.ID_Limit*1//* to convert string to int
         ?setData([...Data,insert]):console.log();
         //eslint-disable-next-line
    },[submitData,Data])
    const success = (
            <div className = "DataCard">
               <label className = "Table-Name"> {props.name} </label>
               {/* <div className = "Manage-Icon-Data">
                   <img className = "icon" src = {Add_icon} alt = "הוסף"/>
                   <img className = "icon" src = {Edit_icon} alt = "ערוך"/>
                   <img className = "icon" src = {Trash_icon} alt = "מחק"/>
                    {handleAdd}
               </div> */}
                    <div className ="Row">
                    <label className = "Header-Cell">מס"ז</label>
                    <label className = "Header-Cell">{props.secondaryH}</label>
                    <label className = "Header-Delete-Cell"></label>
                    </div>
                    
                   {!Data.length?([...Array(20)].map((i,index)=><div key = {index} className = "Row">
                  <div className = "Empty-Cell"></div>
                  <div className = "Empty-Cell"></div>       
                  </div>)):[...Data.slice(_leftArrow,_rightArrow),...Array(20-Data.slice(_leftArrow,_rightArrow).length)].map((d,index)=>{
                    if(d)
                        return(<div className = "Row">
                        <div key ={d.id} className = "Cell">{d.ID}</div>
                        <div key ={d.id} className = "Cell">{d.Type?d.Type:d.Location}</div>
                        <div key ={d.id} className = "Delete-Cell">
                        <div className = "button r">
                            <input  type="checkbox" className="checkbox"/> 
                            <div className="knobs"></div>
                            <div className="layer"></div>
                        </div>
                        </div>
                        </div>);
                    else
                        return( <div key = {index} className = "Row">
                        <div className = "Empty-Cell"></div>
                        <div className = "Empty-Cell"></div>       
                        </div>);
                    })}
                    {/* <div className = "Manage-Table-Bottom"> 
                    <img onClick = {()=>handleLeftArrow()} className ="Left-Button" src = {LeftArrow_icon} alt = "שמאל"></img>
                    <img onClick = {()=>handleRightArrow()} className ="Right-Button" src = {RightArrow_icon} alt = "ימין"></img>
                    </div> */}
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