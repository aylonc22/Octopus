import {React,useEffect,useState} from 'react';
import {getNotificationsFromTo} from '../../api/notification-api.js';
import './Notification.css';
let dateFormat = require('dateformat');
const Notification = props =>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
            getNotificationsFromTo().then(res=>//props.getAllTable
                {
                    res.data?setData(res.data.data?res.data.data:[]):console.log();
                });   
        //eslint-disable-next-line
        },[]);

    useEffect(()=>{
        setData(props.notifications);
    },[props.notifications]);
   return(
       <div className="contentDiv">
    <div className = "FlightCard">
    <label className = "Table-Name"> התראות </label>
    <div className = "Top-Card">
        <label className = "Table-Name"> {props.name} </label>
    </div>
         <div className ="HeaderRow">
         <label className = "Header-Cell">תאריך סיום</label>
         <label className = "Header-Cell">תאריך התחלה</label>
         <label className = "Header-Cell">מופע חופף</label>
         <label className = "Header-Cell">סוג</label>
         <label className = "Header-Cell">תחנות</label>
         </div>
         <div className = "NotificationTable" >
             {Data.map((e)=><div key ={e._id} className = "Row">
             <div className = "Cell">{new Date(e.Close).getFullYear()===1970?"פתוח":dateFormat(new Date(e.Close),"dd-mm-yyyy | HH:MM:ss")}</div>
             <div className = "Cell">{ dateFormat(new Date(e.Open),"dd-mm-yyyy | HH:MM:ss")}</div>
             <div className = "Cell">{e.Duplicate}</div>
             <div className = "Cell">{e.Type}</div>
             <div className = "Cell">
                   <div className = "Stations">
                    <div className = "Cell">{e.Stations[0]}</div>
                    <div className = "Cell">{e.Stations[1]}</div>
                    </div>
             </div>       
             </div>)}
             <div className = "Row">
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">dsads</div>
             <div className = "Cell">dsdsa</div>
             <div className = "Cell">
                   <div className = "Stations">
                    <div className = "Cell">dsadasd</div>
                    <div className = "Cell">dsadsa</div>
                    </div>
             </div>       
             </div>
             <div className = "Row">
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">dsads</div>
             <div className = "Cell">dsdsa</div>
             <div className = "Cell">
                   <div className = "Stations">
                    <div className = "Cell">dsadasd</div>
                    <div className = "Cell">dsadsa</div>
                    </div>
             </div>       
             </div>
             <div className = "Row">
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">06-07-2021 | 20:13:12</div>
             <div className = "Cell">dsads</div>
             <div className = "Cell">dsdsa</div>
             <div className = "Cell">
                   <div className = "Stations">
                    <div className = "Cell">dsadasd</div>
                    <div className = "Cell">dsadsa</div>
                    </div>
             </div>       
             </div>
         </div>
</div>
</div>
)
};
export default Notification;