import {React,useEffect,useState} from 'react';
const NotificationTable = (props)=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.socket.emit("requestRender");   
        //eslint-disable-next-line
        },[]);

        useEffect(()=>{
            setData(props.notifications);
        },[props.notifications]);
    return(
            <div className = "Notification-Table">
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
