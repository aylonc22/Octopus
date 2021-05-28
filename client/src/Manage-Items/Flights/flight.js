import {React,useEffect,useState} from 'react';
import './flight.css'
const Flight = props =>{
    const [Data,setData] = useState([{id:"777"}]);
    const [_rightArrow,setRightArrow] = useState(19);
    const [_leftArrow,setLeftArrow] = useState(0);
return(
    <div className = "FlightCard">
    <div className = "Top-Card">
        <label className = "Table-Name"> {props.name} </label>
    </div>
    {/* 
         {handleAdd}
     */}
         <div className ="Row">
         <label className = "Header-Cell">תאריך</label>
         <label className = "Header-Cell">תחנה</label>
         <label className = "Header-Cell">גרור</label>
         <label className = "Header-Cell">מטוס</label>
         <label className = "Header-Cell">תדר</label>
         </div>
         
        {!Data.length?([...Array(37)].map((i,index)=><div key = {index} className = "Row">
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>      
       </div>)):[...Data.slice(_leftArrow,_rightArrow),...Array(37-Data.slice(_leftArrow,_rightArrow).length)].map((d,index)=>{
         if(d)
             return(<div key ={d.id} className = "Row">
             <div className = "Cell"></div>
             <div className = "Cell"></div>
             <div className = "Cell"></div>
             <div className = "Cell">{d.id}</div>
             <div className = "Cell"></div>
             </div>);
         else
             return( <div key = {index} className = "Row">
             <div className = "Empty-Cell"></div>
             <div className = "Empty-Cell"></div>
             <div className = "Empty-Cell"></div>
             <div className = "Empty-Cell"></div> 
             <div className = "Empty-Cell"></div>        
             </div>);
         })}
         {/* <div className = "Manage-Table-Bottom"> 
         <img onClick = {()=>handleLeftArrow()} className ="Left-Button" src = {LeftArrow_icon} alt = "שמאל"></img>
         <img onClick = {()=>handleRightArrow()} className ="Right-Button" src = {RightArrow_icon} alt = "ימין"></img>
         </div> */}
</div>
)
};
export default Flight;