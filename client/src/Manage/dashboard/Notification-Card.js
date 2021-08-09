import {React,useEffect,useState} from 'react';
let dateFormat = require('dateformat');
const NotificationTable = (props)=>{
const [Data,setData] = useState([]);
    useEffect(()=>{
       props.getAllTable.then(res=>{
        setData(res.data.data.filter(e=>e))
       }); // eslint-disable-next-line
   },[]);

        useEffect(()=>{
            setData(props.notifications);
        },[props.notifications]);


    // get date return true if the date is the date of current day
    function isSameDay(date) {
        let today = new Date();
        if(today.getMonth()===date.getMonth() && today.getFullYear()===date.getFullYear() 
        && today.getDay()=== date.getDay())
            return true;

        return false;
    }
    return(
        <div className="contentDiv">
    <div className = "notificationCard">
            <div className = "Notification-Table">
                <div className = "Table-Name"> התראות </div>
                <div className  = "HeaderRow"> <div className = "Header-Cell">תאריך סיום</div><div className = "Header-Cell">תאריך התחלה</div> <div className = "Header-Cell">שעה</div> <div className = "Header-Cell">מופע חופף</div> <div className = "Header-Cell">סוג</div> <div className = "Header-Cell">תחנות</div></div>
                {Data.filter(e=>e.Close==="1970-01-01T00:00:00.000Z").splice(0,4).map((element)=><div key = {element._id} className  = "Row"> 
                    <div className = "Cell">{"פתוח"}</div>
                    <div className = "Cell">{dateFormat(new Date(element.Open),"dd/mm/yyyy")}</div>
                    <div className = "Cell">{dateFormat(new Date(element.Open),"HH:MM:ss")}</div>
                    <div className = "Cell">{element.Duplicate}</div>
                    <div className = "Cell">{element.Type}</div> 
                   <div className = "Cell">
                   <div className = "Stations">
                    <div className = "Cell">{element.Stations[0]}</div>
                    <div className = "Cell">{element.Stations[1]}</div>
                    </div>
                   </div>
                    </div>)}
            </div>
            </div>
            </div>
);
};

export default NotificationTable;
