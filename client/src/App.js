import React , {useState,useEffect} from 'react';
import './App.css';
import io from 'socket.io-client';
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStation';
const socket = io.connect('http://localhost:4000',{});
function App() {
  const [onlineStations,setOnlineStations] =useState([]);
  const [offlineStations,setOfflineStations] =useState([{id:"demo1"},{id:"demo2"},{id:"demo3"}]);
  const [data,setData] = useState({station:'',message:''});
  // let showOnline = onlineStations.map(s=><OnlineStation key ={s.id} id = {s.id} message = {s.message}/>)
  // let showOffline = offlineStations.map(s=><OfflineStation key ={s.id} id = {s.id}/>)
  socket.on('connection',()=>console.log("test"));
  socket.on('disconnect',()=>{
    socket.send("[Client] disconnected");
});
useEffect(()=>{
  socket.on('connect_error',(err)=>console.log(err));
  socket.on('station-listener', (msg,s)=>{
    setData({message:msg,station:s})
    // let newOnline = [];
    //  let newOffline =  [...offlineStations].filter(item=>{return item.id!==station;})
    // console.log(station);
    // console.log(msg);
    // for(let i = 0; i<offlineStations.length; i++)
    //   {
    //     if (offlineStations[i].id !== station) {
            
    //       newOffline = [...newOffline,offlineStations[i]]
    //     }
    //   }
      
      // let flag = false;
      // for(let i = 0; i<onlineStations.length;i++)
      //   {
      //       if(onlineStations[i].id === station)
      //        { 
      //          flag = true;
      //         newOnline =[...newOnline,{id:station,message:msg}];
      //       }
      //       else
      //       newOnline = [...newOnline,{id:onlineStations[i].id,message:onlineStations[i].message}];
      //   }
      //    if(!flag)
      //    {newOnline =[...newOnline,{id:station,message:msg}];}
      //    setOnlineStations(newOnline);
      //setOfflineStations(newOffline);
  });// eslint-disable-next-line
},[]);
useEffect(()=>{
  let newOffline =  [...offlineStations].filter(item=>{return item.id!==data.station;})
  let newOnline = []; 
      let flag = false;
      for(let i = 0; i<onlineStations.length;i++)
        {
            if(onlineStations[i].id === data.station)
             { 
               console.log(onlineStations.length);
               flag = true;
              newOnline =[...newOnline,{id:data.station,message:data.message}];
            }
            else
            newOnline = [...newOnline,{id:onlineStations[i].id,message:onlineStations[i].message}];
        }
        if(!flag && (data.message || data.station))//if is not already in array and actually have value
        {newOnline =[...newOnline,{id:data.station,message:data.message}];;}
         setOnlineStations(newOnline);
         setOfflineStations(newOffline);// eslint-disable-next-line
},[data]);
  return (
    <div>
      {/* <h1 className =  "textCenter">תחנות דלוקות</h1>
      <div className = "boxOnline">{showOnline}</div>
      <h1 className =  "textCenter">תחנות כבויות</h1>
  <div className = "boxOffline">{showOffline}</div>*/ }
      <OnlineStation items = {onlineStations}/>
  <OfflineStation items = {offlineStations}/>
    </div>
  );
 }

export default App;