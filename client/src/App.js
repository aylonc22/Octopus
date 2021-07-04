import React , {useState,useEffect} from 'react';
import io from 'socket.io-client';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import './App.css';
//Mongo api
import {getAllNotification,getNotificationsFromTo} from './api/notification-api.js';
//Componnets
import OfflineStation from './offlineStation/offlineStation';
import OnlineStation from './onlineStation/onlineStation';
import NotFoundPage from './notFoundPage/NotFoundPage';
import Manage from './Manage/Manage.js'
import Navbar from './components/navbar/Navbar';
import Flights from './Manage-Items/Flights/flight';
import Notification from './Manage-Items/Notification/Notification.js';
import Edit from './Manage-Items/Edit/Edit.js';
//Classes
import Queue from './classes/queue';
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
  const [onlineStations,setOnlineStations] = useState([]);//{id:"demo1",message:"test"},{id:"demo2",message:"test"},{id:"demo3",message:"test"},{id:"demo4",message:"tes2"}
  const [offlineStations,setOfflineStations] = useState([]);//{id:"demo1"},{id:"demo2"},{id:"demo3"},{id:"demo12"},{id:"demo22"},{id:"demo34"},{id:"demo14"},{id:"demo23"},{id:"demo30"}
  const [notifications_card,setNotifications_card] =useState([]);
  const [notifications,setNotifications] = useState([]);
  const [PoPupQueue,setPopUpQueue] = useState(new Queue());
  const [serverOn,setServerOn] = useState(true);
  const [reconnectAttemp,setReconnectAttemp] = useState(false);
useEffect(()=>{
  if(reconnectAttemp)
  setServerOn(false);
},[reconnectAttemp]);
  useEffect(()=>{
  socket.on("connect",()=>{
    setServerOn(true);
    setReconnectAttemp(false);
  });
  socket.on("disconnect",()=>setServerOn(false));
  socket.on("reconnect_attempt", ()=>{
    setReconnectAttemp(true);
  });
  socket.on('sendStations', (_onlineStations,_offlineStations)=>{
    setOfflineStations(_offlineStations);
   setOnlineStations(_onlineStations);
  });
  
  socket.on('reRender-card',()=>{ 
    getAllNotification().then(res=>setNotifications_card(res.data.data));});

    socket.on('reRender',()=>{
       getNotificationsFromTo(0,37).then(res=>
           {
               res.data?setNotifications(res.data.data?res.data.data:[]):console.log()
           });
   });
   socket.on('newPopUp',(e=>{
      let queue =PoPupQueue.items;
      let res = new Queue();
      for(let i=0;i<queue.length;i++)
        res.enqueue(queue[i]);
      
      res.enqueue(e);
      setPopUpQueue(res);
   }));
  // eslint-disable-next-line
},[]);

// dequeuing notification from popup queue
const dequeue = ()=>{
  let queue =PoPupQueue.items;
  let res = new Queue();
  for(let i=1;i<queue.length;i++)
    res.enqueue(queue[i]);

    console.log(res);
  setPopUpQueue(res);
}
console.log(serverOn);
if(!serverOn) // if socket can't connect to server
    return (<NotFoundPage isOffline = "true"/>)
  else // if socket is connected
  return (
          <div>
            <Router>
              <div>
              <Navbar
              url = {window.location.href.substring(window.location.href.lastIndexOf('/'))}
              popup = {PoPupQueue} dequeue = {()=>dequeue()}/>
              <Switch>
            <Route exact path="/"><Manage socket = {socket} notifications = {notifications_card}/></Route>
            <Route exact path="/online"><OnlineStation  items = {onlineStations}/></Route>
            <Route exact path="/offline"><OfflineStation  items = {offlineStations} /></Route>
            <Route exact path="/flight"><Flights/></Route>
            <Route exact path="/notification"><Notification notifications = {notifications}/></Route>
            <Route exact path="/edit"><Edit/></Route>
            <Route path="*"><NotFoundPage/></Route>
          </Switch>
            </div>
              </Router>
          </div>   
      
    );
    
 }

export default App;