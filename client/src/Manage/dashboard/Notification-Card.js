import {React,useEffect,useState} from 'react';
let dateFormat = require('dateformat');
const NotificationTable = (props)=>{
const [Data,setData] = useState([]);
    useEffect(()=>{
       props.getAllTable.then(res=>{
        setData(res.data.data.filter(e=>e))
       });
   },[]);

        useEffect(()=>{
            setData(props.notifications);
        },[props.notifications]);


    // get date return true if the date is the date of current day
    function isSameDay(date) {
        let today = new Date();
       console.log("DATE")
       console.log(date);
       console.log("TODAY");
       console.log(today);
        if(today.getMonth()===date.getMonth() && today.getFullYear()===date.getFullYear() 
        && today.getDay()=== date.getDay())
            return true;

        return false;
    }
    return(
            <div className = "Notification-Table">
                <div className  = "Row"> <div className = "Header-Cell">תאריך סיום</div><div className = "Header-Cell">תאריך התחלה</div> <div className = "Header-Cell">מופע חופף</div> <div className = "Header-Cell">סוג</div> <div className = "Header-Cell">תחנות</div></div>
                { [...Data.filter(e=>e.Close==="1970-01-01T00:00:00.000Z").splice(0,21),...Array(22-Data.filter(e=>e.Close==="1970-01-01T00:00:00.000Z").splice(0,21).length)].map((d,index)=>{
                    if(d)
                   { 
                    return(<div key = {d._id} className  = "Row"> 
                    <div className = "Cell">{new Date(d.Close).getFullYear()===1970?"פתוח":isSameDay(new Date(d.Close))?dateFormat(new Date(d.Close),"HH:MM:ss"):dateFormat(new Date(d.Close),"dd-mm-yyyy")}</div>
                    <div className = "Cell">{isSameDay(new Date(d.Open))?dateFormat(new Date(d.Open),"HH:MM:ss"):dateFormat(new Date(d.Open),"dd-mm-yyyy")}</div>
                    <div className = "Cell">{d.Duplicate}</div>
                    <div className = "Cell">{d.Type}</div> 
                   <div className = "Cell">
                   <div className = "Stations">
                    <div>{d.Stations[0]}</div>
                    <div>{d.Stations[1]}</div>
                    </div>
                   </div>
                    </div>);}
                    else
                   {
                       return(<div key = {index} className  = "Row"> 
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div> 
                    <div className = "Empty-Cell"></div>
                    </div>);}
                    })}
            </div>
);
};

export default NotificationTable;
