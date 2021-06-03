import {React,useEffect,useState} from 'react';
import {getAllFlight} from '../../api/flight-api';
import './flight.css'
const Flight = props =>{
    const [Data,setData] = useState([]);
    const [_rightArrow,setRightArrow] = useState(19);
    const [_leftArrow,setLeftArrow] = useState(0);

    useEffect(()=>{
        getAllFlight().then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[]);

   return(
    <div className = "FlightCard">
    <div className = "Top-Card">
        <label className = "Table-Name"> {props.name} </label>
    </div>
         <div className ="Row">
         <label className = "Header-Cell">תאריך</label>
         <label className = "Header-Cell">תדר</label>
         <label className = "Header-Cell">גרור</label>
         <label className = "Header-Cell">תחנה</label>
         <label className = "Header-Cell">זנב</label>
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
             <div className = "Cell">{d.Date}</div>
             <div className = "Cell">{d.Frequency}</div>
             <div className = "Cell">{d.GDT}</div>
             <div className = "Cell">{d.Station}</div>
             <div className = "Cell">{d.Tail}</div>
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