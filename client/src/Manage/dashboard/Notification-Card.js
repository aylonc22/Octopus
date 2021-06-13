import {React,useEffect,useState} from 'react';
let dateFormat = require('dateformat');
const NotificationTable = (props)=>{
const [Data,setData] = useState([]);
  const [_Data,set_Data] = useState([]);
    useEffect(()=>{
       props.getAllOpen.then(res=>{
        //res.data?setData(res.data.data?res.data.data:[]):console.log()
        set_Data(res.data.data);
        //setData(res.data.data)
        //console.log([...res.data.data]);
     
        //let lol = res.data.data.filter(e=>e.Close==="1970-01-01T00:00:00.000Z");
        //setTemp(lol);
        //setData(res.data.data.filter(e=>e.Close==="1970-01-01T00:00:00.000Z"));
       });
   },[]);
   useEffect(()=>setData(_Data),[_Data])
console.log(Data);
    // useEffect(()=>{
    //     props.socket.emit("requestRender");   
    //     //eslint-disable-next-line
    //     },[]);

    //     useEffect(()=>{
    //         setData(props.notifications);
    //     },[props.notifications]);
    return(
            <div className = "Notification-Table">
                <div className  = "Row"> <div className = "Header-Cell">תאריך סיום</div><div className = "Header-Cell">תאריך התחלה</div> <div className = "Header-Cell">מופע חופף</div> <div className = "Header-Cell">סוג</div> <div className = "Header-Cell">תחנות</div></div>
                { [...Data.splice(0,21),...Array(22-Data.splice(0,21).length)].map((d,index)=>{
                    if(d)
                   { 
                    return(<div key = {d._id} className  = "Row"> 
                    <div className = "Cell">{new Date(d.Close).getFullYear()===1970?"פתוח":dateFormat(new Date(d.Close),"dd-mm-yyyy:// HH:MM:ss")}</div>
                    <div className = "Cell">{ dateFormat(new Date(d.Open),"dd-mm-yyyy:// HH:MM:ss")}</div>
                    <div className = "Cell">{d.Duplicate}5</div>
                    <div className = "Cell">{d.Type}</div> 
                    <div className = "Cell">{d.Stations}</div>
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
