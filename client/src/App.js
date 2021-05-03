import React , {useState,useEffect} from 'react';
import './App.css';
import io from 'socket.io-client';
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStaion';
const socket = io.connect('http://localhost:4000',{});
function App() {
  const [onlineStations,setOnlineStations] =useState([]);
  const [offlineStations,setOfflineStations] =useState([{id:"demo1"},{id:"demo2"},{id:"demo3"}]);
  // let showOnline = onlineStations.map(s=><OnlineStation key ={s.id} id = {s.id} message = {s.message}/>)
  // let showOffline = offlineStations.map(s=><OfflineStation key ={s.id} id = {s.id}/>)
  function addToArray(type, list) {
    type === "offline" ?
    console.log("offline") :
    console.log("online")
  }
  socket.on('connection',()=>console.log("test"));
  socket.on('disconnect',()=>{
    socket.send("[Client] disconnected");
});
useEffect(()=>{
  socket.on('connect_error',(err)=>console.log(err));
  socket.on('station-listener', (msg,station)=>{
    const online = [...onlineStations];
    const newOnline = [];
    const offline = [...offlineStations];
    const newOffline =[];
    for(let i = 0; i<offline.length; i++)
      {
        if (offline[i].id !== station) {
          newOffline.push(offline[i]);
        }
      }
      let flag = false;
      for(let i = 0; i<online.length;i++)
        {
            if(online[i].id === station)
             { 
               flag = true;
              newOnline.push({id:station,message:msg})
            }
            else
            newOnline.push({id:online[i].id,message:online[i].message})
        }
         if(!flag)
         {newOnline.push({id:station,message:msg})}
         setOnlineStations(newOnline);
         setOfflineStations(newOffline);

  });
},[]);

  return (
    <div>
      {/* <h1 className =  "textCenter">תחנות דלוקות</h1>
      <div className = "boxOnline">{showOnline}</div>
      <h1 className =  "textCenter">תחנות כבויות</h1>
      <div className = "boxOffline">{showOffline}</div> */}
      <OnlineStation items = {onlineStations}/>
      <OfflineStation items = {offlineStations}/>
    </div>
  );
}

export default App;