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
import PopUp from './components/PopupNotification/PopupNotification.js';

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
  const [onlineStations,setOnlineStations] =useState([]);//{id:"demo1",message:"test"},{id:"demo2",message:"test"},{id:"demo3",message:"test"},{id:"demo4",message:"tes2"}
  const [offlineStations,setOfflineStations] =useState([]);//{id:"demo1"},{id:"demo2"},{id:"demo3"},{id:"demo12"},{id:"demo22"},{id:"demo34"},{id:"demo14"},{id:"demo23"},{id:"demo30"}
  
useEffect(()=>{
  socket.on('sendStations', (onlineStations,offlineStations)=>{
   setOfflineStations(offlineStations);
   setOnlineStations(onlineStations);
  });// eslint-disable-next-line
},[]);
  
return (
    
        <div>
           <Router>
             <div>
            <Navbar
             url={window.location.href.substring(window.location.href.lastIndexOf('/'))}/>
            <Switch>
          <Route exact path="/"><Manage/></Route>
          <Route exact path="/online"><OnlineStation  items = {onlineStations}/></Route>
          <Route exact path="/offline"><OfflineStation  items = {offlineStations} /></Route>
          <Route exact path="/flight"><Flights/></Route>
          <Route exact path="/notification"><Notification socket = {socket}/></Route>
          <Route exact path="/edit"><Edit/></Route>
          <Route path="*"><NotFoundPage/></Route>
        </Switch>
           </div>
            </Router>
        </div>   
    
  );
 }

export default App;