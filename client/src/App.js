import React , {useState,useEffect} from 'react';
import io from 'socket.io-client';
import {useRoutes} from 'hookrouter';
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";
import './App.css';

//Componnets
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStation';
import NotFoundPage from './notFoundPage/NotFoundPage';
import Manage from './Manage/Manage.js'
import Navbar from './components/navbar/Navbar';
import Flights from './Manage-Items/Flights/flight';
import Notification from './Manage-Items/Notification/Notification.js';
import Edit from './Manage-Items/Edit/Edit.js';

//Client
const socket = io.connect('http://localhost:4000',{reconnectionDelay: 1000,
reconnection:true,
reconnectionAttempts: 10,
transports: ['websocket'],
agent: false, 
upgrade: false,
rejectUnauthorized: false});

//APP
function App() {
  const [onlineStations,setOnlineStations] =useState([]);//{id:"demo1",message:"ADIR NAHUM"}
  const [offlineStations,setOfflineStations] =useState([{id:"demo1"},{id:"demo2"},{id:"demo3"}]);
  const [data,setData] = useState({station:'',message:''});
  socket.on('connection',()=>console.log("test"));
  socket.on('disconnect',()=>{
    socket.send("[Client] disconnected");
});
//socket.on('connect_error',(err)=>console.log(err));
socket.on('error',err=>console.log(`[Client] server is not up: ${err}`))
useEffect(()=>{
  socket.on('station-listener', (msg,s)=>{
    setData({message:msg,station:s})
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
               flag = true;
              newOnline =[...newOnline,{id:data.station,message:data.message}];
            }
            else
            newOnline = [...newOnline,{id:onlineStations[i].id,message:onlineStations[i].message}];
        }
        if(!flag && (data.message || data.station))//if is not already in array and actually have value
        {newOnline =[...newOnline,{id:data.station,message:data.message}];;}
         
        setOnlineStations(newOnline.sort((a, b) => a.id.localeCompare(b.id)));// order online and offline stations by ID number
         setOfflineStations(newOffline.sort((a, b) =>  a.id.localeCompare(b.id)));// eslint-disable-next-line
},[data]);
  

return (
    
        <div>
           <Router>
             <div>
            <Navbar
             url={window.location.href.substring(window.location.href.lastIndexOf('/'))}/>
            <Switch>
          <Route exact path="/"><Manage/></Route>
          <Route path="/online"><OnlineStation  items = {onlineStations}/></Route>
          <Route path="/offline"><OfflineStation  items = {offlineStations} /></Route>
          <Route exact path="/flight"><Flights/></Route>
          <Route exact path="/notification"><Notification/></Route>
          <Route exact path="/edit"><Edit/></Route>
          <Route path="*"><NotFoundPage/></Route>
        </Switch>
           </div>
            </Router>
        </div>   
    
  );
 }

export default App;