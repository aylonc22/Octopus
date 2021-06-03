import {React,useEffect,useState} from 'react';
import {getAllNotification} from '../../api/notification-api.js';
import './Notification.css'
let dateFormat = require('dateformat');
const Notification = props =>{
    const [Data,setData] = useState([]);
    const [_rightArrow,setRightArrow] = useState(37);
    const [_leftArrow,setLeftArrow] = useState(0);

    useEffect(()=>{
        getAllNotification().then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[]);

   return(
    <div className = "FlightCard">
    <div className = "Top-Card">
        <label className = "Table-Name"> {props.name} </label>
    </div>
         <div className ="Row">
         <label className = "Header-Cell">תאריך סיום</label>
         <label className = "Header-Cell">תאריך התחלה</label>
         <label className = "Header-Cell">מופע חופף</label>
         <label className = "Header-Cell">סוג</label>
         <label className = "Header-Cell">תחנות</label>
         </div>
         
        {!Data.length?([...Array(37)].map((i,index)=><div key = {index} className = "Row">
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>
       <div className = "Empty-Cell"></div>      
       </div>)):[...Data.slice(_leftArrow,_rightArrow),...Array(37-Data.slice(_leftArrow,_rightArrow).length)].map((d,index)=>{
         if(d)
             return(<div key ={d._id} className = "Row">
             <div className = "Cell">{new Date(d.Close).getFullYear()===1970?"פתוח":dateFormat(new Date(d.Close),"dd-mm-yyyy:// HH:MM:ss")}</div>
             <div className = "Cell">{ dateFormat(new Date(d.Open),"dd-mm-yyyy:// HH:MM:ss")}</div>
             <div className = "Cell">{d.Duplicate}</div>
             <div className = "Cell">{d.Type}</div>
             <div className = "Cell">{d.Stations}</div>
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
export default Notification;