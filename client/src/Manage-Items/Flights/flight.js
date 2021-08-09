import {React,useEffect,useState} from 'react';
import {getAllFlight} from '../../api/flight-api';
import './flight.css'
const Flight = props =>{
    const [Data,setData] = useState([]);
    

    useEffect(()=>{
        getAllFlight().then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log();
            });
        //eslint-disable-next-line
        },[]);

   return(
       <div className="contentDiv">
    <div className = "FlightCard">
    <label className = "Table-Name"> גיחות </label>
    <div className = "Top-Card">
        <label className = "Table-Name"> {props.name} </label>
    </div>
         <div className ="HeaderRow">
         <label className = "Header-Cell">תאריך</label>
         <label className = "Header-Cell">תדר</label>
         <label className = "Header-Cell">גרור</label>
         <label className = "Header-Cell">תחנה</label>
         <label className = "Header-Cell">זנב</label>
         </div>
         <div className = "FlightTable">
            {Data.map(e=><div key ={e._id} className = "Row">
             <div className = "Cell">{e.Date}</div>
             <div className = "Cell">{e.Frequency}</div>
             <div className = "Cell">{e.GDT}</div>
             <div className = "Cell">{e.Station}</div>
             <div className = "Cell">{e.Tail}</div>
             </div>)}
         </div>
</div>
</div>
)
};
export default Flight;