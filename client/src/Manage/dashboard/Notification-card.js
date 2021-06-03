import {React,useEffect,useState} from 'react';
import {insertNotification} from '../../api/notification-api.js';
const NotificationTable = (props)=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.getAllOpen.then(res=>
            {
                //BUG HERE setData fucked the axios request or something
                // CHECK BOOGIE
                /*
                אם תוריד את השורה של הסט דטה זה יראה לך את המערך
                */
                res.data?setData(res.data.data?res.data.data:[]):console.log();
                //console.log(res);
            });
        if(Data.length===0)
        props.getAllTable.then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res);
            });
        //eslint-disable-next-line
        },[]);
    return(
            <div className = "Notification-Table">
                <button onClick = {()=>insertNotification({Stations:["demo2","demo"],
        Type:"ג",
        Duplicate:5,
        Open:new Date(),
        Close:new Date("1970-01-01")})}>add</button>
                <div className  = "Row"> <div className = "Header-Cell">תאריך סיום</div><div className = "Header-Cell">תאריך התחלה</div> <div className = "Header-Cell">מופע חופף</div> <div className = "Header-Cell">סוג</div> <div className = "Header-Cell">תחנות</div></div>
                {!Data.length?[...Array(22)].map((d,index)=><div key = {index} className  = "Row"> 
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div>
                <div className = "Empty-Cell"></div> 
                <div className = "Empty-Cell"></div>
                </div>):[...Data.splice(0,21),...Array(22-Data.splice(0,21).length)].map((d,index)=>{
                    if(d)
                    return(<div key = {d._id} className  = "Row"> 
                    <div className = "Cell"></div>
                    <div className = "Cell"></div>
                    <div className = "Cell"></div>
                    <div className = "Cell"></div> 
                    <div className = "Cell"></div>
                    </div>);
                    else
                   return(<div key = {index} className  = "Row"> 
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div>
                    <div className = "Empty-Cell"></div> 
                    <div className = "Empty-Cell"></div>
                    </div>);
                    })}
            </div>
);
};

export default NotificationTable;