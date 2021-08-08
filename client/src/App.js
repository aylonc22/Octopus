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
//image
import Tihkur from './icons/tihkur.png';
import AirForce from './icons/AirForce.png';
import Tahzuka from './icons/tahzuka.png';
//Client
const socket = io.connect('http://192.168.43.251:4000',{reconnectionDelay: 1000,
reconnection:true,
reconnectionAttempts: 10,
transports: ['websocket'],
agent: false, 
upgrade: false,
rejectUnauthorized: false});



//APP
function App() {
  const [onlineStations,setOnlineStations] = useState([{id:"demo1",message:"test"},{id:"demo2",message:"test"},{id:"demo3",message:"test0"},{id:"demo4",message:"tes2"}]);//{id:"demo1",message:"test"},{id:"demo2",message:"test"},{id:"demo3",message:"test"},{id:"demo4",message:"tes2"}
  const [offlineStations,setOfflineStations] = useState([{id:"demo1"},{id:"demo2"},{id:"demo3"},{id:"demo12"},{id:"demo22"},{id:"demo34"},{id:"demo14"},{id:"demo23"},{id:"demo30"}]);//{id:"demo1"},{id:"demo2"},{id:"demo3"},{id:"demo12"},{id:"demo22"},{id:"demo34"},{id:"demo14"},{id:"demo23"},{id:"demo30"}
  const [notifications_card,setNotifications_card] =useState([]);
  const [notifications,setNotifications] = useState([]);
  const [newNotifications,setNewNotifications] = useState(undefined);
  const [serverOn,setServerOn] = useState(true);
  const [reconnectAttemp,setReconnectAttemp] = useState(false);
  const [shouldBlur,setShouldBlur] = useState(false);// if need to blur the screen
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
    setNewNotifications(e);
   }));
  // eslint-disable-next-line
},[]);

const shouldShowAbout = ["/","/online","/offline","/flight","/notification","/edit"].indexOf(window.location.href.substring(window.location.href.lastIndexOf('/')))!=-1;

// if(!serverOn) // if socket can't connect to server
//     return (<NotFoundPage isOffline = "true"/>)
//   else // if socket is connected
  return (
          <div>
            <Router>
              <div className = {shouldBlur&&shouldShowAbout?"blur":""} onClick = {()=>{if(shouldBlur)setShouldBlur(false);/*if aboutus is open any click on the page will close it */}}>
              <Navbar
              url = {window.location.href.substring(window.location.href.lastIndexOf('/'))}
              NewNotifications = {newNotifications}
              shouldBlur = {flag=>setShouldBlur(flag)}/>
              <Switch>
            <Route exact path="/"><Manage socket = {socket} notifications = {notifications_card}/></Route>
            <Route exact path="/online"><OnlineStation  items = {onlineStations}/></Route>
            <Route exact path="/offline"><OfflineStation  items = {offlineStations} /></Route>
            <Route exact path="/flight"><Flights/></Route>
            <Route exact path="/notification"><Notification notifications = {notifications}/></Route>
            <Route exact path="/edit"><Edit/></Route>
            <Route path="/octopus"><NotFoundPage numbers="true"/></Route>
            <Route path="*"><NotFoundPage/></Route>
          </Switch>
            </div>
            {shouldBlur&&shouldShowAbout?<div className = "about-page">
               <div className="about">
               <div className = "logos">
               <img className ="logo" alt = "" src = {AirForce}/>
               <img className ="tihkur" alt = "" src = {Tihkur}/>
               <img className ="logo" alt = "" src = {Tahzuka}/>              
               </div>
                <div className = "rows">
                <div className = "about-row">פותח על ידי אילון כהן </div>
                 <div className = "about-row"> מחלקת תחקור, אוויוניקה כטמ"ם</div>
                 <div className = "about-row"> ©חייל האוויר 2021</div>
                </div>
                
               <div className = "exit" onClick={()=>setShouldBlur(false)}>סגור</div>
               
               </div>
               </div>:null}
              </Router>
          </div>   
      
    );
    
 }

export default App;